import { ImageResponse } from "next/og";

export const alt = "Fabio Zanetti - Ingegneria Informatica @ Bologna";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090a0f",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(99, 102, 241, 0.25) 0%, transparent 60%), radial-gradient(circle at 80% 85%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              border: "1.5px solid rgba(99, 102, 241, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 800,
              color: "#818cf8",
            }}
          >
            FZ
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#a1a1aa",
              letterSpacing: "-0.01em",
            }}
          >
            fabiozanetti.it
          </span>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              fontSize: "14px",
              fontWeight: 600,
              color: "#34d399",
            }}
          >
            Disponibile per collaborazione
          </div>
        </div>

        {/* Center Main Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Fabio Zanetti
          </h1>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#a5b4fc",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Studente al 2° anno di Ingegneria Informatica @ UniBo
          </p>
          <p
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              margin: 0,
              maxWidth: "850px",
              lineHeight: 1.5,
            }}
          >
            Sviluppo software, sistemi, algoritmi e backend. Esami di eccellenza in C (30 e Lode) e Java (30).
          </p>
        </div>

        {/* Bottom Skill Tags */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          {["C (30 e Lode)", "Java (30)", "Python", "Algoritmi & Memory Leak", "Git & Linux", "Bologna"].map(
            (tag, idx) => (
              <div
                key={idx}
                style={{
                  padding: "8px 18px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(39, 39, 42, 0.8)",
                  border: "1px solid rgba(63, 63, 70, 0.7)",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#e4e4e7",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
