"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Download, Share2, PlusSquare, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface PwaContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  promptInstall: () => void;
  dismissInstall: () => void;
  showIOSModal: boolean;
  setShowIOSModal: (show: boolean) => void;
}

const PwaContext = createContext<PwaContextType>({
  isInstallable: false,
  isInstalled: false,
  isIOS: false,
  promptInstall: () => {},
  dismissInstall: () => {},
  showIOSModal: false,
  setShowIOSModal: () => {},
});

export function usePwa() {
  return useContext(PwaContext);
}

export function PwaProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Service Worker Registration
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[PWA] Service Worker registered with scope:", reg.scope);
          })
          .catch((err) => {
            console.error("[PWA] Service Worker registration failed:", err);
          });
      });
    }

    // Check if running in standalone mode (already installed)
    if (typeof window !== "undefined") {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsInstalled(isStandalone);

      // Check iOS detection
      const ua = window.navigator.userAgent;
      const isIOSDevice = /ipad|iphone|ipod/i.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
      setIsIOS(isIOSDevice && !isStandalone);
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log("[PWA] BioCraft app successfully installed!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {
        setIsInstalled(true);
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    });
  };

  const dismissInstall = () => {
    setIsInstallable(false);
  };

  return (
    <PwaContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        promptInstall,
        dismissInstall,
        showIOSModal,
        setShowIOSModal,
      }}
    >
      {children}

      {/* iOS Installation Instructions Modal */}
      {showIOSModal && (
        <Modal
          open={showIOSModal}
          onClose={() => setShowIOSModal(false)}
          title="Install BioCraft on iOS"
          description="Follow these steps to add BioCraft to your iPhone or iPad home screen:"
        >
          <div className="space-y-4 p-4 text-slate-800">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-xs">1</span>
              <p className="text-sm">
                Tap the <strong>Share</strong> button <Share2 className="inline size-4 text-sky-600" /> in Safari navigation bar.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-xs">2</span>
              <p className="text-sm">
                Scroll down the share sheet options and tap <strong>Add to Home Screen</strong> <PlusSquare className="inline size-4 text-emerald-600" />.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-xs">3</span>
              <p className="text-sm">
                Tap <strong>Add</strong> in the top-right corner to complete installation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark py-3 font-semibold text-white cursor-pointer hover:bg-[#065f46]"
            >
              Got it
            </button>
          </div>
        </Modal>
      )}
    </PwaContext.Provider>
  );
}
