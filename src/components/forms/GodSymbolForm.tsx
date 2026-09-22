"use client";

import { Check, Slash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { GOD_SYMBOLS, type GodSymbolItem } from "@/data/god-symbols";
import { cn } from "@/lib/utils";
import type { BiodataData } from "@/types/biodata";

export function GodSymbolForm() {
  const { setValue, watch } = useFormContext<BiodataData>();
  const currentSymbol = watch("profile.godSymbol") ?? watch("godSymbol");

  const selectedSrc = currentSymbol?.src;

  const selectSymbol = (item?: GodSymbolItem) => {
    if (item) {
      const godSym = { name: item.name, src: item.src };
      setValue("profile.godSymbol", godSym, { shouldDirty: true, shouldTouch: true });
      setValue("godSymbol", godSym, { shouldDirty: true, shouldTouch: true });
      setValue("profile.blessing", item.defaultBlessing, { shouldDirty: true, shouldTouch: true });
    } else {
      setValue("profile.godSymbol", undefined, { shouldDirty: true, shouldTouch: true });
      setValue("godSymbol", undefined, { shouldDirty: true, shouldTouch: true });
    }
  };

  const selectedSymbolItem = GOD_SYMBOLS.find((s) => s.src === selectedSrc);
  const selectedName = selectedSymbolItem?.name ?? (currentSymbol?.name || "None / No Symbol");

  return (
    <div className="space-y-4">
      {/* Selected symbol header indicator */}
      <div className="flex items-center justify-between rounded-xl bg-mist/70 px-3.5 py-2.5 text-sm">
        <span className="text-ink/65 font-medium">Selected Symbol:</span>
        <span className="font-semibold text-brand-dark truncate max-w-[200px] text-right" title={selectedName}>
          {selectedName}
        </span>
      </div>

      {/* Grid of options */}
      <div className="grid grid-cols-2 min-[420px]:grid-cols-3 gap-2.5 max-w-full overflow-hidden">
        {/* None / No Symbol option */}
        <button
          type="button"
          role="button"
          aria-pressed={!selectedSrc}
          aria-label="None / No Symbol"
          onClick={() => selectSymbol(undefined)}
          className={cn(
            "relative flex flex-col items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-150 min-h-[96px] focus-visible:outline-2 focus-visible:outline-brand",
            !selectedSrc
              ? "border-brand-dark bg-brand-soft/40 ring-2 ring-brand-dark/20 shadow-sm"
              : "border-ink/15 bg-white hover:border-ink/30 hover:bg-mist/30",
          )}
        >
          <div className="grid size-10 place-items-center rounded-lg bg-mist text-ink/40">
            <Slash className="size-5" aria-hidden="true" />
          </div>
          <span className="mt-2 text-center text-xs font-medium text-ink/75 line-clamp-2">
            None / No Symbol
          </span>
          {!selectedSrc && (
            <span className="absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full bg-brand-dark text-white shadow-sm">
              <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
            </span>
          )}
        </button>

        {/* Religious symbols */}
        {GOD_SYMBOLS.map((symbol) => {
          const isSelected = selectedSrc === symbol.src;
          return (
            <button
              key={symbol.id}
              type="button"
              role="button"
              aria-pressed={isSelected}
              aria-label={symbol.name}
              onClick={() => selectSymbol(symbol)}
              className={cn(
                "relative flex flex-col items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-150 min-h-[96px] focus-visible:outline-2 focus-visible:outline-brand",
                isSelected
                  ? "border-brand-dark bg-brand-soft/40 ring-2 ring-brand-dark/20 shadow-sm"
                  : "border-ink/15 bg-white hover:border-ink/30 hover:bg-mist/30",
              )}
            >
              <div className="grid h-10 w-full place-items-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={symbol.src}
                  alt={symbol.name}
                  className="max-h-10 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <span
                className="mt-1.5 text-center text-[11px] font-medium leading-tight text-ink/85 line-clamp-2 w-full"
                title={symbol.name}
              >
                {symbol.name}
              </span>
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full bg-brand-dark text-white shadow-sm">
                  <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
