import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Container";
import type { Faq } from "@/data/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { faqJsonLd } from "@/lib/seo";
import { FaqList } from "./FaqList";

interface Props {
  faqs: Faq[];
  title?: string;
  intro?: string;
  withSchema?: boolean;
}

export function FaqSection({ faqs, title = "Questions people ask before they start", intro, withSchema = true }: Props) {
  return (
    <Section>
      {withSchema ? <JsonLd data={faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer })))} /> : null}
      <SectionHeading align="center" title={title} intro={intro} />
      <div className="mx-auto mt-12 max-w-3xl">
        <FaqList faqs={faqs} />
      </div>

      {/* Bottom Redirect Button */}
      <div className="mt-12 flex justify-center">
        <Button
          href="/faq"
          variant="outline"
          size="lg"
          className="group rounded-full bg-white px-7 py-3 font-semibold text-slate-800 shadow-sm hover:shadow-md hover:border-sky-500"
        >
          <span>View All Frequently Asked Questions</span>
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}