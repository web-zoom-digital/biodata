import { alpha, shade, tint } from "@/lib/color";
import { FONT_DISPLAY } from "../shared/constants";
import type { SectionStyles } from "../shared/TemplateSection";

export const GOLD = "#B58B3A";

export function royalPalette(accent: string) {
  return {
    accent,
    deep: shade(accent, 0.15),
    gold: GOLD,
    goldSoft: alpha(GOLD, 0.55),
    page: "#FBF6EA",
    ink: "#3A2A24",
    muted: "#7A6658",
    card: tint(accent, 0.95),
  };
}

export function royalSection(accent: string): SectionStyles {
  const p = royalPalette(accent);
  return {
    wrapper: { marginBottom: 9 },
    row: { borderBottom: `1px dotted ${p.goldSoft}`, padding: "1.5px 0" },
    label: { color: p.muted },
    value: { color: p.ink },
    text: { color: p.ink, textAlign: "center", fontStyle: "italic", fontFamily: FONT_DISPLAY, fontSize: 13, lineHeight: 1.55 },
    labelWidth: 104,
    renderTitle: (title) => (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 600, color: p.deep }}>{title}</h3>
        <svg width="90" height="8" viewBox="0 0 90 8" aria-hidden="true" style={{ display: "block", margin: "1px auto 2px" }}>
          <path d="M0 4h34M56 4h34" stroke={p.gold} strokeWidth="1" />
          <path d="M45 0l4 4-4 4-4-4z" fill={p.gold} />
        </svg>
      </div>
    ),
  };
}
