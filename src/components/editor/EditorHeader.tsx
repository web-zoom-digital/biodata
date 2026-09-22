"use client";

import { ArrowLeft, ChevronDown, Columns2, Eye, LayoutTemplate, Pencil } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useBiodataStore } from "@/store/biodata-store";
import { useEditorUi } from "@/store/editor-ui-store";
import { getTemplateOrDefault } from "@/templates";
import { LogoMark } from "../ui/Logo";
import { DownloadControls } from "./DownloadControls";
import { SaveIndicator } from "./SaveIndicator";

export function EditorHeader() {
  const templateId = useBiodataStore((s) => s.templateId);
  const template = getTemplateOrDefault(templateId);
  const mobileTab = useEditorUi((s) => s.mobileTab);
  const setMobileTab = useEditorUi((s) => s.setMobileTab);
  const setTemplateDrawer = useEditorUi((s) => s.setTemplateDrawer);
  const setPreviewModal = useEditorUi((s) => s.setPreviewModal);

  return (
    <>
      <header className="z-30 border-b border-ink/10 bg-white pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2 px-3 py-2 sm:px-4 lg:gap-3">
          <Link
            href="/templates"
            aria-label="Back to Templates"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-ink/75 hover:bg-mist focus-visible:outline-2 focus-visible:outline-brand sm:text-sm"
          >
            <ArrowLeft className="size-4 shrink-0 sm:size-5" aria-hidden="true" />
            <span>Templates</span>
          </Link>
          <Link href="/" aria-label="Home" className="hidden shrink-0 lg:block">
            <LogoMark className="size-8" />
          </Link>

          <button
            type="button"
            onClick={() => setTemplateDrawer(true)}
            className="flex h-10 min-w-0 flex-1 items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 text-left text-xs sm:text-sm hover:border-brand focus-visible:outline-2 focus-visible:outline-brand lg:flex-none"
          >
            <LayoutTemplate className="size-4 shrink-0 text-brand-dark" aria-hidden="true" />
            <span className="truncate">
              <span className="hidden text-ink/60 sm:inline">Change template: </span>
              <span className="font-semibold">{template.name}</span>
            </span>
            <ChevronDown className="ml-auto size-4 shrink-0 text-ink/50" aria-hidden="true" />
          </button>

          <div className="shrink-0">
            <SaveIndicator />
          </div>
          <div className="hidden flex-1 lg:block" />

          <button
            type="button"
            onClick={() => setPreviewModal(true)}
            className="hidden h-9 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-semibold hover:border-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand lg:inline-flex"
          >
            <Eye className="size-4" aria-hidden="true" /> Preview
          </button>
          <DownloadControls />
        </div>
      </header>

      {/* ── Mobile Floating Bottom View Switcher Bar ── */}
      <div className="fixed bottom-3 inset-x-3 z-40 flex justify-center lg:hidden pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="pointer-events-auto flex items-center justify-between gap-1 rounded-full border border-slate-200/90 bg-white/95 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl max-w-sm w-full">
          {(
            [
              { key: "edit", label: "Edit", icon: Pencil },
              { key: "split", label: "Half View", icon: Columns2 },
              { key: "preview", label: "Preview", icon: Eye },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={mobileTab === key}
              onClick={() => setMobileTab(key)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 px-2 text-xs font-bold transition-all duration-200",
                mobileTab === key
                  ? "bg-brand-dark text-white shadow-md shadow-brand-dark/20 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70",
              )}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
