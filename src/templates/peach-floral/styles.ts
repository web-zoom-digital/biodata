import type { SectionStyles } from "../shared/TemplateSection";

export function peachPalette(accent = "#ea580c") {
  return {
    accent,
    page: "#fffdfa",
    soft: "#fff7ed",
    ink: "#292524",
    border: "#fed7aa",
  };
}

export function peachSection(accent = "#ea580c"): SectionStyles {
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
    label: { color: "#78716c", fontWeight: 600, flex: "0 0 135px" },
    value: { color: "#1c1917", fontWeight: 500 },
  };
}
