"use client";
import { useState } from "react";
import { OverlayCard } from "@/components/ui/OverlayCard";

interface ProjectsOverlayProps { visible: boolean; }

const PROJECTS = [
  {
    emoji: "🌾",
    title: "Smart Uzhavar",
    description: "Full-stack AI farming advisory system for small & marginal farmers. Real-time Mandi prices, AI chatbot, community forum, and crop tracker.",
    tags: ["Next.js", "TypeScript", "Gemini AI", "PostgreSQL", "Prisma", "NextAuth"],
    status: "🟢 LIVE ON VERCEL",
    statusColor: "#4a8c2a",
    links: [
      { label: "Live Demo →", href: "https://smart-uzhavar.vercel.app/", primary: true },
      { label: "GitHub",      href: "https://github.com/CRK08/Smart-Uzhavar.git", primary: false },
    ],
  },
  {
    emoji: "✈️",
    title: "Travid",
    description: "Accessibility-first AI travel assistant for blind & visually impaired users. Voice navigation, haptic feedback, voice biometric security. Published in IJSREM journal.",
    tags: ["Flutter", "Gemini 2.5 Flash", "Firebase", "Riverpod", "OpenStreetMap"],
    status: "📱 APK v1.0.0 · 📰 Journal Published",
    statusColor: "#c8a84b",
    links: [
      { label: "Download APK →", href: "https://github.com/CRK08/Travid---app/releases/download/v1.0.0/app-arm64-v8a-release.apk", primary: true },
      { label: "GitHub",         href: "https://github.com/CRK08", primary: false },
    ],
  },
];

const btnStyle = (disabled: boolean): React.CSSProperties => ({
  width: "24px", height: "24px", borderRadius: "50%",
  border: "1px solid rgba(200,168,75,0.3)",
  background: disabled ? "rgba(200,168,75,0.03)" : "rgba(200,168,75,0.08)",
  color: disabled ? "rgba(200,168,75,0.25)" : "var(--primary)",
  fontSize: "10px", cursor: disabled ? "not-allowed" : "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "background 0.2s",
});

export default function ProjectsOverlay({ visible }: ProjectsOverlayProps) {
  const [index, setIndex] = useState(0);
  const p = PROJECTS[index];

  return (
    <OverlayCard visible={visible} side="left" width="min(460px, 90vw)" transition="1s">
      {/* Badge row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <span className="section-badge" style={{ marginBottom: 0 }}>Projects</span>
        <span style={{ fontSize: "0.65rem", color: "rgba(245,240,224,0.4)" }}>
          {index + 1} / {PROJECTS.length}
        </span>
      </div>

      <h2 className="heading-card" style={{ marginBottom: "0.85rem" }}>
        {p.emoji} {p.title}
      </h2>

      {/* Description */}
      <p className="body-text-sm" style={{ marginBottom: "0.75rem" }}>
        {p.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.65rem" }}>
        {p.tags.map(t => (
          <span key={t} style={{
            padding: "0.18rem 0.55rem", borderRadius: "9999px",
            fontSize: "0.65rem", background: "rgba(200,168,75,0.1)",
            color: "var(--foreground)", border: "1px solid rgba(200,168,75,0.18)",
          }}>{t}</span>
        ))}
      </div>

      {/* Status */}
      <p style={{ fontSize: "0.7rem", color: p.statusColor, fontWeight: 700, marginBottom: "0.7rem" }}>
        {p.status}
      </p>

      {/* Links */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {p.links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
            padding: "0.35rem 0.9rem", borderRadius: "9999px",
            fontSize: "0.7rem", fontWeight: 600, textDecoration: "none",
            transition: "transform 0.2s",
            ...(l.primary
              ? { background: "linear-gradient(135deg,var(--primary),#d4a535)", color: "#0d0a00" }
              : { border: "1px solid rgba(200,168,75,0.25)", color: "var(--foreground)", background: "rgba(13,10,0,0.4)" }),
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >{l.label}</a>
        ))}
      </div>

      {/* Bottom-right pagination arrows */}
      <div style={{ position: "absolute", bottom: "12px", right: "12px", display: "flex", gap: "4px" }}>
        <button onClick={() => setIndex(i => Math.max(0, i-1))} disabled={index === 0}
          style={btnStyle(index === 0)}
          onMouseEnter={e => { if (index > 0) e.currentTarget.style.background = "rgba(200,168,75,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = index === 0 ? "rgba(200,168,75,0.03)" : "rgba(200,168,75,0.08)"; }}
        >▲</button>
        <button onClick={() => setIndex(i => Math.min(PROJECTS.length-1, i+1))} disabled={index === PROJECTS.length-1}
          style={btnStyle(index === PROJECTS.length-1)}
          onMouseEnter={e => { if (index < PROJECTS.length-1) e.currentTarget.style.background = "rgba(200,168,75,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = index === PROJECTS.length-1 ? "rgba(200,168,75,0.03)" : "rgba(200,168,75,0.08)"; }}
        >▼</button>
      </div>
    </OverlayCard>
  );
}
