import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { TemplateDefinition } from "@/types/template";
import { TemplatePreview } from "./TemplatePreview";
import { TiltCard } from "@/components/ui/TiltCard";

export function TemplateCard({ template }: { template: TemplateDefinition }) {
  return (
    <article className="group flex flex-col">
      <TiltCard maxTilt={4} scale={1.02} className="rounded-xl border border-ink/10 bg-mist p-2 sm:rounded-2xl sm:p-4 group-hover:border-brand/30 group-hover:shadow-[0_20px_40px_-15px_rgba(4,120,87,0.25)]">
        <Link
          href={`/create?template=${template.id}`}
          aria-label={`Use the ${template.name} template`}
          className="block overflow-hidden rounded-lg cursor-pointer"
        >
          <TemplatePreview template={template} className="rounded-md shadow-[0_6px_24px_-8px_rgba(17,24,39,0.35)] transition-transform duration-500 ease-out group-hover:scale-103" />
        </Link>
      </TiltCard>
      <div className="mt-2.5 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-sm font-semibold text-ink line-clamp-1 sm:text-xl sm:line-clamp-none transition-colors duration-200 group-hover:text-brand-dark">
            <Link href={`/create?template=${template.id}`} className="cursor-pointer">
              {template.name}
            </Link>
          </h3>
        </div>
        <Link
          href={`/create?template=${template.id}`}
          className="inline-flex h-8 w-full shrink-0 items-center justify-center gap-1 rounded-full bg-brand-dark px-3 text-xs font-semibold text-white hover:bg-[#065f46] transition-all duration-200 hover:scale-[1.04] active:scale-[0.97] sm:h-10 sm:w-auto sm:px-4 sm:text-sm shadow-sm hover:shadow-md cursor-pointer"
        >
          Use <span className="sr-only">the {template.name} template</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
