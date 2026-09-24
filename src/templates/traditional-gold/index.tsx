import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { goldPalette, goldSection } from "./styles";

function PatternBand({ color, id }: { color: string; id: string }) {
  return (
    <svg width="100%" height="16" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <pattern id={id} width="22" height="16" patternUnits="userSpaceOnUse">
          <path d="M11 2l7 6-7 6-7-6z" fill="none" stroke={color} strokeWidth="1.2" />
          <circle cx="11" cy="8" r="1.6" fill={color} />
          <path d="M0 8h3M19 8h3" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="16" fill={`url(#${id})`} />
    </svg>
  );
}

export function TraditionalGold({ model, settings }: TemplateProps) {
  const p = goldPalette(settings.accent);
  const styles = goldSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const [left, right] = balanceColumns(omit(model.sections, ["about", "expectations"]), 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "absolute", inset: 0, border: `10px solid ${p.accent}`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 10, border: `1px solid ${p.line}`, pointerEvents: "none" }} />
      <div style={{ padding: "22px 40px 24px", position: "relative" }}>
        <PatternBand color={p.accent} id="gold-band-top" />
        <header style={{ display: "flex", gap: 26, alignItems: "center", padding: "14px 4px 14px" }}>
          {hasPhoto ? (
            <TemplatePhoto
              src={model.photo}
              width={104}
              height={130}
              radius="4px"
              border={`3px double ${p.accent}`}
              boxShadow={`0 0 0 4px ${p.page}, 0 0 0 5px ${p.line}`}
              showPlaceholder={settings.showPhotoPlaceholder}
              placeholderBg={p.labelBg}
              placeholderFg={p.accent}
            />
          ) : null}
          <div style={{ flex: 1, minWidth: 0 }}>
            {model.blessing || model.godSymbol ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: FONT_DISPLAY, fontStyle: "italic", color: p.accent, fontSize: 14, marginBottom: 6 }}>
                {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={28} /> : null}
                {model.blessing ? <span>{model.blessing}</span> : null}
              </div>
            ) : null}
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: p.muted, marginBottom: 6 }}>Marriage Bio-Data</div>
            <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 35, lineHeight: 1.1, fontWeight: 650, color: p.deep, overflowWrap: "anywhere" }}>
              {model.name || "Your Full Name"}
            </h1>
            {model.subtitle ? <p style={{ margin: "8px 0 0", color: p.muted, fontSize: 14 }}>{model.subtitle}</p> : null}
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 26, alignItems: "start" }}>
          {[left, right].map((col, i) => (
            <div key={i} style={{ minWidth: 0 }}>
              {col.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </div>
          ))}
        </div>
        {wide.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: wide.length > 1 ? "1fr 1fr" : "1fr", columnGap: 26 }}>
            {wide.map((s) => (
              <TemplateSection key={s.key} section={s} styles={styles} />
            ))}
          </div>
        ) : null}
        <div style={{ marginTop: 10 }}>
          <PatternBand color={p.accent} id="gold-band-bottom" />
        </div>
        <TemplateTrademark color={p.accent} />
      </div>
    </TemplateShell>
  );
}
