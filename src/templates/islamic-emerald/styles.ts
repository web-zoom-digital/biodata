import type { SectionStyles } from "../shared/TemplateSection";

export function islamicEmeraldPalette(accent = "#f59e0b") {
  return {
    accent,
    page: "#0d3b3e",
    soft: "#134e4a",
    ink: "#ffffff",
    gold: "#fbbf24",
    border: "#047857",
  };
}

export function islamicEmeraldSection(accent = "#fbbf24"): SectionStyles {
  return {
    wrapper: { marginBottom: 14 },
    title: {
      fontSize: 15,
      fontWeight: 700,
      color: accent,
      borderBottom: `2px solid ${accent}`,
      paddingBottom: 4,
      marginBottom: 8,
      textTransform: "capitalize",
    },
    label: { color: "#9ca3af", fontWeight: 600, flex: "0 0 135px" },
    value: { color: "#ffffff", fontWeight: 500 },
  };
}
