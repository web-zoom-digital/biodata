"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useBiodataStore } from "@/store/biodata-store";
import { useEditorUi, type EditorPanelKey } from "@/store/editor-ui-store";
import type { SectionKey } from "@/types/biodata";
import { AccordionItem } from "../ui/Accordion";

interface Props {
  panel: EditorPanelKey;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  toggleable?: SectionKey;
}

function SectionSwitch({ section, title }: { section: SectionKey; title: string }) {
  const on = useBiodataStore((s) => s.enabled[section]);
  const toggle = useBiodataStore((s) => s.toggleSection);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`Show ${title} in biodata`}
      onClick={() => toggle(section, !on)}
      className="group flex h-10 shrink-0 items-center gap-2 rounded-full px-2 text-xs font-medium text-ink/70 focus-visible:outline-2 focus-visible:outline-brand"
    >
      <span className="hidden min-[400px]:inline">{on ? "Shown" : "Hidden"}</span>
      <span className={cn("relative h-6 w-10 rounded-full transition-colors", on ? "bg-brand-dark" : "bg-ink/25")}>
        <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", on ? "left-[1.125rem]" : "left-0.5")} />
      </span>
    </button>
  );
}

export function EditorSection({ panel, title, icon: Icon, children, toggleable }: Props) {
  const open = useEditorUi((s) => Boolean(s.open[panel]));
  const setPanel = useEditorUi((s) => s.setPanel);
  const enabled = useBiodataStore((s) => (toggleable ? s.enabled[toggleable] : true));

  return (
    <AccordionItem
      id={`panel-${panel}`}
      open={open}
      onOpenChange={(o) => setPanel(panel, o)}
      className="scroll-mt-4"
      title={
        <span className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand-dark">
            <Icon className="size-[1.15rem]" aria-hidden="true" />
          </span>
          <span className={cn(!enabled && "text-ink/50")}>{title}</span>
        </span>
      }
      headerExtra={toggleable ? <SectionSwitch section={toggleable} title={title} /> : undefined}
    >
      {!enabled ? <p className="mb-3 rounded-lg bg-mist px-3 py-2 text-sm text-ink/65">This section is hidden from your biodata. What you type here is kept.</p> : null}
      {children}
    </AccordionItem>
  );
}
