import type { TemplateDefinition } from "@/types/template";
import { EmeraldClassic } from "./index";

export const emeraldClassic: TemplateDefinition = {
  id: "emerald-classic",
  name: "Emerald Classic",
  description: "A confident emerald header with the photo on the right and two tidy columns of details.",
  style: "Two columns, photo right",
  categories: ["Classic", "Modern", "Boy"],
  component: EmeraldClassic,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#059669", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Emerald", value: "#059669" },
    { name: "Indigo", value: "#4F46E5" },
    { name: "Teal", value: "#0F766E" },
    { name: "Maroon", value: "#9F1239" },
    { name: "Slate", value: "#334155" },
  ],
};
