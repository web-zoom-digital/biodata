import type { TemplateDefinition } from '@/types/template';
import { IslamicEmerald } from './index';

export const islamicEmerald: TemplateDefinition = {
  id: 'islamic-emerald',
  name: 'Islamic Emerald',
  description: 'Rich dark emerald green background with golden mosque arches, hanging lanterns, Bismillah header & gold titles.',
  style: 'Islamic dark theme, gold accents',
  categories: ['Islamic', 'Classic', 'Boy', 'Girl'],
  component: IslamicEmerald,
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
  defaultSettings: { accent: '#FBBF24', showPhotoPlaceholder: true },
  accentOptions: [
    { name: 'Gold', value: '#FBBF24' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Bronze', value: '#D97706' },
    { name: 'Emerald', value: '#10B981' },
  ],
};
