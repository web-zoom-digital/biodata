import type { TemplateDefinition } from "@/types/template";
import { ElegantRose } from "./index";

export const elegantRose: TemplateDefinition = {
  id: "elegant-rose",
  name: "Elegant Rose",
  description: "Soft petals in the corners, a round portrait and gentle cards. Warm and graceful.",
  style: "Centred, round photo, soft cards",
  categories: ["Elegant", "Floral", "Girl"],
  previewSample: "girl",
  component: ElegantRose,
  supportedSections: ["personal", "education", "profession", "family", "astrology", "lifestyle", "contact", "about", "expectations", "custom"],
  defaultSettings: { accent: "#BE5B75", showPhotoPlaceholder: true },
  accentOptions: [
    { name: "Rose", value: "#BE5B75" },
    { name: "Plum", value: "#8E4585" },
    { name: "Teal", value: "#2F8F83" },
    { name: "Coral", value: "#D9683F" },
  ],
};
