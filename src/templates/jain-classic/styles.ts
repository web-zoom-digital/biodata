import type { SectionStyles } from "../shared/TemplateSection";

export function jainPalette(accent = "#166534") {
  return {
    accent,
    page: "#f4fbf7",
    soft: "#e8f5ec",
    ink: "#1c1917",
    purple: "#7e22ce",
    border: "#bbf7d0",
  };
}

export function jainSection(accent = "#166534"): SectionStyles {
  return {
    wrapper: { marginBottom: 14 },
    title: {
      fontSize: 15,
      fontWeight: 700,
      color: accent,
      borderBottom: `2.5px solid ${accent}`,
      paddingBottom: 4,
      marginBottom: 8,
      textTransform: "capitalize",
    },
    label: { color: "#475569", fontWeight: 600, flex: "0 0 135px" },
    value: { color: "#0f172a", fontWeight: 500 },
  };
}
