"use client";
import { OverlayCard } from "@/components/ui/OverlayCard";
import Image from "next/image";

interface HeroOverlayProps { visible: boolean; }

export default function HeroOverlay({ visible }: HeroOverlayProps) {
  return (
    <OverlayCard visible={visible} side="center" transition="1s" width="min(600px, 94vw)">
      <div className="flex flex-col w-full max-w-[560px] mt-8 md:mt-0">
        
        {/* Top Section: Text on Left, Image on Right */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-6">
          
          {/* Left Text (Welcome, Name, Role) */}
          <div className="flex-1 flex flex-col items-center">
            {/* Caveat accent */}
            <p className="tamil-accent text-center w-full" style={{ marginBottom: "0.2rem" }}>
              Welcome to the Village
            </p>

            {/* Mobile Profile Photo */}
            <div className="md:hidden shrink-0 my-2">
              <Image 
                src="/profile.jpeg" 
                alt="Kaviyarasan" 
                width={86} 
                height={86} 
                className="hero-profile-photo"
                style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid rgba(200, 168, 75, 0.6)", boxShadow: "0 0 0 4px rgba(200, 168, 75, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4)", width: "86px", height: "86px" }}
              />
            </div>

            {/* Name */}
            <h1 className="heading-hero text-center w-full" style={{ marginBottom: "0.2rem", whiteSpace: "nowrap" }}>
              Kaviyarasan C
            </h1>

            {/* Role */}
            <p className="label-badge text-center w-full" style={{ marginBottom: "0.2rem" }}>
              Full Stack Developer · AI Integration · Freelancer
            </p>
          </div>

          {/* Desktop Profile Photo */}
          <div className="hidden md:flex shrink-0">
            <Image 
              src="/profile.jpeg" 
              alt="Kaviyarasan" 
              width={120} 
              height={120} 
              className="hero-profile-photo"
              style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid rgba(200, 168, 75, 0.6)", boxShadow: "0 0 0 4px rgba(200, 168, 75, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4)", width: "120px", height: "120px" }}
            />
          </div>

        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "rgba(200,168,75,0.18)", margin: "0.8rem 0" }} />

        {/* Bottom Section: Paragraph & Buttons */}
        <div className="flex flex-col items-center w-full">
          {/* One liner */}
          <p className="body-text w-full" style={{ textAlign: "center", marginBottom: "1rem" }}>
            I build AI-powered web and mobile products that solve real-world
            problems — from farm fields to city streets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 w-full" style={{ marginBottom: "0.2rem" }}>
            <button
              onClick={() => window.scrollBy({ top: window.innerHeight * 2, behavior: "smooth" })}
              style={{
                padding: "0.5rem 1.4rem", borderRadius: "9999px",
                fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em",
                background: "linear-gradient(135deg, var(--primary), #d4a535)",
                color: "#0d0a00", border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(200,168,75,0.3)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Explore the Village →
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
              padding: "0.5rem 1.4rem", borderRadius: "9999px",
              fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.05em",
              border: "1px solid rgba(200,168,75,0.25)",
              color: "var(--foreground)", background: "rgba(13,10,0,0.4)",
              textDecoration: "none", transition: "transform 0.2s", display: "inline-block",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-5" style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
        color: "var(--text-dim)", fontSize: "0.62rem", letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}>
        <span>Scroll to walk through</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </OverlayCard>
  );
}
