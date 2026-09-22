import type { Metadata } from "next";
import { CheckCircle2, Download, FileText, Layout, Lock, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { Container, Section, SectionHeading } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { FAQS } from "@/data/faqs";
import { STEPS } from "@/data/home";
import { howToJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How It Works: Create Marriage Biodata Online in 3 Steps",
  description: "Learn how to make a professional marriage biodata in 3 simple steps. Fill details, choose a template, and download instant PDF or HD images. Free, private, and mobile-friendly.",
  path: "/how-it-works",
});

const CHECKLIST_ITEMS = [
  {
    icon: UserCheck,
    title: "Personal Information",
    items: ["Full Name & Date of Birth", "Time & Place of Birth (for horoscope)", "Height, Complexion & Physical Status", "Religion, Caste, Sub-caste & Gothra"],
  },
  {
    icon: FileText,
    title: "Educational & Career Details",
    items: ["Highest Qualification & College", "Current Occupation & Designation", "Employer / Company Name & Location", "Annual Income (Optional)"],
  },
  {
    icon: Layout,
    title: "Family Background",
    items: ["Father's Name & Occupation", "Mother's Name & Occupation", "Number of Brothers & Sisters (Married/Unmarried)", "Native Place & Family Values"],
  },
  {
    icon: Download,
    title: "Contact & Expectations",
    items: ["Contact Persons & Phone Numbers", "Email Address & Residential Address", "Preferred Partner Education & Age", "Location Preferences"],
  },
];

const PRO_TIPS = [
  { title: "Keep the details accurate & handy", text: "Have birth time, place, family background, and contact numbers ready before you start filling out the form for a fast 5-minute experience." },
  { title: "Use a clean portrait photo", text: "Select a recent, well-lit portrait photograph with a friendly expression. Our editor lets you zoom, pan, and crop your photo easily." },
  { title: "Hide unused sections effortlessly", text: "Toggle off any section you don't need (such as horoscope/astrology or lifestyle) and your biodata auto-adjusts layout cleanly." },
  { title: "Check the page boundary before download", text: "Our live A4 preview shows page breaks clearly so you can adjust text length to fit perfectly on a single page or two pages." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={howToJsonLd({
          name: "How to make a marriage biodata online",
          description: "Create a marriage biodata in three simple steps and download it as PDF, PNG or JPEG.",
          steps: STEPS.map((s) => ({ name: s.title, text: s.text })),
        })}
      />

      {/* Hero Section matching Home Page style */}
      <HowItWorksHero />

      {/* Step by Step Breakdown */}
      <HowItWorks heading="3 Simple Steps to Your Biodata" />

      {/* Complete Checklist Section for SEO */}
      <Section tone="soft">
        <SectionHeading
          align="center"
          title="What Details Should You Include in a Marriage Biodata?"
          intro="A well-structured biodata creates a strong first impression for prospective families. Here is a quick checklist of essential details."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHECKLIST_ITEMS.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-200/50">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{c.title}</h3>
                <ul className="mt-3 space-y-2 text-xs font-medium text-slate-600">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 shrink-0 text-sky-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Pro Tips Section */}
      <Section>
        <SectionHeading
          align="center"
          title="Pro Tips for Making a Standout Biodata"
          intro="Follow these helpful recommendations to ensure your matrimonial profile looks polished, professional, and respectful."
        />
        <dl className="mt-12 grid gap-8 sm:grid-cols-2">
          {PRO_TIPS.map((t) => (
            <div key={t.title} className="rounded-2xl border-l-4 border-sky-600 bg-sky-50/50 p-6 shadow-sm">
              <dt className="text-lg font-bold text-slate-900">{t.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-700">{t.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Privacy & Security Feature Section */}
      <Section tone="soft">
        <Container className="max-w-4xl">
          <div className="rounded-3xl border border-sky-200/70 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/50 p-8 sm:p-12 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md">
                <ShieldCheck className="size-8" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
                100% Private & Secure — Your Data Never Leaves Your Device
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
                Unlike other platforms that upload your personal information to external databases, our online biodata maker processes everything locally inside your web browser. Your phone numbers, family details, and photos remain entirely private.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-800">
                <span className="flex items-center gap-2">
                  <Lock className="size-4 text-sky-600" /> No Registration Required
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="size-4 text-sky-600" /> Instant PDF & Image Generation
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-sky-600" /> Zero Server Storage
                </span>
              </div>
              <div className="mt-8">
                <Button href="/create" variant="cta" size="lg" className="rounded-full px-8 py-3.5 shadow-lg">
                  Start Creating Your Biodata Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <FaqSection faqs={FAQS} title="Frequently Asked Questions About Creating a Biodata" withSchema={false} />

      {/* Final CTA */}
      <FinalCta title="Ready to Build Your Marriage Biodata?" text="Choose your template, enter your details, and download a beautiful A4 PDF or HD image in minutes." />
    </>
  );
}

