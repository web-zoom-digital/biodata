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

      </Section>
  );
}