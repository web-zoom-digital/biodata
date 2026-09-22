import { alpha, shade, tint } from "@/lib/color";
import { FONT_DISPLAY } from "../shared/constants";
import type { SectionStyles } from "../shared/TemplateSection";

export function rosePalette(accent: string) {
  return {
    accent,
    deep: shade(accent, 0.3),
    page: tint(accent, 0.96),
    card: "#FFFFFF",
    border: alpha(accent, 0.26),
    ink: "#3B2A30",
    muted: "#8A7078",
  };
}

export function roseSection(accent: string): SectionStyles {
  const p = rosePalette(accent);
  return {
    wrapper: { marginBottom: 0 },
    title: { fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 16, fontWeight: 500, color: p.deep },
    row: { padding: "2px 0" },
    label: { color: p.muted, fontSize: 11 },
    value: { color: p.ink },
    text: { color: p.ink, lineHeight: 1.6 },
    labelWidth: 108,
    renderTitle: (title, style) => (
      <div style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 3 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M7 1c3 2 5 4 5 6.5S9.8 13 7 13S2 10 2 7.5 4 3 7 1z" fill={p.accent} opacity=".85" />
          <path d="M7 4v9" stroke="#fff" strokeWidth="0.8" />
        </svg>
        <h3 style={{ margin: 0, ...style }}>{title}</h3>
      </div>
    ),
  };
}
