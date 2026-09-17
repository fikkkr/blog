import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#10b981",
          borderRadius: "6px",
          border: "1px solid #27272a",
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      >
        f
      </div>
    ),
    {
      ...size,
    }
  );
}
