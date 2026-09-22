"use client";

import { Download, FileImage, FileText, Printer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { checkDownloadReady } from "@/lib/schema";
import { resolveSettings, useBiodataStore } from "@/store/biodata-store";
import { useEditorUi } from "@/store/editor-ui-store";
import { ExportStage, PrintStage } from "../preview/ExportStage";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { toast } from "../ui/toast";
import { useFormRegistry } from "./form-registry";

type Kind = "pdf" | "png" | "jpeg";

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

export function DownloadControls() {
  const data = useBiodataStore((s) => s.data);
  const enabled = useBiodataStore((s) => s.enabled);
  const templateId = useBiodataStore((s) => s.templateId);
  const accents = useBiodataStore((s) => s.accents);
  const form = useFormRegistry((s) => s.form);
  const reveal = useEditorUi((s) => s.reveal);

  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [busy, setBusy] = useState<Kind | null>(null);
  const [sheet, setSheet] = useState(false);

  const settings = resolveSettings(templateId, accents);

  const ensureReady = useCallback(() => {
    const issues = checkDownloadReady(data, enabled);
    if (issues.length === 0) return true;
    toast.show({ tone: "error", title: "A few details are missing", description: issues.map((i) => i.message).join(". ") + "." });
    reveal(issues[0].section);
    void form?.trigger();
    return false;
  }, [data, enabled, form, reveal]);

  const print = useCallback(() => {
    if (!ensureReady()) return;
    setSheet(false);
    setPrinting(true);
  }, [ensureReady]);

  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(false);
    window.addEventListener("afterprint", done);
    let cancelled = false;
    (async () => {
      await nextFrame();
      await nextFrame();
      if (document.fonts?.ready) await document.fonts.ready;
      if (!cancelled) window.print();
    })();
    return () => {
      cancelled = true;
      window.removeEventListener("afterprint", done);
    };
  }, [printing]);

  const run = useCallback(
    async (kind: Kind) => {
      if (busy) return;
      setSheet(false);
      if (!ensureReady()) return;
      setBusy(kind);
      const id = toast.show({ tone: "loading", title: "Preparing your biodata..." });
      setStage(true);
      try {
        for (let i = 0; i < 40 && !stageRef.current?.querySelector("[data-template-root]"); i++) await nextFrame();
        const node = stageRef.current?.querySelector<HTMLElement>("[data-template-root]");
        if (!node) throw new Error("The preview was not ready. Please try again.");
        const name = data.personal.fullName;
        let note = "";
        if (kind === "pdf") {
          const { exportPdf } = await import("@/lib/export/pdf");
          const { pages } = await exportPdf(node, name);
          note = pages > 1 ? `Your PDF has ${pages} pages.` : "Your PDF is ready.";
        } else {
          const { exportImage } = await import("@/lib/export/image");
          await exportImage(node, kind, name);
          note = `Your ${kind === "png" ? "PNG" : "JPEG"} is ready.`;
        }
        toast.show({ id, tone: "success", title: "Download started", description: note });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong while creating the file.";
        toast.show({
          id,
          tone: "error",
          title: "The download did not work",
          description: message,
          action: { label: "Print or save as PDF instead", onClick: print },
        });
      } finally {
        setStage(false);
        setBusy(null);
      }
    },
    [busy, data.personal.fullName, ensureReady, print],
  );

  const working = busy !== null;

  return (
    <>
      {/* Desktop: explicit buttons */}
      <div className="hidden items-center gap-2 lg:flex">
        <Button variant="cta" size="sm" onClick={() => run("pdf")} disabled={working}>
          <FileText className="size-4" aria-hidden="true" /> {busy === "pdf" ? "Preparing..." : "Download PDF"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => run("png")} disabled={working}>
          <FileImage className="size-4" aria-hidden="true" /> {busy === "png" ? "Preparing..." : "Download PNG"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => run("jpeg")} disabled={working}>
          <FileImage className="size-4" aria-hidden="true" /> {busy === "jpeg" ? "Preparing..." : "Download JPEG"}
        </Button>
      </div>

      {/* Mobile / tablet: one button, choices in a bottom sheet */}
      <Button variant="cta" size="sm" className="lg:hidden" onClick={() => setSheet(true)} disabled={working}>
        <Download className="size-4" aria-hidden="true" /> {working ? "Preparing..." : "Download"}
      </Button>
      <Modal open={sheet} onClose={() => setSheet(false)} variant="right" title="Download your biodata" description="Files are created on your device. Nothing is uploaded.">
        <div className="grid gap-3 p-5">
          <SheetOption icon={FileText} title="PDF" text="A4, best for printing and sharing" onClick={() => run("pdf")} primary />
          <SheetOption icon={FileImage} title="PNG" text="Sharp image, good for WhatsApp and email" onClick={() => run("png")} />
          <SheetOption icon={FileImage} title="JPEG" text="Smaller image file" onClick={() => run("jpeg")} />
          <SheetOption icon={Printer} title="Print or save as PDF" text="Uses your browser's print dialog" onClick={print} />
        </div>
      </Modal>

      {stage ? <ExportStage ref={stageRef} templateId={templateId} data={data} enabled={enabled} settings={settings} /> : null}
      {printing ? <PrintStage templateId={templateId} data={data} enabled={enabled} settings={settings} /> : null}
    </>
  );
}

function SheetOption({ icon: Icon, title, text, onClick, primary }: { icon: typeof FileText; title: string; text: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-16 items-center gap-4 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
        primary ? "border-cta bg-cta/10 hover:bg-cta/20" : "border-ink/10 hover:bg-mist"
      }`}
    >
      <Icon className="size-6 shrink-0 text-brand-dark" aria-hidden="true" />
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-ink/65">{text}</span>
      </span>
    </button>
  );
}
