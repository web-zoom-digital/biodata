import type { TemplateDefinition } from "@/types/template";
import { JainClassic } from "./index";

export const jainClassic: TemplateDefinition = {
  id: "jain-classic",
  name: "Jain Classic",
  description: "Soft mint background with purple floral corner flourishes, Jain symbol, Om Namah Siddhebhya header & dark green accents.",
  style: "Jain theme, purple & green accents",
  categories: ["Classic", "Floral", "Boy", "Girl"],
  component: JainClassic,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#166534", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Forest Green", value: "#166534" },
    { name: "Emerald", value: "#059669" },
    { name: "Purple", value: "#7e22ce" },
    { name: "Maroon", value: "#9f1239" },
  ],
};
