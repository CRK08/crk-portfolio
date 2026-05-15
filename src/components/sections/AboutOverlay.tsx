"use client";
import { useRef, useEffect, useState } from "react";
import { OverlayCard } from "@/components/ui/OverlayCard";

interface AboutOverlayProps { visible: boolean; }

const STATS = [
  { icon: "🎓", value: "8.4", label: "CGPA" },
  { icon: "🚀", value: "2", label: "Live Products" },
  { icon: "📰", value: "1", label: "Publication" },
  { icon: "🏆", value: "Top", label: "Hackathon" },
];

export default function AboutOverlay({ visible }: AboutOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setOverflow(el.scrollHeight > el.clientHeight + 2);
  }, [visible]);

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -80, behavior: "smooth" });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 80, behavior: "smooth" });

  return (
    <OverlayCard visible={visible} side="left" transition="0.5s" cardClass="village-card-warm">
      {/* Badge */}
      <span className="section-badge">About Me</span>

      {/* Heading */}
      <h2 className="heading-card" style={{ marginBottom: "0.65rem" }}>
        The Developer Behind the Village
      </h2>

      {/* Scrollable content */}
      <div ref={scrollRef} style={{ overflow: "hidden", maxHeight: "calc(100vh - 19rem)" }}>
        <p className="body-text" style={{ fontSize: "0.82rem", marginBottom: "0.9rem" }}>
          I&apos;m Kaviyarasan C, a pre-final year CSE student from Coimbatore,
          Tamil Nadu. I don&apos;t just learn technology — I ship it. Smart
          Uzhavar helps farmers make AI-powered decisions. Travid helps
          visually impaired users navigate with voice.
        </p>

        {/* 2×2 stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              borderRadius: "5px",
              padding: "3px",
              textAlign: "center",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(200,168,75,0.15)",
            }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{s.icon}</div>
              <div style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--primary)",
                lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(245,240,224,0.5)",
                marginTop: "4px",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-right overflow arrows */}
      {overflow && (
        <div style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          display: "flex",
          flexDirection: "row",
          gap: "4px",
        }}>
          {[{ label: "▲", fn: scrollUp }, { label: "▼", fn: scrollDown }].map(btn => (
            <button key={btn.label} onClick={btn.fn} style={{
              width: "24px", height: "24px",
              borderRadius: "50%",
              border: "1px solid rgba(200,168,75,0.3)",
              background: "rgba(200,168,75,0.08)",
              color: "var(--primary)",
              fontSize: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,168,75,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(200,168,75,0.08)")}
            >{btn.label}</button>
          ))}
        </div>
      )}
    </OverlayCard>
  );
}
