import { alpha, shade, tint } from "@/lib/color";
import { FONT_DISPLAY } from "../shared/constants";
import type { SectionStyles } from "../shared/TemplateSection";

export const SIDEBAR_WIDTH = 240;

export function indigoPalette(accent: string) {
  return {
    accent,
    deep: shade(accent, 0.3),
    soft: tint(accent, 0.94),
    ink: "#1F2430",
    muted: "#6B7280",
    page: "#FFFFFF",
  };
}

export function sidebarSection(): SectionStyles {
  return {
    wrapper: { marginBottom: 11 },
    rowLayout: "stacked",
    title: {
      fontSize: 13,
      fontWeight: 700,
      color: "#fff",
      paddingBottom: 5,
      borderBottom: `1px solid ${alpha("#FFFFFF", 0.28)}`,
    },
    row: { padding: "2px 0", lineHeight: 1.3 },
    label: { color: alpha("#FFFFFF", 0.68), fontSize: 10.5 },
    value: { color: "#fff", fontSize: 12 },
  };
}

export function mainSection(accent: string): SectionStyles {
  const p = indigoPalette(accent);
  return {
    wrapper: { marginBottom: 10 },
    title: {
      fontFamily: FONT_DISPLAY,
      fontSize: 16,
      fontWeight: 650,
      color: p.deep,
      borderLeft: `4px solid ${p.accent}`,
      paddingLeft: 9,
      lineHeight: 1.15,
    },
    row: { padding: "1.5px 0" },
    label: { color: p.muted },
    value: { color: p.ink },
    text: { color: p.ink, lineHeight: 1.6 },
    labelWidth: 116,
  };
}
