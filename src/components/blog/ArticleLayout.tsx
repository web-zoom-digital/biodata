import { ArrowRight, Lightbulb, Pencil, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FaqList } from "@/components/faq/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { Button } from "@/components/ui/Button";
import type { ContentItem, ContentKind, ContentMeta } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { getTemplateOrDefault } from "@/templates";
import { ArticleCard } from "./ArticleCard";

function getFeaturedTemplateForArticle(slug: string) {
  if (slug.includes("boy")) return getTemplateOrDefault("royal-heritage");
  if (slug.includes("girl")) return getTemplateOrDefault("elegant-rose");
  if (slug.includes("hindi")) return getTemplateOrDefault("traditional-gold");
  if (slug.includes("photo")) return getTemplateOrDefault("emerald-classic");
  if (slug.includes("matrimonial")) return getTemplateOrDefault("modern-indigo");
  if (slug.includes("one-page")) return getTemplateOrDefault("minimal-ivory");
  return getTemplateOrDefault("emerald-classic");
}

export function ArticleLayout({ item, kind, related }: { item: ContentItem; kind: ContentKind; related: ContentMeta[] }) {
  const base = kind === "blog" ? { name: "Blog", path: "/blog" } : { name: "Guides", path: "/guides" };
  const path = `${base.path}/${item.slug}`;
  const schema: object[] = [
    articleJsonLd({ title: item.title, description: item.description, path, published: item.date, updated: item.updated }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: base.name, path: base.path },
      { name: item.title, path },
    ]),
  ];
  if (item.faqs.length) schema.push(faqJsonLd(item.faqs));
  if (item.howTo && item.steps.length) schema.push(howToJsonLd({ name: item.title, description: item.description, steps: item.steps }));

  const featuredTemplate = getFeaturedTemplateForArticle(item.slug);
  const editUrl = `/create?template=${featuredTemplate.id}`;

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50/90 via-violet-50/80 to-fuchsia-100/90 py-10 sm:py-16 lg:py-20">
        <Image
          src={kind === "blog" ? "/images/heroes/blog-hero-bg.jpg" : "/images/heroes/guides-hero-bg.jpg"}
          alt={item.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 mix-blend-overlay"
        />

        <div className="pointer-events-none absolute -top-40 -left-40 size-[32rem] rounded-full bg-purple-300/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 -right-20 size-[28rem] rounded-full bg-violet-300/35 blur-3xl" aria-hidden="true" />

        <Container className="relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-purple-700 hover:underline">
                  Home
                </Link>
                <span aria-hidden="true" className="ml-2 text-slate-400">/</span>
              </li>
              <li>
                <Link href={base.path} className="hover:text-purple-700 hover:underline">
                  {base.name}
                </Link>
                <span aria-hidden="true" className="ml-2 text-slate-400">/</span>
              </li>
              <li aria-current="page" className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">
                {item.title}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col items-start text-left lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/80 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 shadow-sm backdrop-blur-md">
                <Sparkles className="size-3.5 text-purple-500" aria-hidden="true" />
                <span>{item.category}</span>
                <span className="text-slate-300">&middot;</span>
                <time dateTime={item.updated ?? item.date}>Updated {formatDate(item.updated ?? item.date)}</time>
                <span className="text-slate-300">&middot;</span>
                <span>{item.readingMinutes} min read</span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                {item.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
                {item.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  href={editUrl}
                  variant="cta"
                  size="lg"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-[0.98]"
                >
                  <Pencil className="size-4.5" aria-hidden="true" />
                  <span>Edit {featuredTemplate.name} Template</span>
                  <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="group relative w-full max-w-xs sm:max-w-sm rounded-3xl bg-white p-3.5 shadow-2xl border-2 border-purple-400/40 transition-transform duration-300 hover:scale-[1.02]">
                <div className="mb-3 flex items-center justify-between px-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
                    Recommended Template
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{featuredTemplate.name}</span>
                </div>
                <TemplatePreview template={featuredTemplate} />
                <div className="mt-3">
                  <Button
                    href={editUrl}
                    variant="cta"
                    size="md"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02]"
                  >
                    <span>Use & Edit This Template</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-16">
        <article className="min-w-0 max-w-3xl">
          <aside className="mb-8 flex gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-5" aria-label="Quick answer">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-brand-dark" aria-hidden="true" />
            <p className="leading-relaxed text-ink/85">
              <strong>Quick answer: </strong>
              {item.summary}
            </p>
          </aside>

          {item.headings.length > 2 ? (
            <details className="mb-8 rounded-2xl border border-ink/10 p-4 lg:hidden">
              <summary className="cursor-pointer font-semibold">In this article</summary>
              <ol className="mt-3 space-y-2 text-[15px]">
                {item.headings.map((h) => (
                  <li key={h.id}>
                    <a className="text-brand-dark underline underline-offset-4" href={`#${h.id}`}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          ) : null}

          <div className="prose-article" dangerouslySetInnerHTML={{ __html: item.html }} />

          <div className="my-10 rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/70 via-white to-fuchsia-50/70 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-48 shrink-0 rounded-2xl bg-white p-2 border border-slate-200 shadow-md">
                <TemplatePreview template={featuredTemplate} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  <Sparkles className="size-3" /> Matching Template
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                  Ready to create your biodata with {featuredTemplate.name}?
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Customize this exact template with your personal details in our easy online editor. Free PDF & image download.
                </p>
                <Button
                  href={editUrl}
                  variant="cta"
                  size="md"
                  className="group mt-4 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-[1.03]"
                >
                  <Pencil className="size-4" />
                  <span>Edit {featuredTemplate.name} Template</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>

          {item.faqs.length ? (
            <section className="mt-14" aria-labelledby="article-faq">
              <h2 id="article-faq" className="mb-5 font-display text-2xl font-semibold">
                Common questions
              </h2>
              <FaqList faqs={item.faqs} />
            </section>
          ) : null}

          <div className="mt-14 rounded-3xl bg-slate-900 p-7 text-white sm:p-9 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Put this into practice</h2>
            <p className="mt-2 max-w-lg text-slate-300">Open the editor with {featuredTemplate.name}, fill in your details and download a high quality A4 PDF in minutes.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                href={editUrl}
                variant="cta"
                size="md"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-6 py-3 font-bold text-white shadow-lg"
              >
                <span>Edit This Template</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button href="/templates" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:border-white hover:text-white">
                Browse all templates
              </Button>
            </div>
          </div>
        </article>

        <aside className="space-y-8" aria-label="Article Sidebar">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-purple-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">Featured Template</p>
              <h4 className="font-bold text-slate-900 text-sm mb-3">{featuredTemplate.name}</h4>
              <div className="rounded-xl overflow-hidden border border-slate-100 mb-3">
                <TemplatePreview template={featuredTemplate} />
              </div>
              <Button
                href={editUrl}
                variant="cta"
                size="sm"
                className="group flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <span>Edit Template</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {item.headings.length > 2 ? (
              <div className="hidden lg:block border-l-2 border-slate-200 pl-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">In this article</p>
                <ol className="space-y-2 text-sm leading-snug">
                  {item.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-slate-600 underline-offset-4 hover:text-purple-700 hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </aside>
      </Container>

      {related.length ? (
        <section className="border-t border-slate-200 bg-slate-50/70 py-14">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">Keep reading</h2>
              <Link href={base.path} className="inline-flex items-center gap-1.5 font-semibold text-purple-700 underline-offset-4 hover:underline">
                All {base.name.toLowerCase()} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ArticleCard item={r} kind={kind} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
