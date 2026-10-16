import type { TemplateDefinition } from '@/types/template';
import { emeraldClassic } from './emerald-classic/config';
import { royalHeritage } from './royal-heritage/config';
import { minimalIvory } from './minimal-ivory/config';
import { modernIndigo } from './modern-indigo/config';
import { elegantRose } from './elegant-rose/config';
import { traditionalGold } from './traditional-gold/config';
import { blueFloral } from './blue-floral/config';
import { peachFloral } from './peach-floral/config';
import { redRoseClassic } from './red-rose-classic/config';
import { islamicEmerald } from './islamic-emerald/config';
import { islamicIvory } from './islamic-ivory/config';
import { jainClassic } from './jain-classic/config';
import { classicGanesha } from './classic-ganesha/config';
import { auroraSage } from './aurora-sage/config';

export const templates: TemplateDefinition[] = [
  auroraSage,
  emeraldClassic,
  royalHeritage,
  minimalIvory,
  elegantRose,
  traditionalGold,
  blueFloral,
  peachFloral,
  redRoseClassic,
  islamicEmerald,
  islamicIvory,
  jainClassic,
  classicGanesha,
];

export const DEFAULT_TEMPLATE_ID = templates[0].id;

export function getTemplate(id?: string | null): TemplateDefinition | undefined {
  if (!id) return undefined;
  const found = templates.find((t) => t.id === id);
  if (found) return found;
  if (id === classicGanesha.id) return classicGanesha;
  return undefined;
}

export function getTemplateOrDefault(id?: string | null): TemplateDefinition {
  return getTemplate(id) ?? templates[0];
}

