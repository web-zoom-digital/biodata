import type { Metadata } from "next";
import Link from "next/link";
import { LandingPageLayout } from "@/components/seo/LandingPageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Marriage Biodata PDF Format – Create & Download | BioCraft",
  description: "Create a professional marriage biodata in PDF format using BioCraft. Customize your template, preview the A4 layout, and download your biodata.",
  path: "/marriage-biodata-pdf-format",
});

const HEADINGS = [
  { id: "why-pdf-is-preferred", text: "Why PDF is the Preferred Matrimonial Format" },
  { id: "pdf-vs-word", text: "PDF vs. Word (.docx) Comparison" },
  { id: "recommended-a4-structure", text: "Recommended A4 PDF Section Structure" },
  { id: "how-pdf-export-works", text: "How PDF Export Works in BioCraft" },
  { id: "how-to-download-pdf", text: "How to Create and Download Your PDF Biodata" },
];

const FAQS = [
  {
    question: "Why is PDF the recommended format for marriage biodata?",
    answer: "PDF files preserve exact layout dimensions, font styling, and page borders on every device, preventing accidental text shifting when viewed or printed.",
  },
  {
    question: "Can I convert or export my biodata as PNG or JPEG instead of PDF?",
    answer: "Yes. BioCraft supports downloading high-resolution PNG and JPEG image files in addition to standard A4 PDFs.",
  },
  {
    question: "Is a PDF biodata compatible with mobile messaging apps like WhatsApp?",
    answer: "Yes. PDF files can be attached directly in WhatsApp chats, email messages, or printed at local print shops.",
  },
  {
    question: "Does BioCraft support Microsoft Word (.docx) export?",
    answer: "BioCraft generates print-ready PDF, PNG, and JPEG files directly in browser to guarantee fixed A4 alignment. Word files often suffer from font shifts across devices.",
  },
];

const SILO_LINKS = [
  {
    title: "Free Marriage Biodata Maker",
    href: "/free-marriage-biodata-maker",
    text: "Create & download marriage biodatas online for free with zero signup.",
  },
  {
    title: "Wedding Biodata Maker",
    href: "/wedding-biodata-maker",
    text: "Explore matrimonial templates tailored for wedding proposals.",
  },
  {
    title: "Hindu Marriage Biodata",
    href: "/hindu-marriage-biodata",
    text: "Explore traditional Hindu formats with optional Gotra and horoscope fields.",
  },
  {
    title: "Biodata Without Photo",
    href: "/marriage-biodata-without-photo",
    text: "Clean, simple text-only formats focused on credentials.",
  },
  {
    title: "Biodata Format in Hindi",
    href: "/blog/marriage-biodata-format-in-hindi",
    text: "Common Hindi headings (विवाह बायोडाटा) and bilingual terms.",
  },
];

export default function MarriageBiodataPdfFormatPage() {
  return (
    <LandingPageLayout
      title="Marriage Biodata PDF Format"
      description="Create a professional marriage biodata in PDF format using BioCraft. Customize your template, preview the A4 layout live on screen, and download your file instantly."
      summary="Creating a marriage biodata in PDF format guarantees fixed A4 pagination, consistent font rendering, and crisp printing quality across all mobile devices, laptops, and paper printers. BioCraft exports high-resolution PDFs directly in your web browser."
      category="Technical Formats"
      path="/marriage-biodata-pdf-format"
      templateId="traditional-gold"
      updatedDate="Oct 3, 2026"
      readingMinutes={4}
      headings={HEADINGS}
      faqs={FAQS}
      siloLinks={SILO_LINKS}
    >
      <p>
        When sending a matrimonial proposal to another family, document formatting matters immensely. A <strong>marriage biodata PDF format</strong> is the gold standard for sharing matrimonial profiles because it ensures your document renders identically on every smartphone, tablet, computer, and paper printout.
      </p>

      <h2 id="why-pdf-is-preferred">Why PDF is the Preferred Matrimonial Format</h2>
      <p>
        Many people initially try to create biodata in Microsoft Word or Google Docs, only to encounter frustrating compatibility issues when sending files to recipients on different devices.
      </p>

      <h2 id="pdf-vs-word">PDF vs. Word (.docx) Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>PDF Format (.pdf)</th>
            <th>Word Format (.docx)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Layout Alignment</strong></td>
            <td>Fixed A4 layout; never shifts text</td>
            <td>Text often reflows and breaks lines</td>
          </tr>
          <tr>
            <td><strong>Font Rendering</strong></td>
            <td>Embedded fonts display identically</td>
            <td>Replaces missing device fonts</td>
          </tr>
          <tr>
            <td><strong>Print Output</strong></td>
            <td>Crisp ~300 DPI print quality</td>
            <td>Varies by printer software</td>
          </tr>
          <tr>
            <td><strong>Sharing Ease</strong></td>
            <td>Opens natively in WhatsApp &amp; browsers</td>
            <td>Requires office viewer apps</td>
          </tr>
        </tbody>
      </table>

      <h2 id="recommended-a4-structure">Recommended A4 PDF Section Structure</h2>
      <ul>
        <li><strong>Header &amp; Title:</strong> Candidate name, traditional blessing line, and photo (or see <Link href="/marriage-biodata-without-photo">marriage biodata without photo</Link>).</li>
        <li><strong>Personal Credentials:</strong> Date of birth, height, educational degrees, occupation, income, and location.</li>
        <li><strong>Family Background:</strong> Father&apos;s and mother&apos;s details, sibling careers, and native place.</li>
        <li><strong>Cultural/Astrological Details:</strong> Gotra, Rashi, and Nakshatra for traditional matching. See <Link href="/hindu-marriage-biodata">Hindu Marriage Biodata</Link>.</li>
        <li><strong>Contact Section:</strong> Contact person, mobile numbers, email, and address.</li>
      </ul>

      <h2 id="how-pdf-export-works">How PDF Export Works in BioCraft</h2>
      <p>
        BioCraft generates your PDF directly in your browser using canvas rasterization:
      </p>
      <ul>
        <li>Strictly calibrated to standard A4 dimensions (210mm x 297mm).</li>
        <li>Exports at ~300 DPI for crisp paper printing.</li>
        <li>In addition to PDF, BioCraft supports high-resolution PNG and JPEG downloads for mobile messaging.</li>
      </ul>

      <h2 id="how-to-download-pdf">How to Create and Download Your PDF Biodata</h2>
      <ol>
        <li>Visit our <Link href="/free-marriage-biodata-maker">free marriage biodata maker</Link> or open the <Link href="/create">online builder</Link>.</li>
        <li>Enter personal credentials, education, family background, and contact information.</li>
        <li>Browse our <Link href="/wedding-biodata-maker">wedding biodata maker</Link> styles or select a template in our <Link href="/templates">templates gallery</Link>.</li>
        <li>Review the live A4 preview on screen and click <strong>Download PDF</strong>. You can also check our guide on <Link href="/blog/marriage-biodata-format-in-hindi">marriage biodata format in Hindi</Link>.</li>
      </ol>
    </LandingPageLayout>
  );
}
