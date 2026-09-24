import type { CSSProperties } from "react";
import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { rosePalette, roseSection } from "./styles";

function Floral({ color, style }: { color: string; style: CSSProperties }) {
  return (
    <svg width="230" height="230" viewBox="0 0 230 230" aria-hidden="true" style={{ position: "absolute", pointerEvents: "none", ...style }} fill="none">
      <path d="M0 8C60 14 120 40 150 96s40 90 50 134" stroke={color} strokeWidth="1.6" opacity=".55" />
      <path d="M0 40C40 48 84 68 108 106" stroke={color} strokeWidth="1.2" opacity=".4" />
      {[
        [58, 22, 0], [98, 44, 25], [128, 78, 45], [148, 118, 70], [162, 160, 80],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse cx="0" cy="-11" rx="6" ry="12" fill={color} opacity=".32" />
          <ellipse cx="0" cy="11" rx="6" ry="12" fill={color} opacity=".22" />
        </g>
      ))}
      {[[24, 12], [80, 34], [118, 66], [140, 104]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={color} opacity=".55" />
      ))}
    </svg>
  );
}

export function ElegantRose({ model, settings }: TemplateProps) {
  const p = rosePalette(settings.accent);
  const styles = roseSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const [left, right] = balanceColumns(omit(model.sections, ["about", "expectations"]), 2);
  const wide = pick(model.sections, ["about", "expectations"]);
  const card: CSSProperties = { background: p.card, border: `1px solid ${p.border}`, borderRadius: 14, padding: "8px 15px 7px", marginBottom: 9 };

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <Floral color={p.accent} style={{ top: 0, left: 0 }} />
      <Floral color={p.accent} style={{ bottom: 0, right: 0, transform: "rotate(180deg)" }} />
      <div style={{ padding: "30px 46px 28px", position: "relative" }}>
        <header style={{ textAlign: "center", marginBottom: 14 }}>
          {model.blessing || model.godSymbol ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 13.5, color: p.accent, marginBottom: 8 }}>
              {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={28} /> : null}
              {model.blessing ? <span>{model.blessing}</span> : null}
            </div>
          ) : null}
          {hasPhoto ? (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <TemplatePhoto
                src={model.photo}
                width={96}
                height={96}
                radius="50%"
                border={`3px solid ${p.card}`}
                boxShadow={`0 0 0 2px ${p.accent}, 0 8px 20px ${p.border}`}
                showPlaceholder={settings.showPhotoPlaceholder}
                placeholderBg={p.card}
                placeholderFg={p.accent}
              />
            </div>
          ) : null}
          <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 32, lineHeight: 1.12, color: p.deep, overflowWrap: "anywhere" }}>
            {model.name || "Your Full Name"}
          </h1>
          {model.subtitle ? <p style={{ margin: "6px 0 0", color: p.muted, fontSize: 13.5 }}>{model.subtitle}</p> : null}
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 14, alignItems: "start" }}>
          {[left, right].map((col, i) => (
            <div key={i} style={{ minWidth: 0 }}>
              {col.map((s) => (
                <div key={s.key} style={card}>
                  <TemplateSection section={s} styles={styles} />
                </div>
              ))}
            </div>
          ))}
        </div>
        {wide.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: wide.length > 1 ? "1fr 1fr" : "1fr", columnGap: 14, alignItems: "start" }}>
            {wide.map((s) => (
              <div key={s.key} style={card}>
                <TemplateSection section={s} styles={styles} />
              </div>
            ))}
          </div>
        ) : null}
        <TemplateTrademark color={p.accent} />
      </div>
    </TemplateShell>
  );
}
