import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy — BioCraft Marriage Biodata Maker",
  description: `How ${siteConfig.name} handles your information: no accounts, drafts stored in your own browser, and files created on your device.`,
  path: "/privacy",
});

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
