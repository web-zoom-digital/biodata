import type { CSSProperties } from "react";
import { FONT_BODY } from "./constants";

interface Props {
  color?: string;
  style?: CSSProperties;
}

export function TemplateTrademark({ color = "currentColor", style }: Props) {
  return (
    <div
      data-template-watermark
      style={{
        width: "100%",
        paddingTop: 12,
        paddingBottom: 4,
        textAlign: "center",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        opacity: 0.55,
        userSelect: "none",
        pointerEvents: "none",
        position: "relative",
        zIndex: 20,
        fontFamily: FONT_BODY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        color,
        ...style,
      }}
    >
      <span>zoomdigital™</span>
    </div>
  );
}
