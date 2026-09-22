import type { TemplateDefinition } from "@/types/template";
import { TraditionalGold } from "./index";

export const traditionalGold: TemplateDefinition = {
  id: "traditional-gold",
  name: "Traditional Gold",
  description: "Gold ribbons, boxed tables and a bordered frame. The classic printed biodata look.",
  style: "Boxed tables, photo left",
  categories: ["Traditional", "Premium", "Classic"],
  component: TraditionalGold,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#B7791F", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Gold", value: "#B7791F" },
    { name: "Maroon", value: "#8B2E2E" },
    { name: "Green", value: "#3F6B3A" },
    { name: "Blue", value: "#2C5282" },
  ],
};
