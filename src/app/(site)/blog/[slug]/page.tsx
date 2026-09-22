import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { getOne, getRelated, getSlugs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getOne("blog", slug);
  if (!item) return {};
  return pageMetadata({ title: item.title, description: item.description, path: `/blog/${slug}`, type: "article", publishedTime: item.date, modifiedTime: item.updated ?? item.date });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const item = getOne("blog", slug);
  if (!item) notFound();
  return <ArticleLayout item={item} kind="blog" related={getRelated("blog", item)} />;
}
