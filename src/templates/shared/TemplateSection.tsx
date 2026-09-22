import type { CSSProperties, ReactNode } from "react";
import type { ResolvedSection } from "@/types/biodata";

export interface SectionStyles {
  wrapper?: CSSProperties;
  title?: CSSProperties;
  row?: CSSProperties;
  label?: CSSProperties;
  value?: CSSProperties;
  text?: CSSProperties;
  /** "inline": label and value side by side. "stacked": label above value. */
  rowLayout?: "inline" | "stacked";
  labelWidth?: number;
  /** Replace the default title element (for ornaments, ribbons, etc.). */
  renderTitle?: (title: string, style?: CSSProperties) => ReactNode;
}

const wrap: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };

/**
 * Generic renderer for any section. Templates control the look through `styles`.
 * Leaf elements carry `data-block` so the exporter can avoid cutting through them when splitting pages.
 */
export function TemplateSection({ section, styles = {} }: { section: ResolvedSection; styles?: SectionStyles }) {
  const { rowLayout = "inline", labelWidth = 128 } = styles;
  return (
    <section style={{ marginBottom: 13, ...styles.wrapper }}>
      <div data-block="title" style={{ marginBottom: 6 }}>
        {styles.renderTitle ? (
          styles.renderTitle(section.title, styles.title)
        ) : (
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, ...styles.title }}>{section.title}</h3>
        )}
      </div>
      {section.rows.map((row, i) => (
        <div
          key={`${row.label}-${i}`}
          data-block="row"
          style={{
            display: "flex",
            flexDirection: rowLayout === "inline" ? "row" : "column",
            gap: rowLayout === "inline" ? 8 : 0,
            padding: "2px 0",
            ...styles.row,
          }}
        >
          <span
            style={{
              flex: rowLayout === "inline" ? `0 0 ${labelWidth}px` : undefined,
              fontSize: 11.5,
              ...wrap,
              ...styles.label,
            }}
          >
            {row.label}
          </span>
          <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: 500, ...wrap, ...styles.value }}>{row.value}</span>
        </div>
      ))}
      {section.text ? (
        <p data-block="text" style={{ margin: 0, fontSize: 12.5, whiteSpace: "pre-line", ...wrap, ...styles.text }}>
          {section.text}
        </p>
      ) : null}
    </section>
  );
}
