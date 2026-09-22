import type { ComponentType } from "react";
import type { BiodataData, BiodataViewModel, SectionKey } from "./biodata";

export type TemplateCategory =
  | "Modern"
  | "Traditional"
  | "Minimal"
  | "Elegant"
  | "Floral"
  | "Classic"
  | "Premium"
  | "Boy"
  | "Girl"
  | "Islamic";

export interface TemplateSettings {
  /** Main accent colour (hex). Templates read it from here. */
  accent: string;
  /** Show a placeholder silhouette when no photo has been uploaded. */
  showPhotoPlaceholder: boolean;
}

export interface TemplateProps {
  data: BiodataData;
  model: BiodataViewModel;
  settings: TemplateSettings;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  /** Layout label shown on cards, e.g. "Two columns, photo right". */
  style: string;
  categories: TemplateCategory[];
  /** Optional static preview. When omitted, a live scaled render with sample data is used. */
  previewImage?: string;
  /** Which sample biodata the live thumbnail uses. Defaults to "boy". */
  previewSample?: "boy" | "girl";
  component: ComponentType<TemplateProps>;
  supportedSections: SectionKey[];
  defaultSettings: TemplateSettings;
  /** Colour choices offered in the template drawer. The first one is the default. */
  accentOptions: { name: string; value: string }[];
}
