"use client";

const CARD_STYLE: React.CSSProperties = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  top: 0,
  height: "100%",
  paddingTop: "3.75rem",
  paddingBottom: "1.5rem",
};

const BADGE_STYLE: React.CSSProperties = {
  display: "inline-block",
  marginBottom: "0.65rem",
  padding: "0.22rem 0.75rem",
  borderRadius: "9999px",
  fontSize: "0.6rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  background: "rgba(200,168,75,0.12)",
  color: "var(--primary)",
  border: "1px solid rgba(200,168,75,0.2)",
};

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "clamp(1.1rem, 2.5vw, 1.65rem)",
  color: "var(--foreground)",
  marginBottom: "0.7rem",
  lineHeight: 1.2,
};

const BODY_STYLE: React.CSSProperties = {
  fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
  color: "rgba(245,240,224,0.7)",
  lineHeight: 1.75,
  textAlign: "justify" as const,
};

export { CARD_STYLE, BADGE_STYLE, HEADING_STYLE, BODY_STYLE };
