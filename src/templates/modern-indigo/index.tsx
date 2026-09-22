import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { SIDEBAR_WIDTH, indigoPalette, mainSection, sidebarSection } from "./styles";

const SIDEBAR_KEYS = ["personal", "contact", "astrology"];

export function ModernIndigo({ model, settings }: TemplateProps) {
  const p = indigoPalette(settings.accent);
  const side = pick(model.sections, SIDEBAR_KEYS);
  const main = omit(model.sections, SIDEBAR_KEYS);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ display: "flex", minHeight: 1123, alignItems: "stretch" }}>
        <aside style={{ width: SIDEBAR_WIDTH, flexShrink: 0, background: p.accent, color: "#fff", padding: "28px 24px 24px", boxSizing: "border-box" }}>
          {hasPhoto ? (
            <div style={{ marginBottom: 20 }}>
              <TemplatePhoto
                src={model.photo}
                width={180}
                height={212}
                radius="20px"
                border="3px solid rgba(255,255,255,0.75)"
                showPlaceholder={settings.showPhotoPlaceholder}
                placeholderBg="rgba(255,255,255,0.16)"
                placeholderFg="rgba(255,255,255,0.7)"
              />
            </div>
          ) : null}
          {side.map((s) => (
            <TemplateSection key={s.key} section={s} styles={sidebarSection()} />
          ))}
        </aside>
        <div style={{ flex: 1, minWidth: 0, padding: "30px 38px 24px 36px" }}>
          <header style={{ marginBottom: 16 }}>
            {model.blessing || model.godSymbol ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: p.muted, marginBottom: 8 }}>
                {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={28} /> : null}
                {model.blessing ? <span>{model.blessing}</span> : null}
              </div>
            ) : null}
            <div style={{ fontSize: 12, color: p.accent, fontWeight: 600, marginBottom: 4 }}>Marriage Biodata</div>
            <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1.08, fontWeight: 650, color: p.deep, overflowWrap: "anywhere" }}>
              {model.name || "Your Full Name"}
            </h1>
            {model.subtitle ? <p style={{ margin: "8px 0 0", color: p.muted, fontSize: 14 }}>{model.subtitle}</p> : null}
          </header>
          {main.map((s) => (
            <TemplateSection key={s.key} section={s} styles={mainSection(settings.accent)} />
          ))}
        </div>
      </div>
    </TemplateShell>
  );
}
