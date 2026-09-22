import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy — BioCraft Marriage Biodata Maker",
  description: `How ${siteConfig.name} handles your information: no accounts, drafts stored in your own browser, and files created on your device.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy policy" intro="Plain-language summary of what happens to the information you enter." crumbs={[{ name: "Privacy", path: "/privacy" }]} />
      <Container className="prose-article max-w-3xl py-14">
        <h2>The short version</h2>
        <p>
          {siteConfig.name} has no accounts and no database of biodata. What you type stays in your browser. The PDF, PNG and JPEG files are created on your device and are never sent to us.
        </p>
        <h2>What is stored on your device</h2>
        <p>
          To let you return to your work, the editor saves a draft in your browser&apos;s local storage. The draft includes the details you typed, the template and colour you chose, which sections are shown and
          your cropped profile photo. It stays on that browser on that device.
        </p>
        <p>
          You can remove it at any time with <strong>Clear draft</strong> in the editor, or by clearing your browser&apos;s site data. If you use a shared or public computer, clear the draft before you leave.
        </p>
        <h2>What we do not collect</h2>
        <ul>
          <li>We do not ask you to create an account or log in.</li>
          <li>We do not upload, receive or store your biodata, photo or contact details.</li>
          <li>We do not sell personal information.</li>
        </ul>
        <h2>Information you send us</h2>
        <p>The contact page opens your own email app with a drafted message. If you send it, we receive the email address and message you chose to send, and we use them only to reply.</p>
        <h2>Cookies and analytics</h2>
        <p>The biodata editor does not set advertising cookies. If analytics are added to this site in future, this page will be updated to say what is measured.</p>
        <h2>Sharing your biodata</h2>
        <p>Once you download a file and send it to someone, it is outside our control. Share only what you are comfortable with, and avoid ID numbers, bank details and full street addresses.</p>
        <h2>Contact</h2>
        <p>
          Questions about this policy? Write to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
        <p className="text-sm text-ink/60">Last updated: September 2026.</p>
      </Container>
    </>
  );
}
