import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact BioCraft — Feedback, Support & Template Requests",
  description: `Send feedback, report a problem or suggest a template for ${siteConfig.name}.`,
  path: "/contact",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
