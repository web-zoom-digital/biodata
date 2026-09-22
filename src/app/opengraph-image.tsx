import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: siteConfig.brand.primaryDark, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: siteConfig.brand.primaryDark, fontSize: 40 }}>B</div>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.08, fontWeight: 700, maxWidth: 900 }}>Create a marriage biodata in minutes</div>
          <div style={{ fontSize: 32, opacity: 0.85 }}>Free. No signup. PDF, PNG and JPEG.</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Templates", "Live A4 preview", "Works on mobile"].map((t) => (
            <div key={t} style={{ padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.16)", fontSize: 26 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
