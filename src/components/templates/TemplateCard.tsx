import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { TemplateDefinition } from "@/types/template";
import { TemplatePreview } from "./TemplatePreview";

export function TemplateCard({ template }: { template: TemplateDefinition }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/create?template=${template.id}`}
        aria-label={`Use the ${template.name} template`}
        className="block overflow-hidden rounded-2xl border border-ink/10 bg-mist p-3 transition-shadow duration-200 group-hover:shadow-xl sm:p-4"
      >
        <TemplatePreview template={template} className="rounded-md shadow-[0_6px_24px_-8px_rgba(17,24,39,0.35)]" />
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold">{template.name}</h3>
          {/* <p className="mt-0.5 text-sm text-ink/60">{template.style}</p> */}
        </div>
        <Link
          href={`/create?template=${template.id}`}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-brand-dark px-4 text-sm font-semibold text-white hover:bg-[#065f46]"
        >
          Use <span className="sr-only">the {template.name} template</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      {/* <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Categories">
        {template.categories.map((c) => (
          <li key={c} className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-dark">
            {c}
          </li>
        ))}
      </ul> */}
    </article>
  );
}
