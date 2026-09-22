import type { TemplateDefinition } from "@/types/template";
import { PeachFloral } from "./index";

export const peachFloral: TemplateDefinition = {
  id: "peach-floral",
  name: "Peach Floral",
  description: "Soft peach & coral watercolor floral corner background with elegant warm typography.",
  style: "Warm floral, photo right",
  categories: ["Floral", "Classic", "Girl"],
  component: PeachFloral,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#ea580c", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Terracotta", value: "#ea580c" },
    { name: "Coral Rose", value: "#e11d48" },
    { name: "Amber", value: "#d97706" },
    { name: "Crimson", value: "#991b1b" },
  ],
};
