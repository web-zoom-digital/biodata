import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free Marriage Biodata Templates — Traditional, Modern & Floral Designs",
  description: "Browse traditional, modern, minimal and floral marriage biodata templates. Preview each one, then fill in your details and download as PDF, PNG or JPEG.",
  path: "/templates",
});

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
