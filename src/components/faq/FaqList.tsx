"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";
import { AccordionItem } from "../ui/Accordion";

/** FAQ accordion. Answers stay in the DOM (only visually collapsed) so search engines and assistants can read them. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => (
        <AccordionItem
          key={f.question}
          variant="elevated"
          open={openIndex === i}
          onOpenChange={(o) => setOpenIndex(o ? i : null)}
          title={<span className="text-base font-semibold sm:text-lg">{f.question}</span>}
        >
          <p className="leading-relaxed text-ink/75">{f.answer}</p>
        </AccordionItem>
      ))}
    </div>
  );
}