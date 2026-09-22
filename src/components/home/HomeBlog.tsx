import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Container } from "@/components/layout/Container";
import { getAll } from "@/lib/content";

export function HomeBlog() {
  const articles = getAll("blog").slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 sm:py-24 border-t border-slate-200/60">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-sm">
            <BookOpen className="size-3.5 text-sky-600" aria-hidden="true" />
            <span>Marriage Biodata Guides & Blog</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Latest Tips, Etiquette & Wording Guides
          </h2>

          <p className="mt-3.5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Everything you need to know about preparing, formatting, and presenting a winning marriage biodata for family approval.
          </p>
        </div>

        {/* Featured Blog Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <div key={item.slug} className="h-full">
              <ArticleCard item={item} kind="blog" />
            </div>
          ))}
        </div>

        {/* Bottom Redirect Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.03] hover:shadow-indigo-500/40 active:scale-[0.98]"
          >
            <span>Explore All Blog Articles & Guides</span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
