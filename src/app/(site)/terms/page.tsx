import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use — BioCraft Marriage Biodata Maker",
  description: `The terms for using ${siteConfig.name} to create and download a marriage biodata.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of use" intro="The ground rules for using this tool." crumbs={[{ name: "Terms", path: "/terms" }]} />
      <Container className="prose-article max-w-3xl py-14">
        <h2>Using {siteConfig.name}</h2>
        <p>
          You may use {siteConfig.name} to create biodata documents for yourself or for a family member, with their knowledge. The service is provided free of charge and may change or be updated at any time.
        </p>
        <h2>Your content</h2>
        <p>You are responsible for the accuracy and appropriateness of the details you enter, and for having the right to use any photo you upload. Do not enter details about another person without their permission.</p>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not use the tool to create misleading, abusive or unlawful content.</li>
          <li>Do not attempt to disrupt, copy or reverse-engineer the service in a way that harms others.</li>
        </ul>
        <h2>Templates and files you create</h2>
        <p>You own the biodata you create and may print, share and distribute it. The template designs and site code remain the property of {siteConfig.name} and may not be resold as templates.</p>
        <h2>No matchmaking or guarantee</h2>
        <p>
          {siteConfig.name} is a document tool. It does not verify information, introduce people or guarantee any outcome. Files are generated in your browser, and results can vary between devices. Please check every
          file before you share it.
        </p>
        <h2>Limitation of liability</h2>
        <p>The service is provided as is, without warranties. To the extent the law allows, we are not liable for losses arising from its use, including loss of a locally stored draft.</p>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Write to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
        <p className="text-sm text-ink/60">Last updated: September 2026.</p>
      </Container>
    </>
  );
}
