import type { SectionStyles } from "../shared/TemplateSection";

export function bluePalette(accent = "#2563eb") {
  return {
    accent,
    page: "#ffffff",
    soft: "#f0f7ff",
    ink: "#1e293b",
    border: "#dbeafe",
  };
}

export function blueSection(accent = "#2563eb"): SectionStyles {
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
