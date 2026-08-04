import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon: "gw" monogram in Mandiri blue. Generated rather than shipped as an
 * .ico so it stays in sync with the palette. Rendered at 64px because the
 * browser downsamples to 16/32 and a larger source stays crisp.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#003d79",
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -2,
          fontFamily: "sans-serif",
          borderRadius: 14,
        }}
      >
        gw
      </div>
    ),
    size,
  );
}
