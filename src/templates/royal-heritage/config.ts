import type { TemplateDefinition } from "@/types/template";
import { RoyalHeritage } from "./index";

export const royalHeritage: TemplateDefinition = {
  id: "royal-heritage",
  name: "Royal Heritage",
  description: "A centred, framed layout with an arched portrait and gold detailing, made for traditional families.",
  style: "Framed, centred, arched photo",
  categories: ["Traditional", "Premium", "Classic"],
  component: RoyalHeritage,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#7A1F2B", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Maroon", value: "#7A1F2B" },
    { name: "Forest", value: "#065F46" },
    { name: "Navy", value: "#1E3A5F" },
    { name: "Plum", value: "#6B2D5C" },
  ],
};
