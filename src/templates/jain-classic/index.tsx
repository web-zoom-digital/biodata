import type { TemplateProps } from "@/types/template";
import { GOD_SYMBOLS } from "@/data/god-symbols";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { jainPalette, jainSection } from "./styles";

/* SVG Purple Floral Corner Flourish matching reference image */
function PurpleFloralFlourish({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <svg
      width="170"
      height="170"
      viewBox="0 0 170 170"
      fill="none"
      style={{
        position: "absolute",
        top: isTop ? 0 : "auto",
        bottom: !isTop ? 0 : "auto",
        left: isLeft ? 0 : "auto",
        right: !isLeft ? 0 : "auto",
        transform: `${!isLeft ? "scaleX(-1)" : ""} ${!isTop ? "scaleY(-1)" : ""}`,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.85,
      }}
    >
      {/* Decorative Purple Leaf Vines */}
      <path d="M 0 0 C 40 10, 80 40, 150 15 C 90 40, 60 70, 0 0 Z" fill="#7e22ce" opacity="0.75" />
      <path d="M 0 0 C 10 40, 40 80, 15 150 C 40 90, 70 60, 0 0 Z" fill="#7e22ce" opacity="0.75" />
      <path d="M 20 60 C 40 80, 70 110, 130 90 C 80 95, 50 85, 20 60 Z" fill="#a855f7" opacity="0.6" />
      <path d="M 60 20 C 80 40, 110 70, 90 130 C 95 80, 85 50, 60 20 Z" fill="#a855f7" opacity="0.6" />
      <circle cx="120" cy="40" r="6" fill="#6b21a8" />
      <circle cx="40" cy="120" r="6" fill="#6b21a8" />
      <circle cx="80" cy="80" r="8" fill="#7e22ce" />
    </svg>
  );
}

export function JainClassic({ model, settings }: TemplateProps) {
  const p = jainPalette(settings.accent);
  const styles = jainSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const columnSections = omit(model.sections, ["about", "expectations"]);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  // Fallback Jain symbol if user hasn't selected any specific god symbol
  const jainSymbolDefault = GOD_SYMBOLS.find((s) => s.id.includes("jain")) || GOD_SYMBOLS[0];
  const activeSymbol = model.godSymbol || jainSymbolDefault;

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "relative", minHeight: "100%", padding: "30px 40px", display: "flex", flexDirection: "column" }}>
        {/* Four Purple Corner Flourishes */}
        <PurpleFloralFlourish position="top-left" />
        <PurpleFloralFlourish position="top-right" />
        <PurpleFloralFlourish position="bottom-left" />
        <PurpleFloralFlourish position="bottom-right" />

        {/* Content Box */}
        <div style={{ position: "relative", zIndex: 3, flex: 1 }}>
          {/* Header Center */}
          <header style={{ textAlign: "center", marginBottom: 24 }}>
            {/* God Symbol Center */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              <TemplateGodSymbol symbol={activeSymbol} size={42} />
            </div>

            {/* Blessing Line */}
            <div style={{ fontSize: 14, fontWeight: 700, color: p.accent, letterSpacing: "0.04em", marginBottom: 4 }}>
              {model.blessing || "|| ॐ नमः सिद्धेभ्यः ||"}
            </div>

            {/* Title */}
            <h1 style={{ margin: "4px 0 0", fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 700, color: p.accent }}>
              Marriage Biodata
            </h1>
            <div style={{ width: 80, height: 3, background: p.accent, margin: "8px auto 0", borderRadius: 2 }} />

            {model.name ? (
              <h2 style={{ margin: "10px 0 0", fontSize: 20, fontWeight: 700, color: "#1c1917" }}>
                {model.name}
              </h2>
            ) : null}
            {model.subtitle ? <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>{model.subtitle}</p> : null}
          </header>

          {/* Details Layout & Photo */}
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
                  radius="16px"
                  border={`2px solid #cbd5e1`}
                  boxShadow="0 6px 18px rgba(0, 0, 0, 0.12)"
                  showPlaceholder={settings.showPhotoPlaceholder}
                  placeholderBg={p.soft}
                  placeholderFg={p.accent}
                />
              </div>
            ) : null}
          </div>
          <TemplateTrademark color={p.accent} />
        </div>
      </div>
    </TemplateShell>
  );
}
