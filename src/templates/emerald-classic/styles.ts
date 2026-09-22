import { alpha, shade, tint } from "@/lib/color";
import { FONT_DISPLAY } from "../shared/constants";
import type { SectionStyles } from "../shared/TemplateSection";

export function emeraldPalette(accent: string) {
  return {
    accent,
    dark: shade(accent, 0.28),
    soft: tint(accent, 0.93),
    line: alpha(accent, 0.28),
    ink: "#1F2937",
    muted: "#6B7280",
    page: "#FFFFFF",
  };
}

export function emeraldSection(accent: string): SectionStyles {
  const p = emeraldPalette(accent);
  return {
    wrapper: { marginBottom: 12 },
    title: {
      fontFamily: FONT_DISPLAY,
      fontSize: 15.5,
      fontWeight: 650,
      color: p.dark,
      paddingBottom: 4,
      borderBottom: `1.5px solid ${p.line}`,
    },
    row: { borderBottom: `1px solid #F1F2F4` },
    label: { color: p.muted },
    value: { color: p.ink },
    text: { color: p.ink, lineHeight: 1.6 },
    labelWidth: 112,
  };
}
