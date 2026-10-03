import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use — BioCraft Marriage Biodata Maker",
  description: `The terms for using ${siteConfig.name} to create and download a marriage biodata.`,
  path: "/terms",
});

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
