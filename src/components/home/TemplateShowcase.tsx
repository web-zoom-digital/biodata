import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Container";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { Button } from "@/components/ui/Button";
import { templates } from "@/templates";

export function TemplateShowcase() {
  return (
    <Section tone="soft">
      {/* Centered Heading */}
      <SectionHeading
        align="center"
        title="Templates for every kind of family"
        intro="Traditional, modern or minimal. Each preview below is drawn with sample details, and yours will replace them in the editor."
      />

      {/* Grid of Templates */}
      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {templates.slice(0, 6).map((t) => (
          <li key={t.id}>
            <TemplateCard template={t} />
          </li>
        ))}
      </ul>

      {/* Bottom Redirect Button */}
      <div className="mt-12 flex justify-center">
        <Button
          href="/templates"
          variant="cta"
          size="lg"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-[0.98]"
        >
          <span>Explore All Templates</span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}

