"use client";

import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { useBiodataStore } from "@/store/biodata-store";

export function SaveIndicator() {
  const state = useBiodataStore((s) => s.saveState);
  const hydrated = useBiodataStore((s) => s.hydrated);
  if (!hydrated) return null;

  if (state === "unavailable" || state === "quota") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-amber-800" role="status">
        <AlertTriangle className="size-4" aria-hidden="true" />
        {state === "quota" ? "Storage full. Not saved" : "Storage off. Not saved"}
      </span>
    );
  }
  if (state === "saving") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-ink/60" role="status">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Saving
      </span>
    );
  }
  if (state === "saved") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-brand-dark" role="status">
        <Check className="size-4" aria-hidden="true" /> Saved locally
      </span>
    );
  }
  return <span className="whitespace-nowrap text-sm text-ink/50">Saves on this device</span>;
}
