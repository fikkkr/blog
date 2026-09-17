import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Awall — Student Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
          border: "1px solid #27272a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              fontFamily: "monospace",
              color: "#a1a1aa",
            }}
          >
            awall.dev
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Awall
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#a1a1aa",
              margin: 0,
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Student developer learning software through projects, experiments, and debugging.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: "32px",
            fontSize: "20px",
            fontFamily: "monospace",
            color: "#71717a",
          }}
        >
          <span>SMK Marhas Margahayu · XII PPLG 1</span>
          <span style={{ color: "#10b981" }}>● learning by building</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
