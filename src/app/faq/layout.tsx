import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions — Marriage Biodata Maker",
  description: "Answers about making a marriage biodata: pricing, privacy, downloads, mobile use, templates and multi-page biodata.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
