"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 4)
  scale?: number; // hover scale (default 1.02)
  glare?: boolean;
  disabled?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 4,
  scale = 1.02,
  glare = true,
  disabled = false,
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const touchCheck = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      setIsTouch(touchCheck);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Rotate X is driven by vertical mouse offset (inverted)
    const rotateX = Number((-yPct * maxTilt * 2).toFixed(2));
    // Rotate Y is driven by horizontal mouse offset
    const rotateY = Number((xPct * maxTilt * 2).toFixed(2));

    setTilt({ x: rotateX, y: rotateY, scale });
    setGlarePos({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100),
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, scale: 1 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const isInteractive = tilt.x !== 0 || tilt.y !== 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: !disabled && !isTouch
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`
          : undefined,
        transformStyle: "preserve-3d",
        transition: isInteractive
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn("relative cursor-pointer transition-shadow duration-300", className)}
      {...props}
    >
      {children}
      {glare && !disabled && !isTouch && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%)`,
            opacity: glarePos.opacity,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
