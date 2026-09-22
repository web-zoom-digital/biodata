import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BIODATA_TYPES } from "@/data/home";

export function BiodataTypes() {
  return (
    <Section tone="brand">
      <SectionHeading
        align="center"
        title="Find the biodata style that fits"
        intro="Read how each kind of biodata is usually put together, then build yours in the editor."
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BIODATA_TYPES.map((t) => (
          <li key={t.label}>
            <Link href={t.href} className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-brand/20 bg-white p-5 transition-shadow hover:shadow-lg">
              <span>
                <span className="block text-lg font-semibold">{t.label}</span>
                <span className="mt-1 block text-[15px] text-ink/65">{t.text}</span>
              </span>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-brand-dark transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom Redirect Button */}
      <div className="mt-12 flex justify-center">
        <Button
          href="/guides"
          variant="cta"
          size="lg"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-rose-500/30 transition-all hover:scale-[1.03] hover:shadow-rose-500/40 active:scale-[0.98]"
        >
          <span>Browse All Biodata Guides</span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}

