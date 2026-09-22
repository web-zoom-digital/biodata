"use client";

import { BookOpen, HelpCircle, Home, LayoutTemplate, Pencil, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

/* Icon mapping for bottom nav & mobile menu */
const NAV_ICONS: Record<string, React.ElementType> = {
  "/": Home,
  "/how-it-works": Zap,
  "/templates": LayoutTemplate,
  "/blog": BookOpen,
  "/faq": HelpCircle,
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openFor, setOpenFor] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu after navigating
  if (openFor !== pathname) {
    setOpenFor(pathname);
    setOpen(false);
  }

  // Keyboard close + body scroll lock
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Only show bottom nav on site pages (not editor)
  const isEditorPage = pathname.startsWith("/create");

  return (
    <>
      {/* ─── Top Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="rounded-lg shrink-0">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const Icon = NAV_ICONS[item.href];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium text-ink/70 transition-all hover:bg-mist hover:text-ink",
                    isActive(item.href) && "bg-brand-soft text-brand-dark font-semibold",
                  )}
                >
                  {Icon && <Icon className="size-3.5" aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/create" variant="cta" size="sm" className="hidden sm:inline-flex text-white px-5">
              Create Bio Data
            </Button>

            {/* ── Attractive Hamburger Button ── */}
            <button
              type="button"
              className={cn(
                "relative flex size-11 flex-col items-center justify-center gap-[5px] rounded-2xl border transition-all duration-300 lg:hidden",
                open
                  ? "border-brand-dark bg-white shadow-md"
                  : "border-ink/15 bg-white hover:border-brand/40 hover:shadow-sm",
              )}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span
                className={cn(
                  "block h-[2px] w-5 rounded-full transition-all duration-300",
                  open ? "translate-y-[7px] rotate-45 bg-brand-dark" : "bg-ink",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-5 rounded-full transition-all duration-300",
                  open ? "w-0 opacity-0" : "bg-ink",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-5 rounded-full transition-all duration-300",
                  open ? "-translate-y-[7px] -rotate-45 bg-brand-dark" : "bg-ink",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu Drawer (Outside header to prevent stacking context bug) ── */}
      <div
        id="mobile-menu"
        ref={menuRef}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-0 top-16 z-50 flex flex-col bg-white transition-all duration-300 lg:hidden overflow-y-auto",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none",
        )}
      >
        <nav className="relative z-10 flex flex-col gap-2 px-5 pt-6 pb-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink/50 px-3">Navigation</p>
          {siteConfig.nav.map((item) => {
            const Icon = NAV_ICONS[item.href];
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-3.5 rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200 border",
                  active
                    ? "bg-brand-soft/90 border-brand/30 text-brand-dark shadow-sm"
                    : "bg-slate-50/70 border-slate-100 text-ink hover:bg-brand-soft/40 hover:border-brand/20",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors shadow-xs",
                    active
                      ? "bg-brand-dark text-white"
                      : "bg-white text-brand-dark border border-slate-200 group-hover:bg-brand-dark group-hover:text-white",
                  )}
                >
                  {Icon && <Icon className="size-5" aria-hidden="true" />}
                </span>
                <span className="text-[15px] font-semibold text-ink">{item.label}</span>
                {active && (
                  <span className="ml-auto size-2 rounded-full bg-brand-dark" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA at bottom of drawer */}
        <div className="relative z-10 mt-auto border-t border-slate-100 bg-white px-5 py-6 mb-16">
          <Link
            href="/create"
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-dark via-brand to-emerald-500 px-6 text-base font-bold text-white shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Pencil className="size-4" aria-hidden="true" />
            Create Your Biodata — Free
          </Link>
          <p className="mt-3 text-center text-xs text-ink/50">No sign-up · No payment · Instant download</p>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-40 bg-ink/20 backdrop-blur-[2px] lg:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ─── Mobile Sticky Bottom Nav Bar ─────────────────────────── */}
      {!isEditorPage && (
        <nav
          aria-label="Mobile bottom navigation"
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden pb-[env(safe-area-inset-bottom)]"
        >
          {/* Frosted glass bar */}
          <div className="mx-3 mb-3 overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/80 shadow-[0_-2px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <div className="flex items-stretch">
              {/* Nav links — show first 4 */}
              {siteConfig.nav.slice(0, 4).map((item) => {
                const Icon = NAV_ICONS[item.href];
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[10px] font-semibold transition-all duration-200",
                      active ? "text-brand-dark" : "text-ink/50 hover:text-ink/80",
                    )}
                  >
                    {/* Active pill indicator */}
                    {active && (
                      <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-dark" aria-hidden="true" />
                    )}
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-xl transition-all duration-200",
                        active
                          ? "bg-brand-soft text-brand-dark scale-110"
                          : "group-hover:bg-mist group-hover:text-ink",
                      )}
                    >
                      {Icon && <Icon className="size-4" aria-hidden="true" />}
                    </span>
                    <span className={active ? "text-brand-dark" : ""}>{item.label}</span>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="my-3 w-px bg-ink/8" aria-hidden="true" />

              {/* Create CTA — glowing pill */}
              <Link
                href="/create"
                aria-label="Create your biodata"
                className="group flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[10px] font-bold text-cta transition-all duration-200 active:scale-95"
              >
                <span className="relative flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-cta to-orange-600 text-white shadow-md shadow-cta/40 transition-all group-hover:scale-110 group-hover:shadow-cta/50">
                  <Pencil className="size-4" aria-hidden="true" />
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-green-400" aria-hidden="true" />
                </span>
                <span className="bg-gradient-to-r from-cta to-orange-600 bg-clip-text text-transparent">Create</span>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
