import type { TemplateDefinition } from "@/types/template";
import { blueFloral } from "./blue-floral/config";
import { elegantRose } from "./elegant-rose/config";
import { emeraldClassic } from "./emerald-classic/config";
import { islamicEmerald } from "./islamic-emerald/config";
import { islamicIvory } from "./islamic-ivory/config";
import { jainClassic } from "./jain-classic/config";
import { minimalIvory } from "./minimal-ivory/config";
import { modernIndigo } from "./modern-indigo/config";
import { peachFloral } from "./peach-floral/config";
import { redRoseClassic } from "./red-rose-classic/config";
import { royalHeritage } from "./royal-heritage/config";
import { traditionalGold } from "./traditional-gold/config";

export const templates: TemplateDefinition[] = [
  emeraldClassic,
  royalHeritage,
  minimalIvory,
  modernIndigo,
  elegantRose,
  traditionalGold,
  blueFloral,
  peachFloral,
  redRoseClassic,
  islamicEmerald,
  islamicIvory,
  jainClassic,
];

export const DEFAULT_TEMPLATE_ID = templates[0].id;

export function getTemplate(id?: string | null): TemplateDefinition | undefined {
  return id ? templates.find((t) => t.id === id) : undefined;
}

export function getTemplateOrDefault(id?: string | null): TemplateDefinition {
  return getTemplate(id) ?? templates[0];
}
