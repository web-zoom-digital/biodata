import type { TemplateDefinition } from "@/types/template";
import { IslamicIvory } from "./index";

export const islamicIvory: TemplateDefinition = {
  id: "islamic-ivory",
  name: "Islamic Ivory",
  description: "Soft ivory background with green Islamic mandala corner arches, Bismillah header & mosque minaret silhouette.",
  style: "Islamic light theme, green accents",
  categories: ["Islamic", "Classic", "Girl", "Boy"],
  component: IslamicIvory,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#047857", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Forest Green", value: "#047857" },
    { name: "Emerald", value: "#059669" },
    { name: "Teal", value: "#0f766e" },
    { name: "Gold", value: "#d97706" },
  ],
};
