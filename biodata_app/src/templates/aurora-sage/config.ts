import type { TemplateDefinition } from '@/types/template';
import { AuroraSage } from './index';

export const auroraSage: TemplateDefinition = {
  id: 'aurora-sage',
  name: 'Aurora Sage',
  description:
    'Contemporary Scandinavian-Indian elegance with asymmetric capsule portrait, top highlight badges, and modular bento timeline.',
  style: 'Editorial Bento & Timeline',
  categories: ['Modern', 'Contemporary', 'Minimal', 'Elegant', 'Premium'],
  component: AuroraSage,
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
  defaultSettings: { accent: '#3D5A4C', showPhotoPlaceholder: false },
  accentOptions: [
    { name: 'Sage Green', value: '#3D5A4C' },
    { name: 'Sandalwood', value: '#8C6D46' },
    { name: 'Slate Teal', value: '#2C5357' },
    { name: 'Forest Moss', value: '#2A4736' },
    { name: 'Dusty Plum', value: '#6E4758' },
  ],
};
