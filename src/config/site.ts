
export const siteConfig = {
  name: "BioCraft",
  tagline: "Marriage biodata maker",
  shortDescription:
    "Create a clean, professional marriage biodata in minutes. Fill in your details, pick a template, and download a print-ready PDF, PNG or JPEG. No signup needed.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://biocraft.example",
  locale: "en_IN",
  contactEmail: "hello@biocraft.example",
  storageKey: "biocraft_biodata_v1",
  links: {
    instagram: "",
    facebook: "",
    youtube: "",
    x: "",
  },
  brand: {
    primary: "#059669",
    primaryDark: "#047857",
    indigo: "#4F46E5",
    cta: "#F97316",
    gray: "#9CA3AF",
    background: "#FFFFFF",
    soft: "#F3F4F6",
    ink: "#111827",
  },
  keywords: [
    "marriage biodata maker",
    "biodata maker online",
    "free biodata maker",
    "biodata format for marriage",
    "biodata PDF maker",
    "biodata template",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Templates", href: "/templates" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  footer: {
    product: [
      { label: "Create Bio", href: "/create" },
      { label: "Templates", href: "/templates" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
    ],
    learn: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/guides" },
      { label: "Marriage biodata for boy", href: "/blog/marriage-biodata-format-for-boy" },
      { label: "Marriage biodata for girl", href: "/blog/marriage-biodata-format-for-girl" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
