"use client";

import { create } from "zustand";

export type ToastTone = "info" | "loading" | "success" | "error";

export interface ToastItem {
  id: string;
  tone: ToastTone;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

interface ToastState {
  items: ToastItem[];
}

const useToastStore = create<ToastState>(() => ({ items: [] }));
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function autoDismiss(id: string, tone: ToastTone) {
  const existing = timers.get(id);
  if (existing) clearTimeout(existing);
  if (tone === "loading") return;
  timers.set(
    id,
    setTimeout(() => toast.dismiss(id), tone === "error" ? 9000 : 4200),
  );
}

export const toast = {
  show(item: Omit<ToastItem, "id"> & { id?: string }) {
    const id = item.id ?? `t_${Math.random().toString(36).slice(2, 8)}`;
    useToastStore.setState((s) => {
      const next = { ...item, id } as ToastItem;
      const exists = s.items.some((t) => t.id === id);
      return { items: exists ? s.items.map((t) => (t.id === id ? next : t)) : [...s.items.slice(-2), next] };
    });
    autoDismiss(id, item.tone);
    return id;
  },
  dismiss(id: string) {
    const timer = timers.get(id);
    if (timer) clearTimeout(timer);
    timers.delete(id);
    useToastStore.setState((s) => ({ items: s.items.filter((t) => t.id !== id) }));
  },
};

export { useToastStore };
