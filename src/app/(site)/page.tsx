import { BiodataTypes } from "@/components/home/BiodataTypes";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HomeBlog } from "@/components/home/HomeBlog";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { WhyBioCraft } from "@/components/home/WhyBioCraft";
import { FaqSection } from "@/components/faq/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faqs";
import { howToJsonLd, webApplicationJsonLd } from "@/lib/seo";
import { STEPS } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd(),
          howToJsonLd({
            name: "How to make a marriage biodata online",
            description: "Create a marriage biodata in three steps and download it as PDF, PNG or JPEG.",
            steps: STEPS.map((s) => ({ name: s.title, text: s.text })),
          }),
        ]}
      />
      <Hero />
      <HowItWorks />
      <TemplateShowcase />
      <WhyBioCraft />
      <BiodataTypes />
      <HomeBlog />
      <FaqSection faqs={FAQS.slice(0, 7)} />
      <FinalCta />
    </>
  );
}

