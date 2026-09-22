import { alpha, shade, tint } from "@/lib/color";
import { FONT_DISPLAY } from "../shared/constants";
import type { SectionStyles } from "../shared/TemplateSection";

export function goldPalette(accent: string) {
  return {
    accent,
    deep: shade(accent, 0.35),
    page: "#FFFAEE",
    ink: "#3B2A1A",
    muted: "#8A6F4D",
    line: alpha(accent, 0.55),
    labelBg: tint(accent, 0.88),
  };
}

export function goldSection(accent: string): SectionStyles {
  const p = goldPalette(accent);
  return {
    wrapper: { marginBottom: 10 },
    rowLayout: "inline",
    labelWidth: 112,
    row: { gap: 0, padding: 0, border: `1px solid ${p.line}`, marginTop: -1, alignItems: "stretch" },
    label: { background: p.labelBg, color: p.deep, padding: "2px 8px", borderRight: `1px solid ${p.line}`, fontWeight: 600, fontSize: 11.5 },
    value: { padding: "2px 8px", color: p.ink, fontSize: 12 },
    text: { color: p.ink, border: `1px solid ${p.line}`, padding: "8px 10px", background: "#fff", lineHeight: 1.6 },
    renderTitle: (title) => (
      <h3
        style={{
          margin: 0,
          fontFamily: FONT_DISPLAY,
          fontSize: 14.5,
          fontWeight: 600,
          color: "#FFF7E0",
          background: `linear-gradient(90deg, ${p.deep}, ${p.accent})`,
          padding: "4px 12px",
          borderRadius: 3,
        }}
      >
        {title}
      </h3>
    ),
  };
}
