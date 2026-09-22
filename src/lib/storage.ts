import { siteConfig } from "@/config/site";
import { normalizeBiodata, defaultEnabledSections } from "@/lib/biodata";
import type { BiodataData, EnabledSections } from "@/types/biodata";

export interface StoredDraft {
  version: 1;
  data: BiodataData;
  templateId: string;
  accents: Record<string, string>;
  enabled: EnabledSections;
  updatedAt: number;
}

export type SaveResult = "saved" | "unavailable" | "quota";

export function loadDraft(): StoredDraft | null {
  try {
    const raw = window.localStorage.getItem(siteConfig.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredDraft>;
    if (parsed.version !== 1) return null;
    return {
      version: 1,
      data: normalizeBiodata(parsed.data),
      templateId: typeof parsed.templateId === "string" ? parsed.templateId : "",
      accents: parsed.accents && typeof parsed.accents === "object" ? parsed.accents : {},
      enabled: { ...defaultEnabledSections(), ...(parsed.enabled ?? {}) },
      updatedAt: parsed.updatedAt ?? Date.now(),
    };
  } catch {
    return null;
  }
}

export function saveDraft(draft: Omit<StoredDraft, "version" | "updatedAt">): SaveResult {
  try {
    const payload: StoredDraft = { ...draft, version: 1, updatedAt: Date.now() };
    window.localStorage.setItem(siteConfig.storageKey, JSON.stringify(payload));
    return "saved";
  } catch (err) {
    const name = err instanceof DOMException ? err.name : "";
    return name === "QuotaExceededError" ? "quota" : "unavailable";
  }
}

export function removeDraft() {
  try {
    window.localStorage.removeItem(siteConfig.storageKey);
  } catch {
    /* storage unavailable — nothing to clear */
  }
}
