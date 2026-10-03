import type { Metadata } from "next";
import Link from "next/link";
import { LandingPageLayout } from "@/components/seo/LandingPageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hindu Marriage Biodata Format & Templates | BioCraft",
  description: "Explore Hindu marriage biodata formats with personal, family, education, profession, and optional cultural details. Customize a suitable template online with BioCraft.",
  path: "/hindu-marriage-biodata",
});

const HEADINGS = [
  { id: "overview", text: "Overview of Hindu Matrimonial Biodata Structure" },
  { id: "core-sections", text: "Core Sections of a Hindu Biodata" },
  { id: "cultural-diversity", text: "Respecting Cultural Diversity" },
  { id: "how-to-create-hindu-biodata", text: "How to Create Your Hindu Biodata Online" },
];

const FAQS = [
  {
    question: "What cultural and astrological details are typically included in a Hindu biodata?",
    answer: "Common optional fields include Gotra, Moon Sign (Rashi), Nakshatra, Time/Place of Birth, and Manglik status. These fields are completely optional in BioCraft.",
  },
  {
    question: "Do all Hindu families require caste, gotra, or horoscope information?",
    answer: "No. Many modern Hindu families focus primarily on education, career, personal values, and family background, omitting astrological details entirely.",
  },
  {
    question: "Can I create a Hindu biodata in Hindi script?",
    answer: "Yes. You can type Devanagari Hindi text in any field using your device keyboard or input tools. For specific terms and headings in Hindi, read our Hindi biodata guide.",
  },
  {
    question: "Which templates are best suited for traditional Hindu proposals?",
    answer: "Templates like Traditional Gold, Royal Heritage, and Red Rose Classic feature ornamental frames, warm golden tones, and classic header designs well-suited for traditional announcements.",
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
    title: "Biodata Without Photo",
    href: "/marriage-biodata-without-photo",
    text: "Simple, clean non-photo biodata layouts focused on credentials.",
  },
  {
    title: "Marriage Biodata PDF Format",
    href: "/marriage-biodata-pdf-format",
    text: "Create and export crisp print-ready A4 PDF files.",
  },
  {
    title: "Biodata Format in Hindi",
    href: "/blog/marriage-biodata-format-in-hindi",
    text: "Common Hindi headings (विवाह बायोडाटा) and bilingual terms.",
  },
];

export default function HinduMarriageBiodataPage() {
  return (
    <LandingPageLayout
      title="Hindu Marriage Biodata Format & Templates"
      description="Explore Hindu marriage biodata formats with personal, family, education, profession, and optional cultural details. Customize a suitable template online with BioCraft."
      summary="A Hindu marriage biodata format organizes personal credentials, family lineage, and optional astrological details (such as Gotra, Rashi, and Manglik status) into a clear A4 layout. BioCraft offers flexible templates to easily include or omit cultural fields."
      category="Cultural Formats"
      path="/hindu-marriage-biodata"
      templateId="royal-heritage"
      updatedDate="Oct 3, 2026"
      readingMinutes={4}
      headings={HEADINGS}
      faqs={FAQS}
      siloLinks={SILO_LINKS}
    >
      <p>
        When creating a matrimonial document for a Hindu wedding proposal, families often include specific cultural, family, and astrological details alongside educational and career accomplishments. Using a specialized <strong>Hindu marriage bio data maker</strong> ensures that all traditional sections are organized cleanly and presented respectfully.
      </p>

      <h2 id="overview">Overview of Hindu Matrimonial Biodata Structure</h2>
      <p>
        A complete Hindu matrimonial profile is typically arranged into four main sections:
      </p>

      <h2 id="core-sections">Core Sections of a Hindu Biodata</h2>
      <table>
        <thead>
          <tr>
            <th>Section</th>
            <th>Details to Include</th>
            <th>Notes &amp; Customization</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Personal &amp; Education</strong></td>
            <td>Full Name, DOB, Time &amp; Place of Birth, Height, Education, Profession, Income</td>
            <td>Time &amp; place of birth are essential if horoscope matching is observed.</td>
          </tr>
          <tr>
            <td><strong>2. Cultural / Astrological (Optional)</strong></td>
            <td>Religion, Caste, Sub-caste, Gotra, Rashi, Nakshatra, Manglik status</td>
            <td>100% optional in BioCraft. Empty fields auto-hide.</td>
          </tr>
          <tr>
            <td><strong>3. Family Background</strong></td>
            <td>Father&apos;s &amp; Mother&apos;s background, Sibling details, Native place</td>
            <td>Family details carry significant weight in traditional proposals.</td>
          </tr>
          <tr>
            <td><strong>4. Contact Details</strong></td>
            <td>Contact person, Mobile number, Address</td>
            <td>Usually a parent or guardian&apos;s primary phone number.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="cultural-diversity">Respecting Cultural Diversity</h2>
      <p>
        Traditions vary widely across regional Hindu communities. Many families place primary emphasis on academic qualifications, profession, and family values, choosing to omit astrological details entirely.
      </p>
      <p>
        In BioCraft, all astrological and cultural fields are 100% optional. Empty fields are automatically hidden, leaving zero empty placeholders or blank rows.
      </p>

      <h2 id="how-to-create-hindu-biodata">How to Create Your Hindu Biodata Online</h2>
      <ol>
        <li>Open our <Link href="/free-marriage-biodata-maker">free marriage biodata maker</Link> or launch the <Link href="/create">online builder</Link>.</li>
        <li>Enter personal credentials, family details, and optional astrological data.</li>
        <li>Select a traditional template style—such as <em>Royal Heritage</em>, <em>Traditional Gold</em>, or explore our full <Link href="/wedding-biodata-maker">wedding biodata maker</Link> collection.</li>
        <li>For non-photo profiles, see our advice on <Link href="/marriage-biodata-without-photo">marriage biodata without photo</Link>.</li>
        <li>Preview and download as an A4 PDF or image. Learn more in our <Link href="/marriage-biodata-pdf-format">marriage biodata PDF format guide</Link> or read about <Link href="/blog/marriage-biodata-format-in-hindi">marriage biodata format in Hindi</Link>.</li>
      </ol>
    </LandingPageLayout>
  );
}
