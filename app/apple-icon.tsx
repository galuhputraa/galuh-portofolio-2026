import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon on iOS. Same mark as the favicon, no rounding — iOS masks
 *  it itself, and a pre-rounded square gets clipped twice. */
export default function AppleIcon() {
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
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -6,
          fontFamily: "sans-serif",
        }}
      >
        gw
      </div>
    ),
    size,
  );
}
