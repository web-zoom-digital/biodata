import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { TemplateTrademark } from "../shared/TemplateTrademark";
import { peachPalette, peachSection } from "./styles";

/* SVG Peach Rose Floral Corner Decoration */
function PeachFloralCorner({ position }: { position: "top-left" | "bottom-left" | "bottom-right" }) {
  const isTop = position === "top-left";
  const isLeft = position.endsWith("left");

  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
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
        opacity: 0.9,
      }}
    >
      {/* Green Sage Leaves */}
      <path d="M 20 90 C 10 60, 45 30, 90 25 C 60 45, 40 70, 20 90 Z" fill="#a3e635" opacity="0.35" />
      <path d="M 45 110 C 25 75, 70 45, 115 45 C 80 70, 60 90, 45 110 Z" fill="#84cc16" opacity="0.3" />
      <path d="M 15 135 C 5 100, 40 70, 80 80 C 45 85, 25 105, 15 135 Z" fill="#bef264" opacity="0.4" />

      {/* Peach / Pink Rose Petals */}
      <g transform="translate(50, 50)">
        <circle cx="0" cy="-20" r="16" fill="#fb923c" opacity="0.75" />
        <circle cx="20" cy="0" r="16" fill="#f87171" opacity="0.75" />
        <circle cx="0" cy="20" r="16" fill="#fb923c" opacity="0.75" />
        <circle cx="-20" cy="0" r="16" fill="#f87171" opacity="0.75" />
        <circle cx="14" cy="14" r="14" fill="#fdba74" opacity="0.8" />
        <circle cx="-14" cy="-14" r="14" fill="#fca5a5" opacity="0.8" />
        <circle cx="-14" cy="14" r="14" fill="#fdba74" opacity="0.8" />
        <circle cx="14" cy="-14" r="14" fill="#fca5a5" opacity="0.8" />
        {/* Rose Heart */}
        <circle cx="0" cy="0" r="11" fill="#ea580c" opacity="0.85" />
        <circle cx="0" cy="0" r="6" fill="#fff7ed" />
      </g>

      {/* Secondary Soft Bud */}
      <g transform="translate(125, 35) scale(0.6)">
        <circle cx="0" cy="-15" r="12" fill="#f87171" opacity="0.8" />
        <circle cx="15" cy="0" r="12" fill="#fdba74" opacity="0.8" />
        <circle cx="0" cy="15" r="12" fill="#f87171" opacity="0.8" />
        <circle cx="-15" cy="0" r="12" fill="#fdba74" opacity="0.8" />
        <circle cx="0" cy="0" r="7" fill="#c2410c" />
      </g>
    </svg>
  );
}

export function PeachFloral({ model, settings }: TemplateProps) {
  const p = peachPalette(settings.accent);
  const styles = peachSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const columnSections = omit(model.sections, ["about", "expectations"]);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "relative", minHeight: "100%", padding: "26px 34px" }}>
        {/* Peach Floral Corner Decorations */}
        <PeachFloralCorner position="top-left" />
        <PeachFloralCorner position="bottom-left" />
        <PeachFloralCorner position="bottom-right" />

        {/* Double Border Frame */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            border: `2px solid ${p.accent}`,
            borderRadius: "16px",
            padding: "24px 32px",
            background: "rgba(255, 253, 250, 0.95)",
            boxShadow: "0 4px 20px rgba(234, 88, 12, 0.05)",
          }}
        >
          {/* Header Banner */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `2px solid ${p.border}`,
              paddingBottom: 16,
              marginBottom: 24,
            }}
          >
            {/* Title / Heading */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: p.accent, textTransform: "uppercase" }}>
                Marriage Biodata
              </div>
              <h1 style={{ margin: "4px 0 0", fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 700, color: p.accent }}>
                {model.name || "Your Full Name"}
              </h1>
              {model.subtitle ? <p style={{ margin: "4px 0 0", fontSize: 13, color: "#78716c" }}>{model.subtitle}</p> : null}
            </div>

            {/* God Symbol & Blessing */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {model.godSymbol ? <TemplateGodSymbol symbol={model.godSymbol} size={36} /> : null}
              {model.blessing ? (
                <span style={{ fontSize: 13, fontWeight: 700, color: p.accent, letterSpacing: "0.04em" }}>
                  {model.blessing}
                </span>
              ) : (
                <span style={{ fontSize: 13, fontWeight: 700, color: p.accent, letterSpacing: "0.04em" }}>
                  || Ganeshaya Namah ||
                </span>
              )}
            </div>
          </header>

          {/* Main Content Grid */}
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
                  radius="12px"
                  border={`3px solid ${p.accent}`}
                  boxShadow="0 6px 18px rgba(234, 88, 12, 0.16)"
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
