import type { SectionStyles } from "../shared/TemplateSection";

export function islamicIvoryPalette(accent = "#047857") {
  return {
    accent,
    page: "#fafaf9",
    soft: "#ecfdf5",
    ink: "#1c1917",
    border: "#a7f3d0",
  };
}

export function islamicIvorySection(accent = "#047857"): SectionStyles {
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
    label: { color: "#475569", fontWeight: 600, flex: "0 0 135px" },
    value: { color: "#0f172a", fontWeight: 500 },
  };
}
