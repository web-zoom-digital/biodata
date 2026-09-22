"use client";

import { ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { buildViewModel } from "@/lib/biodata";
import { cn } from "@/lib/utils";
import { useBiodataStore } from "@/store/biodata-store";
import { useEditorUi } from "@/store/editor-ui-store";
import { LivePreview } from "../preview/LivePreview";
import { Button } from "../ui/Button";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { toast } from "../ui/toast";
import { EditorHeader } from "./EditorHeader";
import { EditorSidebar } from "./EditorSidebar";
import { PreviewModal } from "./PreviewModal";
import { TemplateSelector } from "./TemplateSelector";

function EditorSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading your draft">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-2xl bg-mist" />
      ))}
    </div>
  );
}

export function EditorLayout() {
  const hydrated = useBiodataStore((s) => s.hydrated);
  const saveState = useBiodataStore((s) => s.saveState);
  const loadSample = useBiodataStore((s) => s.loadSample);
  const clearDraft = useBiodataStore((s) => s.clearDraft);
  const data = useBiodataStore((s) => s.data);
  const enabled = useBiodataStore((s) => s.enabled);
  const mobileTab = useEditorUi((s) => s.mobileTab);
  const clearOpen = useEditorUi((s) => s.clearDialogOpen);
  const setClearOpen = useEditorUi((s) => s.setClearDialog);
  const sampleConfirm = useEditorUi((s) => s.sampleDialogOpen);
  const setSampleConfirm = useEditorUi((s) => s.setSampleDialog);

  useEffect(() => {
    if (saveState === "unavailable" || saveState === "quota") {
      toast.show({
        id: "storage-warning",
        tone: "info",
        title: saveState === "quota" ? "Your device storage is full" : "Drafts can't be saved in this browser",
        description: "Your biodata still works. Download it before you close this tab.",
      });
    }
  }, [saveState]);

  const hasContent = hydrated && !buildViewModel(data, enabled).isEmpty;

  return (
    <div className="flex h-dvh flex-col bg-mist overflow-x-hidden">
      <EditorHeader />
      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(28rem,45%)_minmax(0,1fr)]">
        {/* Biodata Editor Forms Section */}
        <section
          aria-label="Biodata editor"
          className={cn(
            "min-h-0 min-w-0 overflow-y-auto overscroll-contain transition-all duration-300 order-2 lg:order-1",
            mobileTab === "edit" && "flex-1 h-full block",
            mobileTab === "preview" && "hidden lg:block lg:flex-1",
            mobileTab === "split" && "flex-1 block h-[58vh] border-t-2 border-sky-300/80 shadow-2xl rounded-t-3xl bg-white lg:h-full lg:border-t-0 lg:rounded-none lg:shadow-none",
          )}
        >
          <div className="mx-auto max-w-2xl px-3 pb-24 pt-4 sm:px-5 lg:pb-10">
            <div className="mb-4 rounded-2xl border border-brand/20 bg-brand-soft p-4">
              <p className="flex items-start gap-2 text-sm text-ink/80">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-dark" aria-hidden="true" />
                Your biodata is processed in your browser whenever possible. The draft is kept on this device only.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => (hasContent ? setSampleConfirm(true) : loadSample())}>
                  <Sparkles className="size-4" aria-hidden="true" /> Try with sample data
                </Button>
                <Button variant="outline" color="error" size="sm" onClick={() => setClearOpen(true)} disabled={!hasContent}>
                  <Trash2 className="size-4 " aria-hidden="true" /> Clear data
                </Button>
              </div>
            </div>
            {hydrated ? <EditorSidebar /> : <EditorSkeleton />}
          </div>
        </section>

        {/* Live A4 Preview Section */}
        <section
          aria-label="Live preview"
          className={cn(
            "min-h-0 min-w-0 border-l border-ink/10 transition-all duration-300 order-1 lg:order-2",
            mobileTab === "preview" && "flex-1 h-full block",
            mobileTab === "edit" && "hidden lg:block lg:flex-1",
            mobileTab === "split" && "block h-[42vh] shrink-0 lg:h-full lg:flex-1",
          )}
        >
          <LivePreview className="h-full" />
        </section>
      </div>

      <TemplateSelector />
      <PreviewModal />
      <ConfirmDialog
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        title="Clear this draft?"
        description="This removes everything you entered and the saved copy on this device. You can't undo it."
        confirmLabel="Clear draft"
        danger
        onConfirm={() => {
          clearDraft();
          toast.show({ tone: "success", title: "Draft cleared", description: "You have a fresh, empty biodata." });
        }}
      />
      <ConfirmDialog
        open={sampleConfirm}
        onClose={() => setSampleConfirm(false)}
        title="Replace your details with sample data?"
        description="The sample biodata will overwrite what you have entered so far."
        confirmLabel="Use sample data"
        onConfirm={loadSample}
      />
    </div>
  );
}
