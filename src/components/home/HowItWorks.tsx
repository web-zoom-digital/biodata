import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { STEPS } from "@/data/home";

/** A real sequence, so numbered steps are meaningful here. */
export function HowItWorks({ heading = "Three steps, about ten minutes" }: { heading?: string }) {
  return (
    <Section>
      <SectionHeading
        align="center"
        title={heading}
        intro="You don't need design skills or an account. Keep the details handy and start with the first section."
      />
      <ol className="mt-14 grid gap-8 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="group relative flex flex-col items-center text-center rounded-3xl border border-ink/10 bg-gradient-to-b from-white to-mist/40 p-8 shadow-[0_4px_20px_-4px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_20px_40px_-15px_rgba(4,120,87,0.2)]"
          >
            <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-soft font-display text-3xl font-bold text-brand-dark ring-1 ring-brand/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-dark group-hover:text-white shadow-sm">
              {i + 1}
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-ink">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">{s.text}</p>
          </li>
        ))}
      </ol>

      {/* Bottom Redirect Button */}
      <div className="mt-12 flex justify-center">
        <Button
          href="/how-it-works"
          variant="cta"
          size="lg"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.03] hover:shadow-emerald-500/40 active:scale-[0.98]"
        >
          <span>Read Full Step-by-Step Guide</span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}

