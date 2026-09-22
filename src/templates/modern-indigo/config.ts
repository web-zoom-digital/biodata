import type { TemplateDefinition } from "@/types/template";
import { ModernIndigo } from "./index";

export const modernIndigo: TemplateDefinition = {
  id: "modern-indigo",
  name: "Modern Indigo",
  description: "A bold sidebar holds the photo and key facts; the story of the family and career sits beside it.",
  style: "Sidebar, photo top-left",
  categories: ["Modern", "Boy", "Premium"],
  component: ModernIndigo,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#4F46E5", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Indigo", value: "#4F46E5" },
    { name: "Emerald", value: "#047857" },
    { name: "Slate", value: "#334155" },
    { name: "Burnt orange", value: "#C2410C" },
  ],
};
