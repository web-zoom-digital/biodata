# SEO, AEO and content

## Metadata

- `src/lib/seo.ts`: `defaultMetadata` (root layout), `pageMetadata({ title, description, path, ... })` for every page (canonical, Open Graph, Twitter).
- `/create` is `noindex`. Everything else is indexable.
- `src/app/sitemap.ts` lists static pages plus every blog post and guide. `src/app/robots.ts` points to it.
- `src/app/opengraph-image.tsx` generates the default social image.
- Set `NEXT_PUBLIC_SITE_URL` so canonical URLs and the sitemap use your real domain.

## Structured data (`<JsonLd>`)

Organization + WebSite (all marketing pages), WebApplication + HowTo (home), FAQPage (home, FAQ page and articles with `faqs`), Article + BreadcrumbList (blog and guides), HowTo (guides with `howTo: true`), ItemList (templates, blog and guides indexes).

## Answer-engine friendliness

Each article starts with a **Quick answer** box (`summary` in frontmatter), then question-style headings, tables and short FAQs. FAQ answers are always in the DOM, only visually collapsed.

## Adding an article

Create `content/blog/<slug>.md` (or `content/guides/`):

```md
---
title: "Marriage biodata format for boy"
description: "Under 160 characters, used for search snippets."
summary: "One or two direct sentences shown as the Quick answer."
category: "Formats"
date: "2026-09-01"
updated: "2026-09-15"        # optional
howTo: true                   # guides only: emits HowTo schema from each ## heading
related: ["other-slug"]
faqs:
  - q: "Question?"
    a: "Answer."
---

Body in Markdown. Use ## for sections (they become the table of contents). Tables are supported.
```

It appears in the listing, sitemap and structured data automatically. Internal links: `/create`, `/templates`, `/blog/<slug>`.
