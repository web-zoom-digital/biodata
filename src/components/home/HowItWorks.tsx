import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { TiltCard } from "@/components/ui/TiltCard";
import { STEPS } from "@/data/home";

export function HowItWorks({ heading = "Three steps, about ten minutes" }: { heading?: string }) {
  return (
    <Section>
      <RevealOnScroll direction="up">
        <SectionHeading
          align="center"
          title={heading}
          intro="You don't need design skills or an account. Keep the details handy and start with the first section."
        />
      </RevealOnScroll>

      <RevealOnScroll staggerChildren={0.15} delay={0.2} className="mt-14 grid gap-8 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <RevealItem key={s.title}>
            <TiltCard
              maxTilt={4}
              scale={1.03}
              className="group relative flex h-full flex-col items-center text-center rounded-3xl border border-ink/10 bg-gradient-to-b from-white to-mist/40 p-8 shadow-[0_4px_20px_-4px_rgba(17,24,39,0.05)] transition-all duration-300 hover:border-brand/30 hover:shadow-[0_20px_40px_-15px_rgba(4,120,87,0.2)]"
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-soft font-display text-3xl font-bold text-brand-dark ring-1 ring-brand/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-dark group-hover:text-white shadow-sm">
                {i + 1}
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-ink transition-colors duration-200 group-hover:text-brand-dark">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink/70">{s.text}</p>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealOnScroll>

      {/* Bottom Redirect Button */}
      <RevealOnScroll direction="up" delay={0.3} className="mt-12 flex justify-center">
        <Button
          href="/how-it-works"
          variant="cta"
          size="lg"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.03] hover:shadow-emerald-500/40 active:scale-[0.98]"
        >
          <span>Read Full Step-by-Step Guide</span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Button>
      </RevealOnScroll>
    </Section>
  );
}
