import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { islamicIvoryPalette, islamicIvorySection } from "./styles";

/* SVG Green Islamic Mandala Corner Arches */
function IslamicMandalaCorner({ position }: { position: "top-left" | "top-right" }) {
  const isLeft = position === "top-left";
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      style={{
        position: "absolute",
        top: 0,
        left: isLeft ? 0 : "auto",
        right: !isLeft ? 0 : "auto",
        transform: !isLeft ? "scaleX(-1)" : "none",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.45,
      }}
    >
      <circle cx="0" cy="0" r="140" stroke="#047857" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="0" cy="0" r="110" stroke="#059669" strokeWidth="2" fill="none" />
      <circle cx="0" cy="0" r="80" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <g stroke="#047857" strokeWidth="1">
        <path d="M 0 0 L 140 0" />
        <path d="M 0 0 L 120 70" />
        <path d="M 0 0 L 70 120" />
        <path d="M 0 0 L 0 140" />
      </g>
    </svg>
  );
}

/* SVG Bottom Mosque Minarets Silhouette Watermark */
function MosqueMinaretsWatermark() {
  return (
    <svg width="100%" height="160" viewBox="0 0 800 160" preserveAspectRatio="none" fill="none">
      <path
        d="M 0 160 L 800 160 L 800 120 L 750 120 L 750 70 L 735 40 L 720 70 L 720 120 L 650 120 L 620 60 Q 600 30 580 60 L 550 120 L 480 120 L 460 50 Q 400 10 340 50 L 320 120 L 250 120 L 230 60 Q 210 30 190 60 L 160 120 L 90 120 L 90 70 L 75 40 L 60 70 L 60 120 L 0 120 Z"
        fill="#047857"
        opacity="0.08"
      />
    </svg>
  );
}

export function IslamicIvory({ model, settings }: TemplateProps) {
  const p = islamicIvoryPalette(settings.accent);
  const styles = islamicIvorySection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const columnSections = omit(model.sections, ["about", "expectations"]);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        {/* Top Islamic Mandala Corner Arches */}
        <IslamicMandalaCorner position="top-left" />
        <IslamicMandalaCorner position="top-right" />

        {/* Content Container */}
        <div style={{ position: "relative", zIndex: 3, padding: "32px 42px 40px", flex: 1 }}>
          {/* Header Center */}
          <header style={{ textAlign: "center", marginBottom: 24, borderBottom: `2px solid ${p.border}`, paddingBottom: 16 }}>
            {/* Bismillah Calligraphy Header */}
            <div style={{ fontSize: 24, color: p.accent, fontFamily: "serif", marginBottom: 4 }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            {model.blessing ? (
              <div style={{ fontSize: 13, fontWeight: 700, color: p.accent, letterSpacing: "0.06em", marginBottom: 6 }}>
                {model.blessing}
              </div>
            ) : null}

            {model.godSymbol ? (
              <div style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}>
                <TemplateGodSymbol symbol={model.godSymbol} size={36} />
              </div>
            ) : null}

            <h1 style={{ margin: "4px 0 0", fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 700, color: p.accent }}>
              {model.name || "Your Full Name"}
            </h1>
            {model.subtitle ? <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>{model.subtitle}</p> : null}
          </header>

          {/* Details Grid & Photo */}
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
                  boxShadow="0 6px 18px rgba(4, 120, 87, 0.16)"
                  showPlaceholder={settings.showPhotoPlaceholder}
                  placeholderBg={p.soft}
                  placeholderFg={p.accent}
                />
              </div>
            ) : null}
          </div>
          <TemplateTrademark color={p.accent} />
        </div>

        {/* Bottom Mosque Minarets Watermark */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "auto" }}>
          <MosqueMinaretsWatermark />
        </div>
      </div>
    </TemplateShell>
  );
}
