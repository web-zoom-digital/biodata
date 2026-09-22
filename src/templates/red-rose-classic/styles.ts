import type { SectionStyles } from "../shared/TemplateSection";

export function redRosePalette(accent = "#be123c") {
  return {
    accent,
    page: "#ffffff",
    soft: "#fff1f2",
    ink: "#1c1917",
    gold: "#d97706",
    border: "#fecdd3",
  };
}

export function redRoseSection(accent = "#be123c"): SectionStyles {
  return {
    wrapper: { marginBottom: 14 },
    title: {
      fontSize: 15,
      fontWeight: 700,
      color: accent,
      borderBottom: `2px dashed ${accent}`,
      paddingBottom: 4,
      marginBottom: 8,
      textTransform: "capitalize",
    },
    label: { color: "#57534e", fontWeight: 600, flex: "0 0 135px" },
    value: { color: "#0c0a09", fontWeight: 500 },
  };
}
