import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Marriage Biodata Guides & Step-by-Step Writing Help",
  description: "Step-by-step guides: how to make a marriage biodata, write About Me and partner expectations, choose a template, share it safely and print it on A4.",
  path: "/guides",
});

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
