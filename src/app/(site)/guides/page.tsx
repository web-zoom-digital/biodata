import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { FilterableGrid } from "@/components/blog/FilterableGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAll } from "@/lib/content";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Marriage Biodata Guides & Step-by-Step Writing Help",
  description: "Step-by-step guides: how to make a marriage biodata, write About Me and partner expectations, choose a template, share it safely and print it on A4.",
  path: "/guides",
});

export default function GuidesPage() {
  const guides = getAll("guides");
  return (
    <>
      <JsonLd data={itemListJsonLd("Marriage biodata guides", guides.map((g) => ({ name: g.title, path: `/guides/${g.slug}` })))} />
      <PageHero title="Marriage biodata guides" intro="Step-by-step help for each part of making, checking, sharing and printing your biodata." crumbs={[{ name: "Guides", path: "/guides" }]} />
      <Section>
        <FilterableGrid label="guides" entries={guides.map((g) => ({ slug: g.slug, category: g.category, node: <ArticleCard item={g} kind="guides" /> }))} />
      </Section>
      <FinalCta />
    </>
  );
}
