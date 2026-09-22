"use client";

import { create } from "zustand";
import { buildViewModel, createEmptyBiodata, defaultEnabledSections } from "@/lib/biodata";
import { SAMPLE_BIODATA_BOY } from "@/data/sample-biodata";
import { loadDraft, removeDraft, saveDraft, type SaveResult } from "@/lib/storage";
import { DEFAULT_TEMPLATE_ID, getTemplate, getTemplateOrDefault } from "@/templates";
import type { BiodataData, EnabledSections, SectionKey } from "@/types/biodata";
import type { TemplateSettings } from "@/types/template";

export type SaveState = "idle" | "saving" | SaveResult;

interface BiodataState {
  data: BiodataData;
  templateId: string;
  /** Accent colour chosen per template id. */
  accents: Record<string, string>;
  enabled: EnabledSections;
  /** Bumped whenever data is replaced from outside the form (sample, clear, hydrate) so the form can reset. */
  revision: number;
  hydrated: boolean;
  saveState: SaveState;
  lastSavedAt: number | null;

  hydrate: (requestedTemplateId?: string | null) => void;
  /** Called by the form on every edit. Does not bump `revision`. */
  setData: (data: BiodataData) => void;
  setTemplate: (id: string) => void;
  setAccent: (templateId: string, accent: string) => void;
  toggleSection: (key: SectionKey, on: boolean) => void;
  loadSample: () => void;
  clearDraft: () => void;
}

let saveTimer: ReturnType<typeof setTimeout> | undefined;

export const useBiodataStore = create<BiodataState>((set, get) => {
  const scheduleSave = () => {
    if (!get().hydrated) return;
    const { data, enabled } = get();
    // Nothing worth saving yet: keep the indicator neutral instead of claiming an empty draft was saved.
    if (buildViewModel(data, enabled).isEmpty && !data.profile.photo && get().lastSavedAt === null) return;
    set({ saveState: "saving" });
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const { data, templateId, accents, enabled } = get();
      const result = saveDraft({ data, templateId, accents, enabled });
      set({ saveState: result === "saved" ? "saved" : result, lastSavedAt: result === "saved" ? Date.now() : get().lastSavedAt });
    }, 500);
  };

  return {
    data: createEmptyBiodata(),
    templateId: DEFAULT_TEMPLATE_ID,
    accents: {},
    enabled: defaultEnabledSections(),
    revision: 0,
    hydrated: false,
    saveState: "idle",
    lastSavedAt: null,

    hydrate: (requestedTemplateId) => {
      const draft = loadDraft();
      const fromUrl = getTemplate(requestedTemplateId);
      const fromDraft = getTemplate(draft?.templateId);
      set((s) => ({
        data: draft?.data ?? s.data,
        enabled: draft?.enabled ?? s.enabled,
        accents: draft?.accents ?? s.accents,
        templateId: (fromUrl ?? fromDraft ?? getTemplateOrDefault(undefined)).id,
        revision: s.revision + 1,
        hydrated: true,
        saveState: draft ? "saved" : "idle",
        lastSavedAt: draft?.updatedAt ?? null,
      }));
    },

    setData: (data) => {
      set({ data });
      scheduleSave();
    },

    setTemplate: (id) => {
      if (!getTemplate(id)) return;
      set({ templateId: id });
      scheduleSave();
    },

    setAccent: (templateId, accent) => {
      set((s) => ({ accents: { ...s.accents, [templateId]: accent } }));
      scheduleSave();
    },

    toggleSection: (key, on) => {
      set((s) => ({ enabled: { ...s.enabled, [key]: on } }));
      scheduleSave();
    },

    loadSample: () => {
      set((s) => ({
        data: structuredClone(SAMPLE_BIODATA_BOY),
        enabled: defaultEnabledSections(),
        revision: s.revision + 1,
      }));
      scheduleSave();
    },

    clearDraft: () => {
      clearTimeout(saveTimer);
      removeDraft();
      set((s) => ({
        data: createEmptyBiodata(),
        enabled: defaultEnabledSections(),
        accents: {},
        revision: s.revision + 1,
        saveState: "idle",
        lastSavedAt: null,
      }));
    },
  };
});

/** Convenience selector: the active template settings (default settings + chosen accent). */
export function resolveSettings(templateId: string, accents: Record<string, string>): TemplateSettings {
  const def = getTemplateOrDefault(templateId);
  return { ...def.defaultSettings, accent: accents[def.id] ?? def.defaultSettings.accent };
}
