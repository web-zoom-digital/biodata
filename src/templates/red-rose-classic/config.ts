import type { TemplateDefinition } from "@/types/template";
import { RedRoseClassic } from "./index";

export const redRoseClassic: TemplateDefinition = {
  id: "red-rose-classic",
  name: "Red Rose Classic",
  description: "Lush red rose floral headers and footers with elegant golden side pillar borders.",
  style: "Full floral header & footer",
  categories: ["Floral", "Classic", "Girl"],
  component: RedRoseClassic,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#be123c", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Rose Crimson", value: "#be123c" },
    { name: "Deep Ruby", value: "#9f1239" },
    { name: "Burgundy", value: "#881337" },
    { name: "Gold", value: "#d97706" },
  ],
};
