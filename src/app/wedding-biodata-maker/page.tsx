import type { Metadata } from "next";
import Link from "next/link";
import { LandingPageLayout } from "@/components/seo/LandingPageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Wedding Biodata Maker Online – Free Templates | BioCraft",
  description: "Create a wedding biodata online with elegant matrimonial templates. Customize your details, explore different styles, preview your design, and download it in supported formats.",
  path: "/wedding-biodata-maker",
});

const HEADINGS = [
  { id: "what-makes-wedding-biodata", text: "What Makes an Outstanding Wedding Biodata?" },
  { id: "popular-design-styles", text: "Popular Matrimonial Design Styles" },
  { id: "information-to-include", text: "Key Information to Include" },
  { id: "how-to-create-wedding-biodata", text: "How to Create Your Wedding Biodata Online" },
];

const FAQS = [
  {
    question: "What is the difference between a wedding biodata and a general marriage biodata?",
    answer: "A wedding biodata focuses heavily on matrimonial presentation, design aesthetics, family background, and personal expectations tailored specifically for wedding proposals.",
  },
  {
    question: "Can I customize the colors and fonts of my wedding biodata?",
    answer: "Yes, BioCraft templates allow you to select different color themes and font options directly in the online editor.",
  },
  {
    question: "Can I make a wedding biodata with or without a photograph?",
    answer: "BioCraft supports both photo and photo-optional layouts. If you choose not to upload a photo, the template automatically adjusts to maintain a balanced design.",
  },
  {
    question: "How do I share my completed wedding biodata?",
    answer: "Once generated, you can download an A4 PDF for printing, or save PNG/JPEG images directly to your phone for sharing over WhatsApp or email.",
  },
];

const SILO_LINKS = [
  {
    title: "Free Marriage Biodata Maker",
    href: "/free-marriage-biodata-maker",
    text: "Create & download marriage biodatas online for free with zero signup.",
  },
  {
    title: "Hindu Marriage Biodata",
    href: "/hindu-marriage-biodata",
    text: "Explore traditional Hindu formats with optional Gotra and horoscope fields.",
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

export default function WeddingBiodataMakerPage() {
  return (
    <LandingPageLayout
      title="Wedding Biodata Maker Online"
      description="Create a wedding biodata online with elegant matrimonial templates. Customize your details, explore different styles, preview your design, and download it in supported formats."
      summary="BioCraft's online wedding biodata maker provides handcrafted templates tailored for matrimonial proposals. Easily balance formal credentials with family background and design elegance, then download an A4 PDF or HD image."
      category="Design"
      path="/wedding-biodata-maker"
      templateId="modern-indigo"
      updatedDate="Oct 3, 2026"
      readingMinutes={4}
      headings={HEADINGS}
      faqs={FAQS}
      siloLinks={SILO_LINKS}
    >
      <p>
        A wedding biodata is an essential document used across many cultures to introduce eligible brides and grooms to prospective families. Using an <strong>online wedding bio data maker</strong> helps you present your qualifications, personal values, and family background in an aesthetically pleasing and dignified manner.
      </p>

      <h2 id="what-makes-wedding-biodata">What Makes an Outstanding Wedding Biodata?</h2>
      <p>
        Unlike a standard employment resume, a wedding biodata balances formal achievements with personal warmth and family context. Key characteristics of an effective wedding biodata include:
      </p>
      <ul>
        <li><strong>Clean visual layout:</strong> Well-spaced sections, clear headings, and structured key-value pairs make reading effortless.</li>
        <li><strong>Thoughtful presentation:</strong> Soft floral accents or elegant border frames add a touch of celebration without overpowering the text.</li>
        <li><strong>Accurate details:</strong> Clearly structured information about education, career, family background, and expectations.</li>
      </ul>

      <h2 id="popular-design-styles">Popular Matrimonial Design Styles</h2>
      <p>
        Explore our curated collection in the <Link href="/templates">templates gallery</Link>:
      </p>
      <table>
        <thead>
          <tr>
            <th>Template Style</th>
            <th>Design Characteristics</th>
            <th>Best Suited For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Traditional Gold</strong></td>
            <td>Rich golden borders and cultural motifs</td>
            <td>Traditional announcements. See <Link href="/hindu-marriage-biodata">Hindu Marriage Biodata</Link>.</td>
          </tr>
          <tr>
            <td><strong>Modern Indigo</strong></td>
            <td>Clean two-column layout with subtle indigo headers</td>
            <td>Contemporary, corporate-style proposals.</td>
          </tr>
          <tr>
            <td><strong>Elegant Rose</strong></td>
            <td>Soft rose-gold hues with refined serif headers</td>
            <td>Artistic, elegant matrimonial announcements.</td>
          </tr>
          <tr>
            <td><strong>Minimal Ivory</strong></td>
            <td>Generous whitespace and clean typography</td>
            <td>Candidates who prefer non-photo text layouts. See <Link href="/marriage-biodata-without-photo">Biodata Without Photo</Link>.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="information-to-include">Key Information to Include</h2>
      <p>
        To ensure your proposal contains all necessary information, structure your details across these key areas:
      </p>
      <ol>
        <li><strong>Header Information:</strong> Full name, photograph (if desired), and an optional traditional blessing line.</li>
        <li><strong>Personal Profile:</strong> Date of birth, height, educational qualifications, university, current designation, and annual income.</li>
        <li><strong>Family Details:</strong> Father&apos;s name and occupation, mother&apos;s background, sibling details, and ancestral roots.</li>
        <li><strong>Contact Information:</strong> Primary contact person, phone number, email address, and home location.</li>
      </ol>

      <h2 id="how-to-create-wedding-biodata">How to Create Your Wedding Biodata Online</h2>
      <p>
        Creating your wedding profile takes only a few simple steps:
      </p>
      <ul>
        <li>Visit our <Link href="/free-marriage-biodata-maker">free marriage biodata maker</Link> or open the <Link href="/create">online builder</Link>.</li>
        <li>Enter your details in the intuitive form fields.</li>
        <li>Browse template previews to select your preferred color palette and layout.</li>
        <li>Download as an A4 PDF or high-res image. Learn more in our <Link href="/marriage-biodata-pdf-format">marriage biodata PDF format</Link> guide or read about <Link href="/blog/marriage-biodata-format-in-hindi">marriage biodata format in Hindi</Link>.</li>
      </ul>
    </LandingPageLayout>
  );
}
