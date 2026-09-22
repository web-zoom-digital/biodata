"use client";

import { Check } from "lucide-react";
import { useMemo } from "react";
import { SAMPLE_BIODATA_BOY, SAMPLE_BIODATA_GIRL } from "@/data/sample-biodata";
import { buildViewModel } from "@/lib/biodata";
import { cn } from "@/lib/utils";
import { resolveSettings, useBiodataStore } from "@/store/biodata-store";
import { useEditorUi } from "@/store/editor-ui-store";
import { templates, getTemplateOrDefault } from "@/templates";
import { ScaledPage } from "../preview/ScaledPage";
import { TemplateRenderer } from "../preview/TemplateRenderer";
import { Modal } from "../ui/Modal";

export function TemplateSelector() {
  const open = useEditorUi((s) => s.templateDrawerOpen);
  const setOpen = useEditorUi((s) => s.setTemplateDrawer);
  const templateId = useBiodataStore((s) => s.templateId);
  const setTemplate = useBiodataStore((s) => s.setTemplate);
  const setAccent = useBiodataStore((s) => s.setAccent);
  const accents = useBiodataStore((s) => s.accents);
  const data = useBiodataStore((s) => s.data);
  const enabled = useBiodataStore((s) => s.enabled);

  const isBlank = useMemo(() => buildViewModel(data, enabled).isEmpty, [data, enabled]);
  const current = getTemplateOrDefault(templateId);
  const currentAccent = resolveSettings(templateId, accents).accent;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      variant="right"
      title="Change template"
      description={isBlank ? "Previews use sample details. Your data stays the same when you switch." : "Previews show your own details. Nothing you typed changes."}
      footer={
        <div>
          <p className="mb-2 text-sm font-medium">Colour for {current.name}</p>
          <div className="flex flex-wrap gap-2">
            {current.accentOptions.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setAccent(current.id, c.value)}
                aria-label={c.name}
                aria-pressed={currentAccent.toLowerCase() === c.value.toLowerCase()}
                className={cn(
                  "grid size-10 place-items-center rounded-full border-2 border-white outline outline-1 outline-ink/20 focus-visible:outline-2 focus-visible:outline-brand",
                  currentAccent.toLowerCase() === c.value.toLowerCase() && "outline-2 outline-ink",
                )}
                style={{ background: c.value }}
              >
                {currentAccent.toLowerCase() === c.value.toLowerCase() ? <Check className="size-4 text-white" aria-hidden="true" /> : null}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <ul className="grid grid-cols-2 gap-3 p-3.5 sm:gap-4 sm:p-5">
        {templates.map((t) => {
          const active = t.id === templateId;
          const sample = t.previewSample === "girl" ? SAMPLE_BIODATA_GIRL : SAMPLE_BIODATA_BOY;
          return (
            <li key={t.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTemplate(t.id);
                  setOpen(false);
                }}
                className={cn(
                  "group block w-full rounded-xl text-left outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand",
                  active ? "ring-2 ring-brand-dark ring-offset-2" : "",
                )}
              >
                <span className="relative block overflow-hidden rounded-lg border border-ink/10 shadow-sm transition-shadow group-hover:shadow-md">
                  <ScaledPage>
                    <TemplateRenderer
                      templateId={t.id}
                      data={isBlank ? sample : data}
                      enabled={enabled}
                      settings={{ accent: t.id === templateId ? currentAccent : accents[t.id] ?? t.defaultSettings.accent }}
                    />
                  </ScaledPage>
                  {active ? (
                    <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-brand-dark text-white">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </span>
                <span className="mt-2 block text-sm font-semibold">{t.name}</span>
                <span className="block text-xs text-ink/60">{t.style}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
