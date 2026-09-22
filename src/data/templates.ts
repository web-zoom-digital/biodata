import type { TemplateCategory, TemplateDefinition } from "@/types/template";

export type TemplateFilter = "All" | TemplateCategory;

export const TEMPLATE_FILTERS: TemplateFilter[] = [
  
  // "All", "Modern", "Traditional", "Minimal", "Elegant", "Floral", "Classic", "Premium", "Boy", "Girl",
];

export function filterTemplates(list: TemplateDefinition[], filter: TemplateFilter) {
  return filter === "All" ? list : list.filter((t) => t.categories.includes(filter));
}
