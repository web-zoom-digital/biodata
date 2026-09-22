import type { CSSProperties } from "react";
import type { GodSymbol } from "@/types/biodata";

interface Props {
  symbol?: GodSymbol;
  size?: number;
  style?: CSSProperties;
  className?: string;
}


export function TemplateGodSymbol({ symbol, size = 32, style, className }: Props) {
  if (!symbol?.src) return null;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        padding: "3px",
        borderRadius: "9999px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={symbol.src}
        alt={symbol.name || "God symbol"}
        style={{
          height: size,
          width: size,
          objectFit: "contain",
          display: "block",
          borderRadius: "9999px",
        }}
      />
    </div>
  );
}

