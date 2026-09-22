import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Mark: a folded biodata page with a check-shaped stroke. Colours come from the brand config via CSS variables. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--color-brand)" />
      <path d="M10 7.5h8.2L23 12.3V24a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 9 24V9a1.5 1.5 0 0 1 1-1.5z" fill="#fff" />
      <path d="M18.2 7.5v3.6a1.2 1.2 0 0 0 1.2 1.2H23" fill="#D1FAE5" />
      <path d="M12.5 18.5l2.3 2.3 4.7-5" fill="none" stroke="var(--color-brand-dark)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("font-display text-[1.35rem] font-semibold tracking-tight", light ? "text-white" : "text-ink")}>{siteConfig.name}</span>
    </span>
  );
}
