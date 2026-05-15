"use client";
import { useRef, useEffect, useState } from "react";
import { OverlayCard, ArrowButtons } from "@/components/ui/OverlayCard";

interface SkillsOverlayProps { visible: boolean; }

const SKILL_GROUPS = [
  { category: "Languages", skills: ["Java", "Python", "C", "JavaScript", "TypeScript", "Dart"] },
  { category: "Web",       skills: ["Next.js", "React", "HTML", "CSS", "Tailwind"] },
  { category: "Mobile",    skills: ["Flutter", "Riverpod", "Firebase"] },
  { category: "Database",  skills: ["PostgreSQL", "Prisma ORM", "SQLite"] },
  { category: "AI / APIs", skills: ["Gemini API", "REST APIs", "NextAuth.js"] },
];

const TAG_BG: Record<string, string> = {
  Languages:   "rgba(200,168,75,0.14)",
  Web:         "rgba(74,140,42,0.14)",
  Mobile:      "rgba(232,87,42,0.14)",
  Database:    "rgba(200,168,75,0.1)",
  "AI / APIs": "rgba(74,140,42,0.1)",
};

export default function SkillsOverlay({ visible }: SkillsOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setOverflow(el.scrollHeight > el.clientHeight + 2);
  }, [visible]);

  return (
    <OverlayCard visible={visible} side="right" transition="1s">
      <span className="section-badge">Skills</span>
      <h2 className="heading-card" style={{ marginBottom: "0.9rem" }}>What I Brew ☕</h2>

      <div ref={scrollRef} style={{ overflow: "hidden", maxHeight: "calc(100vh - 16rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {SKILL_GROUPS.map(group => (
            <div key={group.category}>
              <p className="label-badge" style={{ marginBottom: "0.35rem" }}>{group.category}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {group.skills.map(skill => (
                  <span key={skill} style={{
                    padding: "0.2rem 0.6rem", borderRadius: "9999px",
                    fontSize: "0.7rem", fontWeight: 500,
                    background: TAG_BG[group.category] ?? "rgba(200,168,75,0.1)",
                    color: "var(--foreground)",
                    border: "1px solid rgba(200,168,75,0.18)",
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {overflow && <ArrowButtons scrollRef={scrollRef} />}
    </OverlayCard>
  );
}
