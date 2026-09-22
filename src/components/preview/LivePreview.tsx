"use client";

import { Maximize2, Minus, Plus } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { SAMPLE_BIODATA_BOY } from "@/data/sample-biodata";
import { buildViewModel } from "@/lib/biodata";
import { cn } from "@/lib/utils";
import { resolveSettings, useBiodataStore } from "@/store/biodata-store";
import { A4_HEIGHT, A4_WIDTH } from "@/templates/shared/constants";
import { getTemplateOrDefault } from "@/templates";

const ZOOM_STEPS = [0.4, 0.45, 0.5, 0.6, 0.75, 0.9, 1, 1.25, 1.5];

interface Props {
  /** Extra classes for the scroll container. */
  className?: string;
  /** Show the zoom toolbar. */
  toolbar?: boolean;
}

export function LivePreview({ className, toolbar = true }: Props) {
  const data = useBiodataStore((s) => s.data);
  const enabled = useBiodataStore((s) => s.enabled);
  const templateId = useBiodataStore((s) => s.templateId);
  const accents = useBiodataStore((s) => s.accents);
  const hydrated = useBiodataStore((s) => s.hydrated);

  const deferredData = useDeferredValue(data);
  const model = useMemo(() => buildViewModel(deferredData, enabled), [deferredData, enabled]);
  const showingSample = hydrated && model.isEmpty;

  const activeGodSymbol = deferredData.profile.godSymbol ?? deferredData.godSymbol;
  const activeBlessing = deferredData.profile.blessing;

  const shownData = useMemo(() => {
    if (!showingSample) return deferredData;
    return {
      ...SAMPLE_BIODATA_BOY,
      profile: {
        ...SAMPLE_BIODATA_BOY.profile,
        ...(activeGodSymbol ? { godSymbol: activeGodSymbol } : {}),
        ...(activeBlessing ? { blessing: activeBlessing } : {}),
        photo: deferredData.profile.photo || SAMPLE_BIODATA_BOY.profile.photo,
      },
      ...(activeGodSymbol ? { godSymbol: activeGodSymbol } : {}),
    };
  }, [showingSample, deferredData, activeGodSymbol, activeBlessing]);

  const rawModel = useMemo(() => (showingSample ? buildViewModel(SAMPLE_BIODATA_BOY, enabled) : model), [showingSample, model, enabled]);

  const shownModel = useMemo(() => {
    return {
      ...rawModel,
      ...(activeGodSymbol ? { godSymbol: activeGodSymbol } : {}),
      ...(activeBlessing ? { blessing: activeBlessing } : {}),
    };
  }, [rawModel, activeGodSymbol, activeBlessing]);


  const def = getTemplateOrDefault(templateId);
  const settings = useMemo(() => resolveSettings(templateId, accents), [templateId, accents]);
  const Component = def.component;

  const scroller = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(A4_HEIGHT);
  const [zoom, setZoom] = useState<"fit" | number>("fit");

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = page.current;
    if (!el) return;
    const update = () => setContentHeight(Math.max(A4_HEIGHT, el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [templateId]);

  const isMobile = containerWidth > 0 ? containerWidth < 640 : typeof window !== "undefined" && window.innerWidth < 640;
  const defaultScale = isMobile ? 0.45 : 0.9;
  const scale = zoom === "fit" ? defaultScale : zoom;
  const pages = Math.max(1, Math.ceil((contentHeight - 36) / A4_HEIGHT));

  const step = (dir: 1 | -1) => {
    const current = scale;
    const next = dir === 1 ? ZOOM_STEPS.find((z) => z > current + 0.01) : [...ZOOM_STEPS].reverse().find((z) => z < current - 0.01);
    if (next) setZoom(next);
  };

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      {toolbar ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 bg-white px-3 py-2">
          <div className="flex items-center gap-1" role="group" aria-label="Preview zoom">
            <button type="button" onClick={() => step(-1)} aria-label="Zoom out" className="grid size-9 place-items-center rounded-full hover:bg-mist">
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <span className="min-w-12 text-center text-sm tabular-nums text-ink/70" aria-live="polite">
              {Math.round(scale * 100)}%
            </span>
            <button type="button" onClick={() => step(1)} aria-label="Zoom in" className="grid size-9 place-items-center rounded-full hover:bg-mist">
              <Plus className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setZoom("fit")}
              aria-pressed={zoom === "fit"}
              className={cn("ml-1 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium hover:bg-mist", zoom === "fit" && "bg-brand-soft text-brand-dark")}
            >
              <Maximize2 className="size-4" aria-hidden="true" /> Fit to screen
            </button>
          </div>
          <p className="text-sm text-ink/60">
            {pages > 1 ? `${pages} pages. PDF splits them for you.` : "A4, 1 page"}
          </p>
        </div>
      ) : null}

      <div ref={scroller} className="min-h-0 flex-1 overflow-auto bg-[#E8EAEE] px-4 py-5 sm:px-8 sm:py-7" style={{ scrollbarGutter: "stable" }}>
        {showingSample ? (
          <p className="mx-auto mb-4 max-w-md rounded-full bg-white px-4 py-2 text-center text-sm text-ink/70 shadow-sm">
            Sample preview. Start typing and it becomes yours.
          </p>
        ) : null}
        <div
          className="relative mx-auto"
          style={{ width: A4_WIDTH * scale, height: contentHeight * scale, opacity: showingSample ? 0.78 : 1, transition: "opacity 200ms" }}
        >
          <div
            ref={page}
            className="absolute left-0 top-0 origin-top-left bg-white shadow-[0_10px_40px_-12px_rgba(17,24,39,0.35)]"
            style={{ width: A4_WIDTH, transform: `scale(${scale})` }}
            data-preview-page
          >
            <Component data={shownData} model={shownModel} settings={settings} />
          </div>
          {pages > 1
            ? Array.from({ length: pages - 1 }, (_, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-indigo/50"
                  style={{ top: (i + 1) * A4_HEIGHT * scale }}
                >
                  <span className="absolute right-0 top-0 -translate-y-full rounded-t bg-indigo px-2 py-0.5 text-[11px] font-medium text-white">
                    Page {i + 2} starts
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
