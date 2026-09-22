"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { A4_HEIGHT, A4_WIDTH } from "@/templates/shared/constants";
import { cn } from "@/lib/utils";

/** Scales an A4-sized child to fit the width of its container. Used for gallery thumbnails. */
export function ScaledPage({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / A4_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("relative w-full overflow-hidden bg-white", className)}
      style={{ aspectRatio: `${A4_WIDTH} / ${A4_HEIGHT}` }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: A4_WIDTH,
          transform: `scale(${scale ?? 0.3})`,
          transformOrigin: "top left",
          visibility: scale === null ? "hidden" : "visible",
          pointerEvents: "none",
        }}
        inert
      >
        {children}
      </div>
    </div>
  );
}
