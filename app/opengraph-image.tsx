import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, generated at build time in the site's own palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#eef1f6",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#0f6f6a",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {profile.role}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              color: "#1e2a44",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#64748b",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {profile.shortTagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#0f6f6a",
              display: "flex",
            }}
          />
          {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
