import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How It Works: Create Marriage Biodata Online in 3 Steps",
  description: "Learn how to make a professional marriage biodata in 3 simple steps. Fill details, choose a template, and download instant PDF or HD images. Free, private, and mobile-friendly.",
  path: "/how-it-works",
});

export default function HowItWorksLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
