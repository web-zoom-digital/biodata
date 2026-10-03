import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Marriage Biodata Blog & Guides: Formats, Photo Tips & Etiquette",
  description: "Practical articles on marriage biodata formats for boys and girls, what to include, what to leave out, photos and how biodata differs from a matrimonial profile.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
