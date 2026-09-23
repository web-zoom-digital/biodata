import { ArrowRight, CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

interface Props {
  trail?: { name: string; path: string }[];
}

export function FaqHero({ trail = [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }] }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50/90 via-sky-50/80 to-teal-100/90 py-12 sm:py-20 lg:py-24">
      {/* Background Image */}
      <Image
        src="/images/heroes/faq-hero-bg.jpg"
        alt="Marriage Biodata FAQ"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-30 mix-blend-overlay"
      />

      {/* Decorative Gradient Blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-cyan-300/35 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 -right-20 size-[32rem] rounded-full bg-teal-300/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 size-[30rem] rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />

      <Container className="relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600 flex justify-center lg:justify-start">
          <ol className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
            {trail.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i < trail.length - 1 ? (
                  <>
                    <Link href={c.path} className="underline-offset-4 hover:text-slate-900 hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden="true" className="opacity-40">/</span>
                  </>
                ) : (
                  <span aria-current="page" className="font-medium text-slate-800">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left Column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/80 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700 shadow-sm backdrop-blur-md">
              <Sparkles className="size-3.5 text-cyan-500" aria-hidden="true" />
              <span>Everything You Need to Know</span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.12]">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-teal-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Short, direct answers about how the biodata maker works, your privacy, download formats, templates and everything in between.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <Button
                href="/create"
                variant="cta"
                size="lg"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-sky-600 to-teal-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40 w-full sm:w-auto"
              >
                <span>Create Your Biodata</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <a
                href="#faqs"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 px-6 text-base font-semibold text-slate-800 backdrop-blur-sm transition-all hover:bg-white hover:border-cyan-400/60 hover:shadow-md w-full sm:w-auto"
              >
                Browse All FAQs
              </a>
            </div>

            {/* Feature Checklist */}
            <ul className="mt-10 grid grid-cols-1 gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
              {[
                "100% Free, no sign-up needed",
                "Data stays on your device",
                "Instant PDF & image download",
                "Mobile & desktop friendly",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2.5">
                  <div className="flex size-5 items-center justify-center rounded-full bg-cyan-600 text-white shadow-sm">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — FAQ Cards Visual */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            {/* Handwritten Annotation */}
            <div className="absolute -top-10 left-8 z-20 hidden sm:flex items-center gap-2 font-semibold text-sm text-cyan-800">
              <div className="flex flex-col items-center">
                <span className="font-handwriting text-base font-bold italic tracking-wide text-cyan-700 drop-shadow-sm">
                  Quick Answers Below
                </span>
                <svg className="size-10 text-cyan-600 -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 10 35 Q 25 10 40 20" />
                  <path d="M 32 15 L 40 20 L 38 28" />
                </svg>
              </div>
            </div>

            {/* Decorative FAQ card illustrations */}
            <div className="relative w-full max-w-md py-6">
              {/* Card stack */}
              {[
                { q: "Is BioCraft really free?", a: "Yes — 100% free. No sign-up, no payment.", rotate: "-rotate-[8deg]", z: "z-0", top: "top-0", offset: "left-0", shadow: "shadow-lg" },
                { q: "Where is my data stored?", a: "Everything stays in your browser only.", rotate: "rotate-[6deg]", z: "z-10", top: "top-10", offset: "right-0", shadow: "shadow-xl" },
                { q: "Can I download as PDF?", a: "Yes — PDF, PNG & JPEG all supported.", rotate: "-rotate-[2deg]", z: "z-20", top: "top-20", offset: "left-1/2 -translate-x-1/2", shadow: "shadow-[0_20px_50px_-12px_rgba(6,182,212,0.35)]" },
              ].map((card) => (
                <div
                  key={card.q}
                  className={`absolute ${card.top} ${card.offset} ${card.rotate} ${card.z} w-[70%] rounded-2xl border border-slate-200/80 bg-white p-4 ${card.shadow} transition-transform duration-500 hover:z-30 hover:rotate-0 hover:scale-105`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200/60">
                      <HelpCircle className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{card.q}</p>
                      <p className="mt-1 text-xs text-slate-500">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Spacer to give height to the stacked cards */}
              <div className="h-52" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
