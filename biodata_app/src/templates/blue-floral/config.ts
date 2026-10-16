import type { TemplateDefinition } from '@/types/template';
import { BlueFloral } from './index';

export const blueFloral: TemplateDefinition = {
  id: 'blue-floral',
  name: 'Blue Floral',
  description: 'Elegant blue floral corner border with clean double-frame header, god symbol, and photo frame.',
  style: 'Floral border, photo right',
  categories: ['Floral', 'Classic', 'Girl', 'Boy'],
  component: BlueFloral,
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
  defaultSettings: { accent: '#2563EB', showPhotoPlaceholder: true },
  accentOptions: [
    { name: 'Royal Blue', value: '#2563EB' },
    { name: 'Indigo', value: '#4338CA' },
    { name: 'Cyan', value: '#0891B2' },
    { name: 'Navy', value: '#1E3A8A' },
  ],
};
