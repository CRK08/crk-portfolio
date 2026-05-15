"use client";

// ── Shared card shell ─────────────────────────────────────────────────────
export function OverlayCard({
  visible,
  side,
  width = "min(440px, 90vw)",
  transition = "1s",
  cardClass = "village-card",
  children,
}: {
  visible: boolean;
  side: "left" | "right" | "center";
  width?: string;
  transition?: string;
  cardClass?: string;
  children: React.ReactNode;
}) {
  const isCenter = side === "center";

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    height: "100%",
    width: isCenter && width === "min(440px, 90vw)" ? "min(520px, 94vw)" : width,
    display: "flex",
    alignItems: "center",
    paddingTop: "3.75rem",
    paddingBottom: "1.5rem",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transition: `opacity ${transition}, transform ${transition}`,
    ...(side === "left"   ? { left: 0,    paddingLeft: "clamp(1rem,3vw,2.5rem)", paddingRight: "0.5rem", transform: visible ? "translateY(0)" : "translateY(14px)" } : {}),
    ...(side === "right"  ? { right: 0,   paddingRight: "clamp(1rem,3vw,2.5rem)", paddingLeft: "0.5rem", transform: visible ? "translateY(0)" : "translateY(14px)" } : {}),
    ...(isCenter          ? { left: "50%", paddingLeft: "1rem", paddingRight: "1rem", transform: visible ? "translate(-50%,0)" : "translate(-50%,14px)" } : {}),
  };

  return (
    <div style={wrapStyle}>
      <div
        className={cardClass}
        style={{
          width: "100%",
          padding: "clamp(0.9rem,2vw,1.4rem)",
          position: "relative",  /* needed for absolute arrows */
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Shared arrow buttons (centre-bottom, used by Skills/Contact) ──────────
export function ArrowButtons({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div style={{
      position: "absolute",
      bottom: "12px",
      right: "12px",
      display: "flex",
      flexDirection: "row",
      gap: "4px",
    }}>
      {[{ label: "▲", dir: -80 }, { label: "▼", dir: 80 }].map(btn => (
        <button
          key={btn.label}
          onClick={() => scrollRef.current?.scrollBy({ top: btn.dir, behavior: "smooth" })}
          style={{
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
          aria-label={btn.label === "▲" ? "Scroll up" : "Scroll down"}
        >{btn.label}</button>
      ))}
    </div>
  );
}
