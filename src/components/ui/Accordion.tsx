"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Controlled mode. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Extra controls in the header (e.g. an on/off switch). Rendered outside the toggle button. */
  headerExtra?: ReactNode;
  className?: string;
  /** Keep children mounted while collapsed so react-hook-form fields stay registered. */
  keepMounted?: boolean;
  id?: string;
  /**
   * "default": plain box, instant open/close (used in the editor).
   * "elevated": pointer cursor, hover lift, light drop shadow when open and a smooth expand animation (used for FAQs).
   */
  variant?: "default" | "elevated";
}

/** Accessible disclosure: a real <button> with aria-expanded controlling a labelled region. */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  open: controlled,
  onOpenChange,
  headerExtra,
  className,
  keepMounted = true,
  id,
  variant = "default",
}: ItemProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = controlled ?? internal;
  const uid = useId();
  const panelId = `${uid}-panel`;
  const buttonId = `${uid}-button`;
  const elevated = variant === "elevated";

  const toggle = () => {
    const next = !open;
    if (controlled === undefined) setInternal(next);
    onOpenChange?.(next);
  };

  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border bg-white",
        elevated
          ? [
              "transition-[box-shadow,border-color,transform] duration-300 ease-out",
              open
                ? "border-brand/35 shadow-[0_12px_32px_-14px_rgba(4,120,87,0.30),0_2px_6px_-2px_rgba(17,24,39,0.06)]"
                : "border-ink/10 shadow-[0_1px_2px_rgba(17,24,39,0.04)] hover:-translate-y-px hover:border-brand/30 hover:shadow-[0_8px_22px_-14px_rgba(17,24,39,0.25)]",
            ]
          : "border-ink/10",
        className,
      )}
    >
      <div className="flex items-center gap-2 pr-3">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className={cn(
            "flex min-h-14 flex-1 cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left font-semibold",
            "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand",
            elevated && "sm:px-5 sm:py-4",
          )}
        >
          <span className="flex-1">{title}</span>
          {elevated ? (
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300",
                open ? "bg-brand-dark text-white" : "bg-mist text-ink/60",
              )}
              aria-hidden="true"
            >
              <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
            </span>
          ) : (
            <ChevronDown className={cn("size-5 shrink-0 text-ink/50 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
          )}
        </button>
        {headerExtra}
      </div>

      {elevated ? (
        // Grid-rows trick: animates height from 0 to content height without measuring. `inert` keeps closed content unfocusable.
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn("grid transition-[grid-template-rows,opacity] duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
        >
          <div className="overflow-hidden" inert={!open}>
            <div className="px-4 pb-5 pt-0 sm:px-5">{children}</div>
          </div>
        </div>
      ) : (
        <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
          {open || keepMounted ? <div className="px-4 pb-4 pt-1">{children}</div> : null}
        </div>
      )}
    </div>
  );
}