"use client";

import { ArrowUp, CheckCircle2, Heart, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "../ui/Logo";

const GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Create Biodata", href: "/create" },
      { label: "Templates Gallery", href: "/templates" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Frequently Asked Questions", href: "/faq" },
    ],
  },
  {
    title: "Biodata Formats",
    links: [
      { label: "Format for Boy", href: "/blog/marriage-biodata-format-for-boy" },
      { label: "Format for Girl", href: "/blog/marriage-biodata-format-for-girl" },
      { label: "Online Biodata Maker", href: "/blog/how-to-make-marriage-biodata-online" },
      { label: "Hindi Biodata Formats", href: "/blog/marriage-biodata-format-in-hindi" },
    ],
  },
  {
    title: "Guides & Tips",
    links: [
      { label: "How to Make Biodata", href: "/guides/how-to-make-marriage-biodata" },
      { label: "Photo Selection Advice", href: "/blog/how-to-choose-a-biodata-photo" },
      { label: "All Blog & Articles", href: "/blog" },
      { label: "Step-by-Step Guides", href: "/guides" },
    ],
  },
  {
    title: "Company & Legal",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300 border-t border-slate-800/80">
      <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-sky-900/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-indigo-900/20 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col items-start">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            {siteConfig.name} helps families build beautifully formatted, traditional and modern marriage biodatas in minutes without user registration or privacy risks.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-sky-400">
              <Lock className="size-3" /> 100% Private
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="size-3" /> Zero Server Storage
            </span>
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                {g.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex text-xs sm:text-sm text-slate-400 transition-colors duration-200 hover:text-sky-400 hover:translate-x-0.5"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-xs text-slate-500 sm:flex-row sm:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">&middot;</span>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="size-3 text-rose-500 fill-rose-500" /> for families
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="size-3.5" /> Data stays on your browser
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex size-8 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-sky-500/50 hover:bg-slate-800 hover:text-white"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-6xl border-t border-slate-800/50 px-5 pt-4 text-center sm:px-8">
          <p className="text-xs text-slate-600">
            Developed &amp; maintained by{" "}
            <a
              href="https://www.zoomdigital.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-400 transition-colors hover:text-sky-400 underline underline-offset-2"
            >
              Zoom Digital
            </a>
            {" "}— a web &amp; digital services company.
          </p>
        </div>
      </div>
    </footer>
  );
}
