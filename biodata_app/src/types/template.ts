import React from 'react';
import type { BiodataModel } from './biodata';

export type TemplateCategory =
  | 'Classic'
  | 'Modern'
  | 'Elegant'
  | 'Traditional'
  | 'Floral'
  | 'Islamic'
  | 'Boy'
  | 'Girl'
  | 'Premium'
  | 'Minimal';

export interface TemplateSettings {
  accent: string;
  showPhotoPlaceholder?: boolean;
}

export interface TemplateProps {
  model: BiodataModel;
  settings: TemplateSettings;
  scale?: number;
}

export interface AccentOption {
  name: string;
  value: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  style: string;
  categories: string[];
  previewSample?: string;
  component: React.ComponentType<TemplateProps>;
  supportedSections: string[];
  defaultSettings: TemplateSettings;
  accentOptions: AccentOption[];
}
