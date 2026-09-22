import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/layout/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact BioCraft — Feedback, Support & Template Requests",
  description: `Send feedback, report a problem or suggest a template for ${siteConfig.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" intro="Feedback, a bug, a field or template you would like to see? We read every message." crumbs={[{ name: "Contact", path: "/contact" }]} />
      <Container className="grid max-w-5xl gap-12 py-14 md:grid-cols-[1fr_0.8fr]">
        <ContactForm />
        <aside className="rounded-2xl bg-mist p-6">
          <h2 className="font-display text-xl font-semibold">Prefer to write directly?</h2>
          <p className="mt-2 text-ink/70">
            Email{" "}
            <a className="font-medium text-brand-dark underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </p>
          <h3 className="mt-6 font-semibold">Reporting a problem?</h3>
          <p className="mt-1 text-ink/70">Tell us your phone or browser, the template you used and what happened when you pressed Download. Please do not email your full biodata.</p>
        </aside>
      </Container>
    </>
  );
}
