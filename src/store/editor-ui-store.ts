"use client";

import { create } from "zustand";
import type { SectionKey } from "@/types/biodata";

export type EditorPanelKey = "photo" | "godSymbol" | SectionKey;
export type MobileTab = "edit" | "split" | "preview";

interface EditorUiState {
  open: Partial<Record<EditorPanelKey, boolean>>;
  mobileTab: MobileTab;
  templateDrawerOpen: boolean;
  previewModalOpen: boolean;
  clearDialogOpen: boolean;
  sampleDialogOpen: boolean;
  setPanel: (key: EditorPanelKey, open: boolean) => void;
  reveal: (key: EditorPanelKey) => void;
  setMobileTab: (tab: MobileTab) => void;
  setTemplateDrawer: (open: boolean) => void;
  setPreviewModal: (open: boolean) => void;
  setClearDialog: (open: boolean) => void;
  setSampleDialog: (open: boolean) => void;
}

export const useEditorUi = create<EditorUiState>((set) => ({
  open: { photo: true, personal: true },
  mobileTab: "split",
  templateDrawerOpen: false,
  previewModalOpen: false,
  clearDialogOpen: false,
  sampleDialogOpen: false,
  setPanel: (key, open) => set((s) => ({ open: { ...s.open, [key]: open } })),
  reveal: (key) => {
    set((s) => ({ open: { ...s.open, [key]: true }, mobileTab: "edit" }));
    requestAnimationFrame(() => {
      setTimeout(() => document.getElementById(`panel-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    });
  },
  setMobileTab: (mobileTab) => set({ mobileTab }),
  setTemplateDrawer: (templateDrawerOpen) => set({ templateDrawerOpen }),
  setPreviewModal: (previewModalOpen) => set({ previewModalOpen }),
  setClearDialog: (clearDialogOpen) => set({ clearDialogOpen }),
  setSampleDialog: (sampleDialogOpen) => set({ sampleDialogOpen }),
}));
