import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { royalPalette, royalSection } from "./styles";

function Corner({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true" style={{ position: "absolute", ...style }} fill="none" stroke={color} strokeWidth="1.4">
      <path d="M2 52V14C2 7 7 2 14 2h38" />
      <path d="M10 52V22c0-6 6-12 12-12h30" opacity=".55" />
      <path d="M2 2l12 12" />
      <circle cx="14" cy="14" r="3" fill={color} stroke="none" />
    </svg>
  );
}

export function RoyalHeritage({ model, settings }: TemplateProps) {
  const p = royalPalette(settings.accent);
  const styles = royalSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const [left, right] = balanceColumns(omit(model.sections, ["about", "expectations"]), 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "absolute", inset: 18, border: `1.5px solid ${p.gold}`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 24, border: `0.75px solid ${p.goldSoft}`, pointerEvents: "none" }} />
      <Corner color={p.gold} style={{ top: 14, left: 14 }} />
      <Corner color={p.gold} style={{ top: 14, right: 14, transform: "scaleX(-1)" }} />
      <Corner color={p.gold} style={{ bottom: 14, left: 14, transform: "scaleY(-1)" }} />
      <Corner color={p.gold} style={{ bottom: 14, right: 14, transform: "scale(-1,-1)" }} />

      <div style={{ padding: "34px 60px 34px", position: "relative" }}>
        <header style={{ textAlign: "center", marginBottom: 10 }}>
          {model.blessing || model.godSymbol ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 14, color: p.gold, marginBottom: 6 }}>
              {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={28} /> : null}
              {model.blessing ? <span>{model.blessing}</span> : null}
            </div>
          ) : null}
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, letterSpacing: "0.22em", color: p.muted, marginBottom: 8 }}>MARRIAGE BIO-DATA</div>
          {hasPhoto ? (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <TemplatePhoto
                src={model.photo}
                width={98}
                height={124}
                radius="999px 999px 10px 10px"
                border={`3px solid ${p.gold}`}
                boxShadow={`0 0 0 4px ${p.page}, 0 0 0 5.5px ${p.goldSoft}`}
                showPlaceholder={settings.showPhotoPlaceholder}
                placeholderBg={p.card}
                placeholderFg={p.accent}
              />
            </div>
          ) : null}
          <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 600, color: p.deep, lineHeight: 1.15, overflowWrap: "anywhere" }}>
            {model.name || "Your Full Name"}
          </h1>
          {model.subtitle ? <p style={{ margin: "6px 0 0", fontStyle: "italic", color: p.muted, fontSize: 14 }}>{model.subtitle}</p> : null}
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 32, alignItems: "start" }}>
          {[left, right].map((col, i) => (
            <div key={i} style={{ minWidth: 0 }}>
              {col.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </div>
          ))}
        </div>
        {wide.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: wide.length > 1 ? "1fr 1fr" : "1fr", columnGap: 32, marginTop: 2 }}>
            {wide.map((s) => (
              <TemplateSection key={s.key} section={s} styles={styles} />
            ))}
          </div>
        ) : null}
        <TemplateTrademark color={p.gold} />
      </div>
    </TemplateShell>
  );
}
