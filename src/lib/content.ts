import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

export type ContentKind = "blog" | "guides";

export interface ContentFaq {
  question: string;
  answer: string;
}

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  /** One or two direct sentences shown as the "quick answer" and used for search snippets. */
  summary: string;
  category: string;
  date: string;
  updated?: string;
  readingMinutes: number;
  related: string[];
  faqs: ContentFaq[];
  howTo: boolean;
}

export interface Heading {
  id: string;
  text: string;
}

export interface ContentItem extends ContentMeta {
  html: string;
  headings: Heading[];
  steps: { name: string; text: string }[];
}

const ROOT = path.join(process.cwd(), "content");

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const asDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : typeof v === "string" ? v : "");

function readFile(kind: ContentKind, slug: string) {
  const file = path.join(ROOT, kind, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return matter(fs.readFileSync(file, "utf8"));
}

function toMeta(slug: string, data: Record<string, unknown>, body: string): ContentMeta {
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    summary: String(data.summary ?? data.description ?? ""),
    category: String(data.category ?? "General"),
    date: asDate(data.date),
    updated: data.updated ? asDate(data.updated) : undefined,
    readingMinutes: Math.max(2, Math.round(words / 210)),
    related: Array.isArray(data.related) ? (data.related as string[]) : [],
    faqs: Array.isArray(data.faqs) ? (data.faqs as { q: string; a: string }[]).map((f) => ({ question: f.q, answer: f.a })) : [],
    howTo: data.howTo === true,
  };
}

export function getSlugs(kind: ContentKind): string[] {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export function getAll(kind: ContentKind): ContentMeta[] {
  return getSlugs(kind)
    .map((slug) => {
      const parsed = readFile(kind, slug);
      return parsed ? toMeta(slug, parsed.data, parsed.content) : null;
    })
    .filter((x): x is ContentMeta => x !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getOne(kind: ContentKind, slug: string): ContentItem | null {
  const parsed = readFile(kind, slug);
  if (!parsed) return null;
  const meta = toMeta(slug, parsed.data, parsed.content);

  const headings: Heading[] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        if (depth !== 2 && depth !== 3) return `<h${depth}>${inner}</h${depth}>`;
        let id = slugify(inner) || `section-${headings.length + 1}`;
        while (used.has(id)) id += "-2";
        used.add(id);
        if (depth === 2) headings.push({ id, text: inner.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${inner}</h${depth}>`;
      },
    },
  });
  const html = marked.parse(parsed.content, { async: false }) as string;

  const steps: { name: string; text: string }[] = [];
  if (meta.howTo) {
    let current: { name: string; text: string } | null = null;
    for (const token of new Marked().lexer(parsed.content)) {
      if (token.type === "heading" && token.depth === 2) {
        current = { name: token.text.replace(/^\d+\.\s*/, ""), text: "" };
        steps.push(current);
      } else if (token.type === "paragraph" && current && !current.text) {
        current.text = token.text.replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
      }
    }
  }
  return { ...meta, html, headings, steps: steps.filter((s) => s.text) };
}

export function getRelated(kind: ContentKind, meta: ContentMeta, limit = 3): ContentMeta[] {
  const all = getAll(kind);
  const explicit = meta.related.map((s) => all.find((a) => a.slug === s)).filter((x): x is ContentMeta => Boolean(x));
  const rest = all.filter((a) => a.slug !== meta.slug && !meta.related.includes(a.slug));
  return [...explicit, ...rest].slice(0, limit);
}
