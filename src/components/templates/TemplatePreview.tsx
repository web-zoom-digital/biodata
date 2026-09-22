import { SAMPLE_BIODATA_BOY, SAMPLE_BIODATA_GIRL } from "@/data/sample-biodata";
import type { TemplateDefinition } from "@/types/template";
import { ScaledPage } from "../preview/ScaledPage";
import { TemplateRenderer } from "../preview/TemplateRenderer";

export function TemplatePreview({ template, className }: { template: TemplateDefinition; className?: string }) {
  const sample = template.previewSample === "girl" ? SAMPLE_BIODATA_GIRL : SAMPLE_BIODATA_BOY;
  return (
    <ScaledPage className={className} label={`${template.name} template preview with sample details`}>
      <TemplateRenderer templateId={template.id} data={sample} />
    </ScaledPage>
  );
}
