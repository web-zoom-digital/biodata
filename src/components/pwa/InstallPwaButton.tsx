"use client";

import { CheckCircle } from "lucide-react";
import { usePwa } from "./PwaProvider";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface InstallPwaButtonProps {
  variant?: "navbar" | "mobile" | "button" | "footer";
  className?: string;
}

export function InstallPwaButton({ variant = "navbar", className }: InstallPwaButtonProps) {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePwa();

  // If already installed or neither installable nor iOS, return null or installed badge
  if (isInstalled) {
    if (variant === "footer") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-emerald-400">
          <CheckCircle className="size-3.5" /> BioCraft App Installed
        </span>
      );
    }
    return null;
  }

  if (!isInstallable && !isIOS) {
    return null;
  }

  if (variant === "navbar") {
    return (
      <button
        type="button"
        onClick={promptInstall}
        aria-label="Install BioCraft App"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-soft/90 px-3 py-1.5 text-xs font-bold text-brand-dark transition-all duration-200 hover:bg-brand-dark hover:text-white hover:scale-105 active:scale-95 cursor-pointer shadow-xs",
          className
        )}
      >
        <LogoMark className="size-4 shrink-0" />
        <span>Install App</span>
      </button>
    );
  }

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={promptInstall}
        className={cn(
          "flex w-full items-center justify-center gap-2.5 rounded-2xl border border-brand/40 bg-gradient-to-r from-brand-soft via-emerald-50 to-brand-soft p-3.5 text-sm font-bold text-brand-dark transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs",
          className
        )}
      >
        <LogoMark className="size-5 shrink-0" />
        <span>Install BioCraft App for Offline Access</span>
      </button>
    );
  }

  if (variant === "footer") {
    return (
      <button
        type="button"
        onClick={promptInstall}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/60 px-4 py-2 text-xs font-bold text-sky-300 transition-all duration-200 hover:bg-sky-900 hover:text-white hover:border-sky-400 hover:scale-105 active:scale-95 cursor-pointer shadow-md",
          className
        )}
      >
        <LogoMark className="size-4 shrink-0" />
        <span>Install BioCraft App</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={promptInstall}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-dark via-brand to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer",
        className
      )}
    >
      <LogoMark className="size-5 shrink-0" />
      <span>Install BioCraft App</span>
    </button>
  );
}
