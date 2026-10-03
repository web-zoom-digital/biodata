import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Container, Section } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplatesGallery } from "@/components/templates/TemplatesGallery";
import { TemplatesHero } from "@/components/templates/TemplatesHero";
import { FAQS } from "@/data/faqs";
import { itemListJsonLd } from "@/lib/seo";
import { templates } from "@/templates";

export default function TemplatesPage() {
  const cards = Object.fromEntries(templates.map((t) => [t.id, <TemplateCard key={t.id} template={t} />]));
  return (
    <>
      <JsonLd data={itemListJsonLd("Marriage biodata templates", templates.map((t) => ({ name: t.name, path: `/create?template=${t.id}` })))} />
      <TemplatesHero />

      <div className="border-b border-brand/10 bg-brand-soft/70 py-6">
        <Container>
          <p className="mx-auto max-w-4xl text-center font-medium leading-relaxed text-ink/80 sm:text-lg">
            Explore our collection of professionally designed A4 marriage biodata formats crafted for every culture, tradition, and personal style.
            Select any template to customize with live real-time preview, high-resolution PDF exports, and zero data loss when switching designs.
          </p>
        </Container>
      </div>

      <Section id="gallery">
        <TemplatesGallery cards={cards} />
      </Section>

      <FaqSection faqs={FAQS} title="Frequently asked questions about biodata templates" />

      <FinalCta title="Not sure which to pick?" text="Open any template with sample details, then try the others from the editor. Your details never change when you switch." />
    </>
  );
}
