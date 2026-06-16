import { ImageResponse } from "next/og";

// Branded favicon — white "J" on the Jax Studio orange→magenta brand gradient.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #ff5722 0%, #e31fc8 100%)",
          color: "#ffffff",
          fontSize: 24,
          fontWeight: 800,
          borderRadius: 6,
          fontFamily: "sans-serif",
        }}
      >
        J
      </div>
    ),
    size,
  );
}
