import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogHero } from "@/components/blog/BlogHero";
import { FilterableGrid } from "@/components/blog/FilterableGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { Section } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAll } from "@/lib/content";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Marriage Biodata Blog & Guides: Formats, Photo Tips & Etiquette",
  description: "Practical articles on marriage biodata formats for boys and girls, what to include, what to leave out, photos and how biodata differs from a matrimonial profile.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAll("blog");
  return (
    <>
      <JsonLd data={itemListJsonLd("Marriage biodata blog", posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })))} />
      <BlogHero />
      <Section id="articles">
        <FilterableGrid label="articles" entries={posts.map((p) => ({ slug: p.slug, category: p.category, node: <ArticleCard item={p} kind="blog" /> }))} />
      </Section>
      <FinalCta />
    </>
  );
}

