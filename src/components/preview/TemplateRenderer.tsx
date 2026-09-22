import { buildViewModel, defaultEnabledSections } from "@/lib/biodata";
import { getTemplateOrDefault } from "@/templates";
import type { BiodataData, EnabledSections } from "@/types/biodata";
import type { TemplateSettings } from "@/types/template";

interface Props {
  templateId: string;
  data: BiodataData;
  enabled?: EnabledSections;
  settings?: Partial<TemplateSettings>;
}

export function TemplateRenderer({ templateId, data, enabled = defaultEnabledSections(), settings }: Props) {
  const def = getTemplateOrDefault(templateId);
  const model = buildViewModel(data, enabled);
  const Component = def.component;
  return <Component data={data} model={model} settings={{ ...def.defaultSettings, ...settings }} />;
}
