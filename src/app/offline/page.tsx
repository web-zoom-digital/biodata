"use client";

import { ArrowRight, HardDrive, WifiOff, Pencil, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/Button";

export default function OfflinePage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 py-16 text-white sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-emerald-500/10 blur-3xl animate-float-gentle" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-sky-500/10 blur-3xl animate-float-reverse" />

        <Container className="relative z-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-white/10 text-emerald-400 border border-white/15 shadow-2xl backdrop-blur-md">
              <WifiOff className="size-10" aria-hidden="true" />
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
              <HardDrive className="size-3.5" /> You are currently offline
            </span>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
              No Internet Connection
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              Don&apos;t worry! BioCraft saves your biodata drafts directly on your device. You can continue editing and customizing your biodata offline.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                href="/create"
                variant="cta"
                size="lg"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.03] w-full sm:w-auto"
              >
                <Pencil className="size-4.5" />
                <span>Open Biodata Editor</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>

              <button
                type="button"
                onClick={() => typeof window !== "undefined" && window.location.reload()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40 cursor-pointer w-full sm:w-auto"
              >
                <RefreshCw className="size-4" />
                <span>Try Reconnecting</span>
              </button>
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-sm text-slate-300 backdrop-blur-md">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <HardDrive className="size-4 text-emerald-400" /> Offline Capabilities Notice
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-4">
                <li>Your previously typed details in the editor are preserved in LocalStorage.</li>
                <li>Templates previously loaded in your browser cache remain available.</li>
                <li>First-time page visits or new external font assets require an active connection.</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
