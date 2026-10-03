import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Create your marriage biodata",
  description: "Fill in your details, choose a template and download your biodata as PDF, PNG or JPEG. Works on phone and desktop. No signup.",
  path: "/create",
  noindex: true,
});

export default function CreateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
