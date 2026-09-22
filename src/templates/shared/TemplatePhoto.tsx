import type { CSSProperties } from "react";

interface Props {
  src?: string;
  width: number;
  height: number;
  /** Any CSS border-radius, e.g. "50%" or "999px 999px 8px 8px". */
  radius?: string;
  border?: string;
  boxShadow?: string;
  placeholderBg?: string;
  placeholderFg?: string;
  showPlaceholder: boolean;
  style?: CSSProperties;
}

/** Profile photo with a graceful placeholder. Returns null when there is no photo and placeholders are off. */
export function TemplatePhoto({
  src,
  width,
  height,
  radius = "6px",
  border,
  boxShadow,
  placeholderBg = "#E5E7EB",
  placeholderFg = "#9CA3AF",
  showPlaceholder,
  style,
}: Props) {
  if (!src && !showPlaceholder) return null;
  const box: CSSProperties = {
    width,
    height,
    borderRadius: radius,
    border,
    boxShadow,
    overflow: "hidden",
    boxSizing: "border-box",
    flexShrink: 0,
    background: placeholderBg,
    ...style,
  };
  if (src) {
    return (
      <div style={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={width} height={height} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{ ...box, display: "flex", alignItems: "flex-end", justifyContent: "center" }} aria-hidden="true">
      <svg viewBox="0 0 100 120" width="70%" height="80%" fill={placeholderFg}>
        <circle cx="50" cy="42" r="22" />
        <path d="M6 120c0-30 20-44 44-44s44 14 44 44z" />
      </svg>
    </div>
  );
}
