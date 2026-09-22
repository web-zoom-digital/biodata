"use client";

import { AlertCircle, CheckCircle2, Info, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast, useToastStore, type ToastTone } from "./toast";

const icons: Record<ToastTone, typeof Info> = {
  info: Info,
  loading: Loader2,
  success: CheckCircle2,
  error: AlertCircle,
};

const tones: Record<ToastTone, string> = {
  info: "text-indigo",
  loading: "text-brand-dark",
  success: "text-brand-dark",
  error: "text-red-700",
};

export function Toaster() {
  const items = useToastStore((s) => s.items);
  return (
    <div
      role="region"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-end sm:p-5"
    >
      {items.map((t) => {
        const Icon = icons[t.tone];
        return (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className="toast-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-ink/10 bg-white p-3.5 shadow-lg"
          >
            <Icon className={cn("mt-0.5 size-5 shrink-0", tones[t.tone], t.tone === "loading" && "animate-spin")} aria-hidden="true" />
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-semibold text-ink">{t.title}</p>
              {t.description ? <p className="mt-0.5 text-ink/70">{t.description}</p> : null}
              {t.action ? (
                <button
                  type="button"
                  onClick={() => {
                    t.action?.onClick();
                    toast.dismiss(t.id);
                  }}
                  className="mt-2 font-semibold text-brand-dark underline underline-offset-2"
                >
                  {t.action.label}
                </button>
              ) : null}
            </div>
            <button type="button" onClick={() => toast.dismiss(t.id)} aria-label="Dismiss" className="grid size-8 shrink-0 place-items-center rounded-full text-ink/50 hover:bg-mist">
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
