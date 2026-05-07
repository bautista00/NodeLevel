import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Corner accent — top left */}
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 3,
            width: 6,
            height: 6,
            borderTop: "1.5px solid #c6ff3d",
            borderLeft: "1.5px solid #c6ff3d",
          }}
        />
        {/* Corner accent — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 3,
            right: 3,
            width: 6,
            height: 6,
            borderBottom: "1.5px solid #c6ff3d",
            borderRight: "1.5px solid #c6ff3d",
          }}
        />
        {/* N letter */}
        <div
          style={{
            color: "#c6ff3d",
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          N
        </div>
        {/* Node dot */}
        <div
          style={{
            position: "absolute",
            bottom: 5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#c6ff3d",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
