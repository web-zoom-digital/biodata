import type { Metadata } from "next";
import { Suspense } from "react";
import { CreatePage } from "@/components/editor/CreatePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Create your marriage biodata",
  description: "Fill in your details, choose a template and download your biodata as PDF, PNG or JPEG. Works on phone and desktop. No signup.",
  path: "/create",
  noindex: true,
});

export default function Page() {
  return (
    <main id="main">
      <Suspense fallback={<div className="grid h-dvh place-items-center text-ink/60">Loading the editor...</div>}>
        <CreatePage />
      </Suspense>
    </main>
  );
}
