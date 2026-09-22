import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About BioCraft — Free Marriage Biodata Maker",
  description: `${siteConfig.name} is a private, no-signup marriage biodata maker with clean templates, a live A4 preview and PDF, PNG and JPEG downloads.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero title={`About ${siteConfig.name}`} intro="A small, focused tool for one job: making a clear marriage biodata without friction." crumbs={[{ name: "About", path: "/about" }]} />
      <Container className="prose-article max-w-3xl py-14">
        <h2>Why it exists</h2>
        <p>
          A biodata is often the first document two families see. It should be easy to read, easy to share and respectful of the people in it. Yet making one usually means fighting with a word processor,
          or entering family details into a site that wants an account first.
        </p>
        <h2>What we believe</h2>
        <ul>
          <li>
            <strong>Your family&apos;s details are yours.</strong> The editor works in your browser and keeps the draft on your device.
          </li>
          <li>
            <strong>Fewer fields, better biodata.</strong> Only a name and date of birth are needed, and empty fields never show up in the final document.
          </li>
          <li>
            <strong>Design should support the content.</strong> Templates are clear and printable, from traditional to minimal, rather than crowded with decoration.
          </li>
          <li>
            <strong>It should work on the phone in your hand.</strong> Most families fill this in on a mobile, so the editor is built for small screens too.
          </li>
        </ul>
        <h2>What it is not</h2>
        <p>
          {siteConfig.name} is not a matchmaking service or a matrimonial site. It does not publish your biodata, collect profiles or introduce people. It helps you create a document that you share yourself, in the way you
          are comfortable with.
        </p>
        <h2>Get in touch</h2>
        <p>
          Found something confusing, or want a field or template we don&apos;t have? Write to us from the <Link href="/contact">contact page</Link>.
        </p>
      </Container>
      <FinalCta />
    </>
  );
}
