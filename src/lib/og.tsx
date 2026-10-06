import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

interface OgCardInput {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags: string[];
}

/**
 * Brand-coloured social card for case study pages. The home page card
 * (app/opengraph-image.jpg) is the same design with the portrait, exported to
 * JPEG because a photo inside a PNG card exceeds WhatsApp's preview size limit.
 */
export function renderOgCard({ eyebrow, title, subtitle, tags }: OgCardInput) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "linear-gradient(135deg, #f8fcfd 0%, #dcEEF6 100%)",
        padding: 64,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#83c3de",
              color: "#10303f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            YN
          </div>
          <div style={{ fontSize: 28, color: "#2f6f8a", fontWeight: 600 }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingRight: 24 }}>
          <div
            style={{
              fontSize: title.length > 40 ? 56 : 68,
              fontWeight: 700,
              color: "#10303f",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#3a4a50", lineHeight: 1.35 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {tags.slice(0, 5).map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 22,
                padding: "8px 18px",
                borderRadius: 999,
                background: "#e9eefa",
                color: "#2a5fb0",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>,
    OG_SIZE,
  );
}
