import type { CSSProperties, ReactNode } from "react";
import { A4_HEIGHT, A4_WIDTH, FONT_BODY } from "./constants";

interface Props {
  children: ReactNode;
  background: string;
  color: string;
  style?: CSSProperties;
}

/**
 * Outer A4 page used by every template. `data-template-root` is what the exporter captures.
 * Height grows past A4 when content is long; exports split it into pages.
 */
export function TemplateShell({ children, background, color, style }: Props) {
  return (
    <div
      data-template-root
      style={{
        width: A4_WIDTH,
        minHeight: A4_HEIGHT,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        background,
        color,
        fontFamily: FONT_BODY,
        fontSize: 13,
        lineHeight: 1.45,
        textAlign: "left",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
