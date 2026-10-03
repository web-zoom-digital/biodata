import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About BioCraft — Free Marriage Biodata Maker",
  description: `${siteConfig.name} is a private, no-signup marriage biodata maker with clean templates, a live A4 preview and PDF, PNG and JPEG downloads.`,
  path: "/about",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
