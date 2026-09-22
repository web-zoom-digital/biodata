"use client";

import type { UseFormReturn } from "react-hook-form";
import { create } from "zustand";
import type { BiodataData } from "@/types/biodata";

interface Registry {
  form: UseFormReturn<BiodataData> | null;
  register: (form: UseFormReturn<BiodataData> | null) => void;
}

/** Lets header controls (e.g. Download) trigger validation on the form owned by EditorSidebar. */
export const useFormRegistry = create<Registry>((set) => ({
  form: null,
  register: (form) => set({ form }),
}));
