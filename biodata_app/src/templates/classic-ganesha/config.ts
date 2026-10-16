import type { TemplateDefinition } from '@/types/template';
import { ClassicGanesha } from './index';

export const classicGanesha: TemplateDefinition = {
  id: 'classic-ganesha',
  name: 'Classic Ganesha',
  description: 'Traditional Hindu marriage biodata featuring Lord Ganesha blessing, geometric bronze corner borders, and aligned details.',
  style: 'Traditional Ganesha, Photo Top-Right',
  categories: ['Traditional', 'Hindu', 'Premium'],
  component: ClassicGanesha,
  supportedSections: [
    'personal',
    'family',
    'education',
    'profession',
    'contact',
    'astrology',
    'lifestyle',
    'about',
    'expectations',
    'custom',
  ],
  defaultSettings: { accent: '#7C2D12', showPhotoPlaceholder: true },
  accentOptions: [
    { name: 'Terracotta Bronze', value: '#7C2D12' },
    { name: 'Royal Maroon', value: '#881337' },
    { name: 'Deep Crimson', value: '#991B1B' },
    { name: 'Temple Ochre', value: '#B45309' },
    { name: 'Forest Emerald', value: '#065F46' },
    { name: 'Classic Navy', value: '#1E3A8A' },
  ],
};
