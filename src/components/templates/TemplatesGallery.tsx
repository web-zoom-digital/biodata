"use client";

import { useState, type ReactNode } from "react";
import { TEMPLATE_FILTERS, type TemplateFilter } from "@/data/templates";
import { cn } from "@/lib/utils";
import { templates } from "@/templates";
import type { TemplateCategory } from "@/types/template";

export function TemplatesGallery({ cards }: { cards: Record<string, ReactNode> }) {
  const [filter, setFilter] = useState<TemplateFilter>("All");
  const visible = filter === "All" ? templates : templates.filter((t) => t.categories.includes(filter as TemplateCategory));

  return (
    <div>
      <div role="group" aria-label="Filter templates" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {TEMPLATE_FILTERS.map((f) => {
          const count = f === "All" ? templates.length : templates.filter((t) => t.categories.includes(f as TemplateCategory)).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition-colors",
                filter === f ? "border-brand-dark bg-brand-dark text-white shadow-sm" : "border-ink/15 bg-white text-ink/75 hover:border-brand hover:text-brand-dark",
              )}
            >
              {f} <span className={cn("ml-1 text-xs opacity-75", filter === f ? "text-white" : "text-ink/45")}>({count})</span>
            </button>
          );
        })}
      </div>
      <p className=" xzzzzzzzztext-sm text-ink/60" role="status">
        Showing {visible.length} {visible.length === 1 ? "template" : "templates"}
        {filter !== "All" ? ` in ${filter}` : ""}.
      </p>
      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-mist p-8 text-center text-ink/70">No templates in this category yet. Try another filter.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-8 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <li key={t.id}>{cards[t.id]}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
