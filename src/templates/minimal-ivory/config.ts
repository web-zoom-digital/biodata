import type { TemplateDefinition } from "@/types/template";
import { MinimalIvory } from "./index";

export const minimalIvory: TemplateDefinition = {
  id: "minimal-ivory",
  name: "Minimal Ivory",
  description: "Quiet typography on warm ivory paper. Lots of white space, hairline rules, nothing extra.",
  style: "Editorial, left-aligned",
  categories: ["Minimal", "Modern", "Elegant"],
  component: MinimalIvory,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#57534E", showPhotoPlaceholder: false },
  accentOptions: [
    { name: "Stone", value: "#57534E" },
    { name: "Emerald", value: "#047857" },
    { name: "Indigo", value: "#4338CA" },
    { name: "Wine", value: "#9F1239" },
  ],
};
