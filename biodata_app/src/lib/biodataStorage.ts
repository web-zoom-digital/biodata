import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FormDataModel, SectionVisibility } from '@/types/biodata';
import { DEFAULT_SECTION_VISIBILITY } from '@/types/biodata';

export const STORAGE_KEY = 'biocraft_biodata_v1';

export interface StoragePayload {
  version: number;
  data: FormDataModel;
  enabled?: SectionVisibility;
  templateId?: string;
  accent?: string;
  updatedAt?: number;
}

// ─── AsyncStorage helpers ─────────────────────────────────────────────────────

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
    return null;
  }
  return AsyncStorage.getItem(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
    return;
  }
  await AsyncStorage.setItem(key, value);
}

async function removeItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
    return;
  }
  await AsyncStorage.removeItem(key);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function loadStoredBiodataAsync(): Promise<{
  data: FormDataModel;
  enabled: SectionVisibility;
  templateId?: string;
  accent?: string;
} | null> {
  try {
    const raw = await getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoragePayload;
    if (parsed && typeof parsed === 'object' && parsed.data) {
      return {
        data: parsed.data,
        enabled: { ...DEFAULT_SECTION_VISIBILITY, ...(parsed.enabled || {}) },
        templateId: parsed.templateId,
        accent: parsed.accent,
      };
    }
  } catch (err) {
    console.warn('[BioCraft] Failed to load biodata from storage:', err);
  }
  return null;
}

export async function saveStoredBiodataAsync(
  data: FormDataModel,
  enabled: SectionVisibility,
  templateId: string,
  accent?: string
): Promise<boolean> {
  try {
    const payload: StoragePayload = {
      version: 1,
      data,
      enabled,
      templateId,
      accent,
      updatedAt: Date.now(),
    };
    await setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.warn('[BioCraft] Failed to save biodata to storage:', err);
    return false;
  }
}

export async function clearStoredBiodataAsync(): Promise<void> {
  try {
    await removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('[BioCraft] Failed to clear biodata storage:', err);
  }
}

/**
 * Synchronous shim for web-only callers that still use the old API.
 * On native this returns null — callers should migrate to the async version.
 */
export function loadStoredBiodata(): {
  data: FormDataModel;
  enabled: SectionVisibility;
  templateId?: string;
  accent?: string;
} | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoragePayload;
    if (parsed && typeof parsed === 'object' && parsed.data) {
      return {
        data: parsed.data,
        enabled: { ...DEFAULT_SECTION_VISIBILITY, ...(parsed.enabled || {}) },
        templateId: parsed.templateId,
        accent: parsed.accent,
      };
    }
  } catch (err) {
    console.warn('[BioCraft] Failed to load biodata from localStorage:', err);
  }
  return null;
}

export function saveStoredBiodata(
  data: FormDataModel,
  enabled: SectionVisibility,
  templateId: string,
  accent?: string
): boolean {
  const payload: StoragePayload = {
    version: 1,
    data,
    enabled,
    templateId,
    accent,
    updatedAt: Date.now(),
  };

  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        return true;
      } catch (err) {
        console.warn('[BioCraft] Failed to save biodata to localStorage:', err);
        return false;
      }
    }
    return false;
  }

  // Native: fire and forget to AsyncStorage
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload)).catch((err) => {
    console.warn('[BioCraft] Failed to save biodata to AsyncStorage:', err);
  });
  return true;
}

export function clearStoredBiodata(): void {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('[BioCraft] Failed to clear biodata from localStorage:', err);
      }
    }
    return;
  }

  // Native: fire and forget to AsyncStorage
  AsyncStorage.removeItem(STORAGE_KEY).catch((err) => {
    console.warn('[BioCraft] Failed to clear biodata from AsyncStorage:', err);
  });
}

// ─── Saved / Downloaded Biodatas List API ─────────────────────────────────────

export const SAVED_BIODATAS_KEY = 'biocraft_saved_biodatas_v1';

export interface SavedBiodataItem {
  id: string;
  name: string;
  templateId: string;
  templateName: string;
  accent: string;
  format?: string;
  filename?: string;
  data: FormDataModel;
  enabled: SectionVisibility;
  downloadedAt: number;
}

export async function getSavedBiodatasListAsync(): Promise<SavedBiodataItem[]> {
  try {
    const raw = await getItem(SAVED_BIODATAS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.warn('[BioCraft] Failed to load saved biodatas list:', err);
  }
  return [];
}

export async function saveDownloadedBiodataAsync(
  item: Omit<SavedBiodataItem, 'id' | 'downloadedAt'> & { id?: string }
): Promise<SavedBiodataItem> {
  const currentList = await getSavedBiodatasListAsync();
  const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const savedItem: SavedBiodataItem = {
    ...item,
    id,
    downloadedAt: Date.now(),
  };

  const existingIdx = currentList.findIndex((b) => b.id === id);
  let updatedList: SavedBiodataItem[];
  if (existingIdx >= 0) {
    updatedList = [...currentList];
    updatedList[existingIdx] = savedItem;
  } else {
    // If same name & template was saved recently (within 60s), update it instead of duplicating
    const recentDuplicateIdx = currentList.findIndex(
      (b) =>
        b.name === savedItem.name &&
        b.templateId === savedItem.templateId &&
        Date.now() - b.downloadedAt < 60000
    );
    if (recentDuplicateIdx >= 0) {
      updatedList = [...currentList];
      updatedList[recentDuplicateIdx] = savedItem;
    } else {
      updatedList = [savedItem, ...currentList];
    }
  }

  try {
    await setItem(SAVED_BIODATAS_KEY, JSON.stringify(updatedList));
  } catch (err) {
    console.warn('[BioCraft] Failed to save downloaded biodata to list:', err);
  }

  return savedItem;
}

export async function deleteSavedBiodataAsync(id: string): Promise<void> {
  const currentList = await getSavedBiodatasListAsync();
  const filtered = currentList.filter((b) => b.id !== id);
  try {
    await setItem(SAVED_BIODATAS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn('[BioCraft] Failed to delete saved biodata:', err);
  }
}

export async function loadSavedBiodataByIdAsync(id: string): Promise<SavedBiodataItem | null> {
  const list = await getSavedBiodatasListAsync();
  return list.find((b) => b.id === id) || null;
}

