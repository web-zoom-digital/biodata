import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { Button } from "@/components/ui/Button";
import { getTemplate } from "@/templates";

export function Hero() {
  const templateCenter = getTemplate("emerald-classic") || getTemplate("modern-indigo");
  const templateLeft = getTemplate("royal-heritage");
  const templateRight = getTemplate("elegant-rose") || getTemplate("classic-gold");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-100/90 via-blue-50/80 to-indigo-100/90 py-12 sm:py-20 lg:py-24">
      {/* Background Image with High Visibility */}
      <Image
        src="/images/heroes/home-hero-bg.jpg"
        alt="Marriage Biodata Workspace"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-45 mix-blend-overlay"
      />

      {/* Decorative Gradient Wave Shapes matching reference image */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-sky-300/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 -right-20 size-[32rem] rounded-full bg-indigo-300/35 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 size-[30rem] rounded-full bg-teal-200/40 blur-3xl" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline, Description & Actions */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-md">
              <Sparkles className="size-3.5 text-sky-500" aria-hidden="true" />
              <span>Create &middot; Customize &middot; Succeed</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.12]">
              Build Your{" "}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Perfect Biodata
              </span>{" "}
              With Beautiful Templates
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Create professional, elegant marriage biodatas with beautifully designed templates. Customize your biodata effortlessly and take the next step towards your perfect match.
            </p>

            {/* CTA Buttons matching Reference Button style */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <Button
                href="/create"
                variant="cta"
                size="lg"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.03] hover:shadow-orange-500/40 active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Create Your Biodata</span>
                <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button
                href="/templates"
                variant="cta"
                size="lg"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.03] hover:shadow-blue-500/40 active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Explore All Templates</span>
                <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>

            {/* Features Checklist */}
            <ul className="mt-10 grid grid-cols-1 gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
              {[
                "100% Free, no account needed",
                "Your details stay on your device",
                "High quality PDF & Image download",
                "Mobile & desktop friendly",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2.5">
                  <div className="flex size-5 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Tilted 3D Stack of Templates with Handwritten Arrow Annotation */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            {/* Handwritten Style Curved Arrow Annotation */}
            <div className="absolute -top-10 left-8 z-20 hidden sm:flex items-center gap-2 text-sky-800 font-semibold text-sm">
              <div className="flex flex-col items-center">
                <span className="font-handwriting text-base font-bold italic tracking-wide text-sky-700 drop-shadow-sm">
                  Professional Templates
                </span>
                <svg className="size-10 text-sky-600 -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 10 35 Q 25 10 40 20" />
                  <path d="M 32 15 L 40 20 L 38 28" />
                </svg>
              </div>
            </div>

            {/* Template Card Showcase Container */}
            <div className="relative min-h-[30rem] w-full max-w-[34rem] py-6">
              {/* Left Tilted Card (Navy / Heritage) */}
              {templateLeft ? (
                <div className="absolute left-0 top-12 z-0 w-[55%] -rotate-[10deg] rounded-2xl bg-white p-2 shadow-xl border border-slate-200/70 transition-transform duration-500 hover:z-30 hover:rotate-0 hover:scale-105">
                  <TemplatePreview template={templateLeft} />
                </div>
              ) : null}

              {/* Right Tilted Card (Rose / Gold) */}
              {templateRight ? (
                <div className="absolute right-0 top-8 z-10 w-[55%] rotate-[10deg] rounded-2xl bg-white p-2 shadow-xl border border-slate-200/70 transition-transform duration-500 hover:z-30 hover:rotate-0 hover:scale-105">
                  <TemplatePreview template={templateRight} />
                </div>
              ) : null}

              {/* Center Main Card (Classic / Indigo) */}
              {templateCenter ? (
                <div className="relative mx-auto z-20 w-[62%] -rotate-[2deg] rounded-2xl bg-white p-2.5 shadow-[0_25px_60px_-15px_rgba(14,165,233,0.35)] border-2 border-sky-400/40 transition-transform duration-500 hover:scale-105 hover:rotate-0">
                  <TemplatePreview template={templateCenter} />
                </div>
              ) : null}
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

