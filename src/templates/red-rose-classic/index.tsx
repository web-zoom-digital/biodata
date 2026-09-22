import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { redRosePalette, redRoseSection } from "./styles";

/* Full-width Red Rose Header Garland SVG */
function RedRoseHeaderGarland() {
  return (
    <svg width="100%" height="90" viewBox="0 0 800 90" preserveAspectRatio="none" fill="none">
      {/* Background Floral Clusters */}
      <circle cx="100" cy="15" r="28" fill="#e11d48" opacity="0.8" />
      <circle cx="140" cy="25" r="22" fill="#fda4af" opacity="0.85" />
      <circle cx="200" cy="12" r="32" fill="#be123c" opacity="0.8" />
      <circle cx="260" cy="20" r="24" fill="#f43f5e" opacity="0.85" />
      <circle cx="320" cy="15" r="20" fill="#fecdd3" opacity="0.9" />

      <circle cx="480" cy="15" r="20" fill="#fecdd3" opacity="0.9" />
      <circle cx="540" cy="20" r="24" fill="#f43f5e" opacity="0.85" />
      <circle cx="600" cy="12" r="32" fill="#be123c" opacity="0.8" />
      <circle cx="660" cy="25" r="22" fill="#fda4af" opacity="0.85" />
      <circle cx="700" cy="15" r="28" fill="#e11d48" opacity="0.8" />

      {/* Decorative Leaves */}
      <path d="M 50 30 Q 120 40 180 20" stroke="#65a30d" strokeWidth="3" fill="none" />
      <path d="M 620 20 Q 680 40 750 30" stroke="#65a30d" strokeWidth="3" fill="none" />
    </svg>
  );
}

/* Full-width Red Rose Footer Garland SVG */
function RedRoseFooterGarland() {
  return (
    <svg width="100%" height="80" viewBox="0 0 800 80" preserveAspectRatio="none" fill="none">
      <circle cx="80" cy="65" r="25" fill="#e11d48" opacity="0.8" />
      <circle cx="150" cy="60" r="30" fill="#be123c" opacity="0.8" />
      <circle cx="240" cy="68" r="22" fill="#f43f5e" opacity="0.85" />
      <circle cx="560" cy="68" r="22" fill="#f43f5e" opacity="0.85" />
      <circle cx="650" cy="60" r="30" fill="#be123c" opacity="0.8" />
      <circle cx="720" cy="65" r="25" fill="#e11d48" opacity="0.8" />
      <path d="M 30 50 Q 200 65 380 50" stroke="#65a30d" strokeWidth="2.5" fill="none" />
      <path d="M 420 50 Q 600 65 770 50" stroke="#65a30d" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function RedRoseClassic({ model, settings }: TemplateProps) {
  const p = redRosePalette(settings.accent);
  const styles = redRoseSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const columnSections = omit(model.sections, ["about", "expectations"]);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        {/* Top Rose Header Banner */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}>
          <RedRoseHeaderGarland />
        </div>

        {/* Side Golden Pillars */}
        <div style={{ position: "absolute", top: 80, bottom: 80, left: 24, width: 2, background: p.gold, zIndex: 2 }} />
        <div style={{ position: "absolute", top: 80, bottom: 80, right: 24, width: 2, background: p.gold, zIndex: 2 }} />

        {/* Content Container */}
        <div style={{ position: "relative", zIndex: 3, padding: "70px 42px 60px", flex: 1 }}>
          {/* Header Center */}
          <header style={{ textAlign: "center", marginBottom: 24, borderBottom: `1px solid ${p.border}`, paddingBottom: 16 }}>
            {model.godSymbol ? (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                <TemplateGodSymbol symbol={model.godSymbol} size={42} />
              </div>
            ) : null}
            <div style={{ fontSize: 13, fontWeight: 700, color: p.gold, letterSpacing: "0.06em", marginBottom: 4 }}>
              {model.blessing || "|| Shree Ganeshay Namah ||"}
            </div>
            <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 700, color: p.accent }}>
              {model.name || "Your Full Name"}
            </h1>
            {model.subtitle ? <p style={{ margin: "4px 0 0", fontSize: 13, color: "#57534e" }}>{model.subtitle}</p> : null}
          </header>

          {/* Details & Photo Layout */}
          <div style={{ display: "grid", gridTemplateColumns: hasPhoto ? "1fr 140px" : "1fr", gap: 28, alignItems: "start" }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 28, alignItems: "start" }}>
                {[left, right].map((col, i) => (
                  <div key={i} style={{ minWidth: 0 }}>
                    {col.map((s) => (
                      <TemplateSection key={s.key} section={s} styles={styles} />
                    ))}
                  </div>
                ))}
              </div>

              {wide.length > 0 ? (
                <div style={{ marginTop: 8 }}>
                  {wide.map((s) => (
                    <div key={s.key} style={{ background: p.soft, borderRadius: 10, padding: "12px 16px 4px", marginBottom: 12 }}>
                      <TemplateSection section={s} styles={styles} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {hasPhoto ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TemplatePhoto
                  src={model.photo}
                  width={130}
                  height={160}
                  radius="12px"
                  border={`3px solid ${p.accent}`}
                  boxShadow="0 6px 18px rgba(190, 18, 60, 0.18)"
                  showPlaceholder={settings.showPhotoPlaceholder}
                  placeholderBg={p.soft}
                  placeholderFg={p.accent}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom Rose Footer Banner */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "auto" }}>
          <RedRoseFooterGarland />
        </div>
      </div>
    </TemplateShell>
  );
}
