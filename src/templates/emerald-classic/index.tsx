import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { emeraldPalette, emeraldSection } from "./styles";

export function EmeraldClassic({ model, settings }: TemplateProps) {
  const p = emeraldPalette(settings.accent);
  const styles = emeraldSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const columnSections = omit(model.sections, ["about", "expectations"]);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <header style={{ background: p.accent, color: "#fff", padding: "30px 46px 34px", minHeight: 150, position: "relative" }}>
        {model.blessing || model.godSymbol ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: "0.06em", opacity: 0.9, marginBottom: 10 }}>
            {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={28} /> : null}
            {model.blessing ? <span>{model.blessing}</span> : null}
          </div>
        ) : null}
        <div style={{ maxWidth: hasPhoto ? 500 : "100%" }}>
          <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 4 }}>Marriage Biodata</div>
          <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.1, fontWeight: 600, overflowWrap: "anywhere" }}>
            {model.name || "Your Full Name"}
          </h1>
          {model.subtitle ? <p style={{ margin: "8px 0 0", fontSize: 14, opacity: 0.92 }}>{model.subtitle}</p> : null}
        </div>
        {hasPhoto ? (
          <TemplatePhoto
            src={model.photo}
            width={122}
            height={152}
            radius="12px"
            border="4px solid #fff"
            boxShadow="0 8px 22px rgba(0,0,0,0.22)"
            showPlaceholder={settings.showPhotoPlaceholder}
            placeholderBg={p.soft}
            placeholderFg={p.accent}
            style={{ position: "absolute", right: 46, top: 24, zIndex: 2 }}
          />
        ) : null}
      </header>

      <div style={{ padding: `${hasPhoto ? 40 : 26}px 46px 34px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 34, alignItems: "start" }}>
          {[left, right].map((col, i) => (
            <div key={i} style={{ minWidth: 0 }}>
              {col.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </div>
          ))}
        </div>
        {wide.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: wide.length > 1 ? "1fr 1fr" : "1fr", columnGap: 34, marginTop: 4 }}>
            {wide.map((s) => (
              <div key={s.key} style={{ background: p.soft, borderRadius: 10, padding: "12px 16px 2px" }}>
                <TemplateSection section={s} styles={{ ...styles, title: { ...styles.title, borderBottom: "none", paddingBottom: 0 } }} />
              </div>
            ))}
          </div>
        ) : null}
        <TemplateTrademark color={p.accent} />
      </div>
    </TemplateShell>
  );
}
