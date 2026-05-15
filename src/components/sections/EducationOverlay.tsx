"use client";
import { useState } from "react";
import { OverlayCard } from "@/components/ui/OverlayCard";

interface EducationOverlayProps { visible: boolean; }

const TIMELINE = [
  { emoji: "🎓", title: "BE — Computer Science & Engineering",     subtitle: "Hindusthan College of Engineering & Technology, Coimbatore", detail: "CGPA: 8.4 · 2022–Present", accent: true },
  { emoji: "📰", title: "Journal Publication — IJSREM",            subtitle: "Inclusive Mobility for Normal & Blind Users (Travid)",       detail: "November 2025",             accent: false },
  { emoji: "🏆", title: "Uyir Hackathon — Final Round Runner-Up",  subtitle: "",                                                           detail: "",                          accent: false },
  { emoji: "⚙️", title: "Department Hackathon — Internal Selection", subtitle: "",                                                         detail: "",                          accent: false },
  { emoji: "📜", title: "NPTEL Certifications",                    subtitle: "Cloud Computing · Cyber Security & Privacy",                 detail: "",                          accent: false },
  { emoji: "👑", title: "Event Coordinator — Paper Presentation",  subtitle: "30+ teams, 60–120 participants",                            detail: "",                          accent: false },
  { emoji: "📚", title: "HSC — Thanthai Roever HSS, Perambalur",  subtitle: "",                                                           detail: "86%",                        accent: false },
];

const PAGE_SIZE = 3;

function TimelineItem({ item, isLast }: { item: typeof TIMELINE[0]; isLast: boolean }) {
  return (
    <div style={{ display: "flex", gap: "0", marginBottom: isLast ? 0 : "16px" }}>
      {/* Left: dot + connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "18px", flexShrink: 0, marginTop: "3px" }}>
        {/* Dot */}
        <div style={{
          width: item.accent ? "9px" : "7px",
          height: item.accent ? "9px" : "7px",
          borderRadius: "50%",
          background: item.accent ? "var(--primary)" : "transparent",
          border: `2px solid ${item.accent ? "var(--primary)" : "rgba(210,165,80,0.45)"}`,
          boxShadow: item.accent ? "0 0 8px rgba(210,165,80,0.5)" : "none",
          flexShrink: 0,
        }} />
        {/* Connector */}
        {!isLast && (
          <div style={{
            width: "2px",
            flex: 1,
            minHeight: "24px",
            background: "rgba(200,168,75,0.2)",
            marginTop: "4px",
          }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{ paddingLeft: "14px", flex: 1 }}>
        <p style={{
          fontSize: "0.82rem",
          fontWeight: 700,
          color: "var(--foreground)",
          lineHeight: 1.3,
        }}>{item.emoji} {item.title}</p>

        {item.subtitle && (
          <p style={{
            fontSize: "0.72rem",
            color: "rgba(245,240,224,0.55)",
            marginTop: "2px",
            lineHeight: 1.5,
          }}>{item.subtitle}</p>
        )}

        {item.detail && (
          <span style={{
            display: "inline-block",
            marginTop: "4px",
            fontSize: "0.62rem",
            fontWeight: 700,
            color: "var(--primary)",
            background: "rgba(200,168,75,0.1)",
            padding: "2px 8px",
            borderRadius: "10px",
          }}>{item.detail}</span>
        )}
      </div>
    </div>
  );
}

export default function EducationOverlay({ visible }: EducationOverlayProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(TIMELINE.length / PAGE_SIZE);
  const items = TIMELINE.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: "24px", height: "24px",
    borderRadius: "50%",
    border: "1px solid rgba(200,168,75,0.3)",
    background: disabled ? "rgba(200,168,75,0.03)" : "rgba(200,168,75,0.08)",
    color: disabled ? "rgba(200,168,75,0.25)" : "var(--primary)",
    fontSize: "10px",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  });

  return (
    <OverlayCard visible={visible} side="right" transition="1s">
      {/* Badge + page number in same row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <span className="section-badge" style={{ marginBottom: 0 }}>Education</span>
        <span style={{ fontSize: "0.65rem", color: "rgba(245,240,224,0.4)" }}>
          {page + 1} / {totalPages}
        </span>
      </div>

      {/* Tamil accent */}
      <p className="tamil-accent" style={{ marginBottom: "0.5rem" }}>My Journey</p>

      {/* Title */}
      <h2 className="heading-card" style={{ marginBottom: "1rem" }}>
        The Learning Path
      </h2>

      {/* Timeline items — 3 per page, no scrollbar */}
      <div style={{ minHeight: "13rem" }}>
        {items.map((item, i) => (
          <TimelineItem key={i} item={item} isLast={i === items.length - 1} />
        ))}
      </div>

      {/* Bottom-right page arrows */}
      <div style={{ position: "absolute", bottom: "12px", right: "12px", display: "flex", gap: "4px" }}>
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          style={btnStyle(page === 0)}
          onMouseEnter={e => { if (page > 0) e.currentTarget.style.background = "rgba(200,168,75,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = page === 0 ? "rgba(200,168,75,0.03)" : "rgba(200,168,75,0.08)"; }}
        >▲</button>
        <button
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          style={btnStyle(page === totalPages - 1)}
          onMouseEnter={e => { if (page < totalPages - 1) e.currentTarget.style.background = "rgba(200,168,75,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = page === totalPages - 1 ? "rgba(200,168,75,0.03)" : "rgba(200,168,75,0.08)"; }}
        >▼</button>
      </div>
    </OverlayCard>
  );
}
