import type { Metadata } from "next";
import { FaqHero } from "@/components/faq/FaqHero";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions — Marriage Biodata Maker",
  description: "Answers about making a marriage biodata: pricing, privacy, downloads, mobile use, templates and multi-page biodata.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <FaqHero />
      <div id="faqs">
        <FaqSection faqs={FAQS} title="Everything in One Place" />
      </div>
      <FinalCta title="Still have a question?" text="Try the editor with sample details, or write to us from the contact page." />
    </>
  );
}
