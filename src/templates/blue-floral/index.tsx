import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { bluePalette, blueSection } from "./styles";

/* SVG Blue Floral Corner Decoration */
function BlueFloralCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
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
      {/* Leaves */}
      <path d="M 20 80 C 10 50, 40 20, 80 20 C 50 40, 30 60, 20 80 Z" fill="#93c5fd" opacity="0.4" />
      <path d="M 40 100 C 20 70, 60 40, 100 40 C 70 60, 50 80, 40 100 Z" fill="#60a5fa" opacity="0.35" />
      <path d="M 10 120 C 5 90, 35 60, 70 70 C 40 75, 20 95, 10 120 Z" fill="#bfdbfe" opacity="0.5" />

      {/* Flower Petals 1 */}
      <g transform="translate(45, 45)">
        <circle cx="0" cy="-18" r="14" fill="#3b82f6" opacity="0.8" />
        <circle cx="18" cy="0" r="14" fill="#60a5fa" opacity="0.8" />
        <circle cx="0" cy="18" r="14" fill="#3b82f6" opacity="0.8" />
        <circle cx="-18" cy="0" r="14" fill="#60a5fa" opacity="0.8" />
        <circle cx="12" cy="12" r="12" fill="#93c5fd" opacity="0.7" />
        <circle cx="-12" cy="-12" r="12" fill="#93c5fd" opacity="0.7" />
        <circle cx="-12" cy="12" r="12" fill="#93c5fd" opacity="0.7" />
        <circle cx="12" cy="-12" r="12" fill="#93c5fd" opacity="0.7" />
        {/* Flower Center */}
        <circle cx="0" cy="0" r="10" fill="#f59e0b" />
        <circle cx="0" cy="0" r="6" fill="#fbbf24" />
      </g>

      {/* Small Secondary Blossom */}
      <g transform="translate(110, 30) scale(0.65)">
        <circle cx="0" cy="-14" r="10" fill="#60a5fa" />
        <circle cx="14" cy="0" r="10" fill="#93c5fd" />
        <circle cx="0" cy="14" r="10" fill="#60a5fa" />
        <circle cx="-14" cy="0" r="10" fill="#93c5fd" />
        <circle cx="0" cy="0" r="7" fill="#f59e0b" />
      </g>

      {/* Small Branch Vines */}
      <path d="M 0 0 C 40 10, 80 30, 140 10" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="3 3" />
      <path d="M 0 0 C 10 40, 30 80, 10 140" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="3 3" />
    </svg>
  );
}

export function BlueFloral({ model, settings }: TemplateProps) {
  const p = bluePalette(settings.accent);
  const styles = blueSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const columnSections = omit(model.sections, ["about", "expectations"]);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "relative", minHeight: "100%", padding: "28px 36px" }}>
        {/* Four Floral Corner Accents */}
        <BlueFloralCorner position="top-left" />
        <BlueFloralCorner position="top-right" />
        <BlueFloralCorner position="bottom-left" />
        <BlueFloralCorner position="bottom-right" />

        {/* Inner Content Border Box */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            border: `2px solid ${p.border}`,
            borderRadius: "16px",
            padding: "24px 32px",
            background: "rgba(255, 255, 255, 0.94)",
            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.06)",
          }}
        >
          {/* Header Banner */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `2px solid ${p.accent}`,
              paddingBottom: 16,
              marginBottom: 24,
            }}
          >
            {/* Title / Heading */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: p.accent, textTransform: "uppercase" }}>
                পরিচয় পত্র / Marriage Biodata
              </div>
              <h1 style={{ margin: "4px 0 0", fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 700, color: "#1e3a8a" }}>
                {model.name || "Your Full Name"}
              </h1>
              {model.subtitle ? <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>{model.subtitle}</p> : null}
            </div>

            {/* God Symbol & Blessing */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={36} /> : null}
              {model.blessing ? (
                <span style={{ fontSize: 12, fontWeight: 700, color: p.accent, letterSpacing: "0.04em" }}>
                  {model.blessing}
                </span>
              ) : (
                <span style={{ fontSize: 12, fontWeight: 700, color: p.accent, letterSpacing: "0.04em" }}>
                  || श्री स्वामी समर्थ ||
                </span>
              )}
            </div>
          </header>

          {/* Main Layout Grid */}
          <div style={{ display: "grid", gridTemplateColumns: hasPhoto ? "1fr 140px" : "1fr", gap: 28, alignItems: "start" }}>
            {/* Details Columns */}
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

            {/* Profile Photo */}
            {hasPhoto ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TemplatePhoto
                  src={model.photo}
                  width={130}
                  height={160}
                  radius="14px"
                  border={`3px solid ${p.accent}`}
                  boxShadow="0 6px 18px rgba(30, 58, 138, 0.18)"
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
