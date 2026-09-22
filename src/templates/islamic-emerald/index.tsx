import type { TemplateProps } from "@/types/template";
import { FONT_DISPLAY } from "../shared/constants";
import { balanceColumns, omit, pick } from "../shared/layout";
import { TemplateGodSymbol } from "../shared/TemplateGodSymbol";
import { TemplatePhoto } from "../shared/TemplatePhoto";
import { TemplateSection } from "../shared/TemplateSection";
import { TemplateShell } from "../shared/TemplateShell";
import { islamicEmeraldPalette, islamicEmeraldSection } from "./styles";

/* SVG Golden Hanging Lanterns & Mosque Arches Header */
function IslamicHeaderArches() {
  return (
    <svg width="100%" height="110" viewBox="0 0 800 110" preserveAspectRatio="none" fill="none">
      {/* Arch Outline Paths */}
      <path d="M 0 0 L 800 0 L 800 40 Q 600 75 400 40 Q 200 75 0 40 Z" fill="#092d30" opacity="0.6" />
      <path d="M 0 0 L 800 0 L 800 30 Q 600 65 400 30 Q 200 65 0 30 Z" stroke="#fbbf24" strokeWidth="2" fill="none" opacity="0.8" />

      {/* Hanging Golden Lantern 1 (Left) */}
      <g transform="translate(180, 0)">
        <line x1="0" y1="0" x2="0" y2="45" stroke="#fbbf24" strokeWidth="1.5" />
        <polygon points="0,45 -10,55 0,70 10,55" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="0" cy="57" r="3" fill="#ffffff" />
      </g>

      {/* Hanging Golden Lantern 2 (Center) */}
      <g transform="translate(400, 0)">
        <line x1="0" y1="0" x2="0" y2="55" stroke="#fbbf24" strokeWidth="1.5" />
        <polygon points="0,55 -12,67 0,85 12,67" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="0" cy="70" r="4" fill="#ffffff" />
      </g>

      {/* Hanging Golden Lantern 3 (Right) */}
      <g transform="translate(620, 0)">
        <line x1="0" y1="0" x2="0" y2="45" stroke="#fbbf24" strokeWidth="1.5" />
        <polygon points="0,45 -10,55 0,70 10,55" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="0" cy="57" r="3" fill="#ffffff" />
      </g>
    </svg>
  );
}

/* SVG Bottom Garden Floral Pattern */
function IslamicBottomGarden() {
  return (
    <svg width="100%" height="70" viewBox="0 0 800 70" preserveAspectRatio="none" fill="none">
      <path d="M 0 70 L 800 70 L 800 30 C 600 45 400 20 200 45 C 100 50 50 35 0 40 Z" fill="#064e3b" opacity="0.7" />
      <g transform="translate(100, 25)">
        <circle cx="0" cy="15" r="10" fill="#fef08a" opacity="0.8" />
        <circle cx="40" cy="10" r="14" fill="#ffffff" opacity="0.8" />
        <circle cx="80" cy="18" r="12" fill="#fef08a" opacity="0.8" />
      </g>

      <g transform="translate(500, 25)">
        <circle cx="0" cy="15" r="10" fill="#fef08a" opacity="0.8" />
        <circle cx="50" cy="10" r="14" fill="#ffffff" opacity="0.8" />
        <circle cx="100" cy="18" r="12" fill="#fef08a" opacity="0.8" />
      </g>
    </svg>
  );
}

export function IslamicEmerald({ model, settings }: TemplateProps) {
  const p = islamicEmeraldPalette(settings.accent);
  const styles = islamicEmeraldSection(p.gold);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;
  const columnSections = omit(model.sections, ["about", "expectations"]);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ["about", "expectations"]);

  return (
    <TemplateShell background={p.page} color={p.ink}>
      <div style={{ position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        {/* Top Mosque Dome Lanterns Header */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}>
          <IslamicHeaderArches />
        </div>

        {/* Content Container */}
        <div style={{ position: "relative", zIndex: 3, padding: "75px 40px 40px", flex: 1 }}>
          {/* Header Center */}
          <header style={{ textAlign: "center", marginBottom: 24, borderBottom: `1px stroke ${p.gold}`, paddingBottom: 16 }}>
            {/* Bismillah Calligraphy Header */}
            <div style={{ fontSize: 22, color: p.gold, fontFamily: "serif", marginBottom: 4 }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            {model.blessing ? (
              <div style={{ fontSize: 13, fontWeight: 700, color: p.gold, letterSpacing: "0.06em", marginBottom: 6 }}>
                {model.blessing}
              </div>
            ) : null}

            {model.godSymbol ? (
              <div style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}>
                <TemplateGodSymbol symbol={model.godSymbol} size={36} />
              </div>
            ) : null}

            <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 700, color: p.gold }}>
              {model.name || "Your Full Name"}
            </h1>
            {model.subtitle ? <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>{model.subtitle}</p> : null}
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
                    <div key={s.key} style={{ background: p.soft, borderRadius: 10, padding: "12px 16px 4px", marginBottom: 12, border: `1px solid ${p.border}` }}>
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
                  border={`3px solid ${p.gold}`}
                  boxShadow="0 6px 18px rgba(0, 0, 0, 0.4)"
                  showPlaceholder={settings.showPhotoPlaceholder}
                  placeholderBg={p.soft}
                  placeholderFg={p.gold}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom Garden Banner */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "auto" }}>
          <IslamicBottomGarden />
        </div>
      </div>
    </TemplateShell>
  );
}
