import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { JsonLd } from "../seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

function getHeroBgImage(crumbs?: Crumb[]): string {
  if (!crumbs || crumbs.length === 0) return "/images/heroes/about-hero-bg.jpg";
  const mainPath = crumbs[0]?.path || "";
  if (mainPath.startsWith("/about")) return "/images/heroes/about-hero-bg.jpg";
  if (mainPath.startsWith("/how-it-works")) return "/images/heroes/how-it-works-hero-bg.jpg";
  if (mainPath.startsWith("/guides")) return "/images/heroes/guides-hero-bg.jpg";
  if (mainPath.startsWith("/blog")) return "/images/heroes/blog-hero-bg.jpg";
  if (mainPath.startsWith("/faq")) return "/images/heroes/faq-hero-bg.jpg";
  if (mainPath.startsWith("/contact")) return "/images/heroes/contact-hero-bg.jpg";
  if (mainPath.startsWith("/privacy")) return "/images/heroes/privacy-hero-bg.jpg";
  if (mainPath.startsWith("/terms")) return "/images/heroes/terms-hero-bg.jpg";
  return "/images/heroes/about-hero-bg.jpg";
}

export function PageHero({
  title,
  intro,
  crumbs,
  bgImage,
  children,
}: {
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  bgImage?: string;
  children?: ReactNode;
}) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...(crumbs ?? [])];
  const imageSrc = bgImage || getHeroBgImage(crumbs);

  return (
    <section className="relative overflow-hidden border-b border-sky-100 bg-slate-900 text-white py-12 sm:py-16">
      {/* High-visibility Realistic Background Image */}
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-65 mix-blend-luminosity brightness-90 contrast-105"
      />
      
      {/* Light soft vignette overlay to keep text hyper-legible without obscuring the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" aria-hidden="true" />

      {crumbs?.length ? <JsonLd data={breadcrumbJsonLd(trail)} /> : null}
      
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center rounded-2xl border border-white/15 bg-white/10 p-6 sm:mx-0 sm:items-start sm:p-8 sm:text-left backdrop-blur-md shadow-2xl">
          {crumbs?.length ? (
            <nav aria-label="Breadcrumb" className="mb-4 text-xs font-semibold uppercase tracking-wider text-sky-300 flex justify-center sm:justify-start">
              <ol className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
                {trail.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-2">
                    {i < trail.length - 1 ? (
                      <>
                        <Link href={c.path} className="hover:text-white hover:underline">
                          {c.name}
                        </Link>
                        <span aria-hidden="true" className="text-white/40">/</span>
                      </>
                    ) : (
                      <span aria-current="page" className="text-white">
                        {c.name}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
          {intro ? <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-sky-100/90">{intro}</p> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}

