import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { ivoryPalette, ivorySection } from "./styles";

export function MinimalIvory({ model, settings }: TemplateProps) {
  const p = ivoryPalette(settings.accent);
  const styles = ivorySection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const [left, right] = balanceColumns(model.sections, 2);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ padding: "44px 56px 40px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 28, paddingBottom: 20, borderBottom: `1.5px solid ${p.ink}`, marginBottom: 20 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            {model.godSymbol || model.blessing ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: p.muted, marginBottom: 10 }}>
                {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={26} /> : null}
                <span>Marriage biodata{model.blessing ? `   ${model.blessing}` : ""}</span>
              </div>
            ) : (
              <div style={{ fontSize: 11.5, color: p.muted, marginBottom: 10 }}>Marriage biodata</div>
            )}
            <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 300, fontSize: 44, lineHeight: 1.04, letterSpacing: "-0.02em", overflowWrap: "anywhere" }}>
              {model.name || "Your Full Name"}
            </h1>
            {model.subtitle ? <p style={{ margin: "12px 0 0", color: p.muted, fontSize: 14 }}>{model.subtitle}</p> : null}
          </div>
          {hasPhoto ? (
            <TemplatePhoto
              src={model.photo}
              width={100}
              height={124}
              radius="2px"
              showPlaceholder={settings.showPhotoPlaceholder}
              placeholderBg={p.faint}
              placeholderFg={p.accent}
            />
          ) : null}
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 44, alignItems: "start" }}>
          {[left, right].map((col, i) => (
            <div key={i} style={{ minWidth: 0 }}>
              {col.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </TemplateShell>
  );
}
