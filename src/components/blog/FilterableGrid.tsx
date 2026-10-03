"use client";

import { useState, type ReactNode } from "react";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

interface Entry {
  slug: string;
  category: string;
  node: ReactNode;
}

/** Category filter over server-rendered cards. */
export function FilterableGrid({ entries, label }: { entries: Entry[]; label: string }) {
  const categories = ["All", ...Array.from(new Set(entries.map((e) => e.category)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? entries : entries.filter((e) => e.category === active);

  return (
    <div>
      <div role="group" aria-label={`Filter ${label} by topic`} className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "h-11 rounded-full border px-4 text-[15px] font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95",
              active === c
                ? "border-brand-dark bg-brand-dark text-white shadow-md shadow-brand-dark/20 scale-[1.02]"
                : "border-ink/15 bg-white text-ink/75 hover:border-brand hover:text-brand-dark hover:shadow-xs",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <RevealOnScroll key={active} staggerChildren={0.08} delay={0.1} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e) => (
          <RevealItem key={e.slug}>{e.node}</RevealItem>
        ))}
      </RevealOnScroll>
    </div>
  );
}
