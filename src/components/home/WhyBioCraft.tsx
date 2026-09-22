import { ArrowRight, ListChecks, Printer, ScanEye, ScrollText, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { WHY } from "@/data/home";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [ShieldCheck, ScrollText, ListChecks, Printer, ScanEye];

export function WhyBioCraft() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-soft/60 to-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-cta/10 blur-3xl" />

      <div className="relative">
        <div className="text-center">
          <span className="mx-auto mb-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-cta" aria-hidden="true" />
          <SectionHeading
            align="center"
            title={`Why families choose ${siteConfig.name}`}
            intro="A biodata is a small document with a big job. We kept the tool small, too."
          />
        </div>

        <ul role="list" className="mt-14 grid gap-5 md:grid-cols-6 lg:gap-6">
          {WHY.map((w, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            const span = i < 3 ? "md:col-span-2" : "md:col-span-3";
            return (
              <li
                key={w.title}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 sm:p-8",
                  "shadow-[0_1px_2px_rgba(17,24,39,0.04)] transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_-18px_rgba(4,120,87,0.35)]",
                  span,
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-cta transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand-dark ring-1 ring-brand/15 transition-colors duration-300 group-hover:bg-brand-dark group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.35rem] font-semibold leading-snug text-ink">{w.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink/70">{w.text}</p>
              </li>
            );
          })}
        </ul>

        {/* Bottom Redirect Button */}
        <div className="mt-12 flex justify-center">
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="group rounded-full bg-white px-7 py-3 font-semibold text-slate-800 shadow-sm hover:shadow-md hover:border-sky-500"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Section>
  );
}