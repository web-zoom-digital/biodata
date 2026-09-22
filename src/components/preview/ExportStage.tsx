"use client";

import { forwardRef } from "react";
import { createPortal } from "react-dom";
import type { BiodataData, EnabledSections } from "@/types/biodata";
import type { TemplateSettings } from "@/types/template";
import { TemplateRenderer } from "./TemplateRenderer";

interface Props {
  templateId: string;
  data: BiodataData;
  enabled: EnabledSections;
  settings: TemplateSettings;
}

/**
 * Unscaled, off-screen copy of the biodata. Exports read from this node so that
 * zoom level, scroll position and screen size never affect the output.
 */
export const ExportStage = forwardRef<HTMLDivElement, Props>(function ExportStage(props, ref) {
  return createPortal(
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", left: -10000, top: 0, zIndex: -1, pointerEvents: "none" }}
    >
      <TemplateRenderer {...props} />
    </div>,
    document.body,
  );
});

/** Same content, but shown only by the browser's print dialog (see globals.css). */
export function PrintStage(props: Props) {
  return createPortal(
    <div className="print-only">
      <TemplateRenderer {...props} />
    </div>,
    document.body,
  );
}
