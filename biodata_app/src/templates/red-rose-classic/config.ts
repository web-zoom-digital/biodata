import type { TemplateDefinition } from '@/types/template';
import { RedRoseClassic } from './index';

export const redRoseClassic: TemplateDefinition = {
  id: 'red-rose-classic',
  name: 'Red Rose Classic',
  description: 'Lush red rose floral headers and footers with elegant golden side pillar borders.',
  style: 'Full floral header & footer',
  categories: ['Floral', 'Classic', 'Girl'],
  component: RedRoseClassic,
  supportedSections: [
    'personal',
    'education',
    'profession',
    'family',
    'astrology',
    'lifestyle',
    'contact',
    'about',
    'expectations',
    'custom',
  ],
  defaultSettings: { accent: '#BE123C', showPhotoPlaceholder: true },
  accentOptions: [
    { name: 'Rose Crimson', value: '#BE123C' },
    { name: 'Deep Ruby', value: '#9F1239' },
    { name: 'Burgundy', value: '#881337' },
    { name: 'Gold', value: '#D97706' },
  ],
};
