import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { getOne, getRelated, getSlugs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getSlugs("guides").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getOne("guides", slug);
  if (!item) return {};
  return pageMetadata({ title: item.title, description: item.description, path: `/guides/${slug}`, type: "article", publishedTime: item.date, modifiedTime: item.updated ?? item.date });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const item = getOne("guides", slug);
  if (!item) notFound();
  return <ArticleLayout item={item} kind="guides" related={getRelated("guides", item)} />;
}
