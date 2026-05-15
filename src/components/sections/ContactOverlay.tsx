"use client";
import { useRef, useEffect, useState } from "react";
import { OverlayCard, ArrowButtons } from "@/components/ui/OverlayCard";

interface ContactOverlayProps { visible: boolean; }

const LINKS = [
  { icon: "📧", label: "crkaviyarasan1029@gmail.com", href: "mailto:crkaviyarasan1029@gmail.com" },
  { icon: "📱", label: "+91 81226 71029", href: "tel:+918122671029" },
  { icon: "💼", label: "linkedin.com/in/kaviyarasan-c-r-18106a2a5", href: "https://linkedin.com/in/kaviyarasan-c-r-18106a2a5" },
  { icon: "🐙", label: "github.com/CRK08", href: "https://github.com/CRK08" },
];

export default function ContactOverlay({ visible }: ContactOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setOverflow(el.scrollHeight > el.clientHeight + 2);
  }, [visible]);

  return (
    <OverlayCard visible={visible} side="center" transition="1s">
      <span className="section-badge" style={{ display: "flex", justifyContent: "center", width: "fit-content", margin: "0 auto 14px" }}>
        Contact
      </span>

      <h2 className="heading-section" style={{ textAlign: "center", marginBottom: "0.25rem" }}>
        Send a Letter 📬
      </h2>

      <p className="tamil-accent" style={{ textAlign: "center", marginBottom: "0.85rem" }}>
        Let&apos;s connect — I reply fast ⚡
      </p>

      <div style={{ height: "1px", background: "rgba(200,168,75,0.15)", marginBottom: "0.85rem" }} />

      <div ref={scrollRef} style={{ overflow: "hidden", maxHeight: "calc(100vh - 22rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.85rem" }}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "0.65rem",
                padding: "0.5rem 0.75rem", borderRadius: "12px",
                background: "rgba(200,168,75,0.05)",
                border: "1px solid rgba(200,168,75,0.15)",
                color: "var(--foreground)", textDecoration: "none",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.background = "rgba(200,168,75,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(200,168,75,0.05)"; }}
            >
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{l.icon}</span>
              <span className="body-text-sm" style={{
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{l.label}</span>
            </a>
          ))}
        </div>

        <p className="tamil-accent" style={{ textAlign: "center", opacity: 0.6, fontSize: "0.85rem" }}>
          Thank you for walking through my village 🌾
        </p>
      </div>

      {overflow && <ArrowButtons scrollRef={scrollRef} />}
    </OverlayCard>
  );
}
