"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** "center" dialog, "right" drawer, or "full" for large previews. Drawers become bottom sheets on phones. */
  variant?: "center" | "right" | "full";
  className?: string;
}

/** Accessible modal built on the native <dialog>: focus trap, Esc to close and inert background come for free. */
export function Modal({ open, onClose, title, description, children, footer, variant = "center", className }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-0 max-h-none max-w-none bg-transparent p-0 text-ink backdrop:bg-ink/50 backdrop:backdrop-blur-[2px]",
        "open:flex",
        variant === "center" && "h-full w-full items-center justify-center p-4",
        variant === "right" && "h-full w-full items-end justify-end sm:items-stretch",
        variant === "full" && "h-full w-full items-stretch justify-stretch p-0 sm:p-4",
      )}
    >
      <div
        tabIndex={-1}
        autoFocus
        className={cn(
          "modal-panel flex min-h-0 flex-col bg-white shadow-2xl outline-none",
          variant === "center" && "max-h-[90dvh] w-full max-w-lg rounded-2xl",
          variant === "right" && "max-h-[88dvh] w-full rounded-t-2xl sm:max-h-none sm:h-full sm:max-w-[30rem] sm:rounded-none sm:rounded-l-2xl",
          variant === "full" && "h-full w-full sm:rounded-2xl",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4">
          <div>
            <h2 id={titleId} className="font-display text-xl font-semibold">
              {title}
            </h2>
            {description ? <p className="mt-1 text-sm text-ink/65">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 grid size-10 shrink-0 place-items-center rounded-full text-ink/70 hover:bg-mist focus-visible:outline-2 focus-visible:outline-brand"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer ? <div className="border-t border-ink/10 px-5 py-4">{footer}</div> : null}
      </div>
    </dialog>
  );
}
