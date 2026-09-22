import { alpha } from "@/lib/color";
import { FONT_DISPLAY } from "../shared/constants";
import type { SectionStyles } from "../shared/TemplateSection";

export function ivoryPalette(accent: string) {
  return {
    accent,
    page: "#FAF8F3",
    ink: "#25221E",
    muted: "#8A8378",
    line: "#E4DFD3",
    faint: alpha(accent, 0.12),
  };
}

export function ivorySection(accent: string): SectionStyles {
  const p = ivoryPalette(accent);
  return {
    wrapper: { marginBottom: 14 },
    title: { fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500, fontStyle: "italic", color: p.accent },
    row: { borderBottom: `1px solid ${p.line}`, padding: "2.5px 0" },
    label: { color: p.muted, fontSize: 11 },
    value: { color: p.ink },
    text: { color: p.ink, lineHeight: 1.65 },
    labelWidth: 104,
  };
}
