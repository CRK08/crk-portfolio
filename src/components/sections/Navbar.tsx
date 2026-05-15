"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", progress: 0.0000 },
  { label: "About", progress: 0.2488 },
  { label: "Skills", progress: 0.3863 },
  { label: "Projects", progress: 0.6558 },
  { label: "Education", progress: 0.7658 },
  { label: "Contact", progress: 0.9542 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);

      // Determine which section is active based on scroll progress
      const section = document.querySelector(".scroll-animation") as HTMLElement | null;
      if (!section) return;
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, (scrollY - section.offsetTop) / scrollable));

      // Walk nav links in reverse to find the most recent one passed
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        if (progress >= NAV_LINKS[i].progress) {
          setActive(NAV_LINKS[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToProgress = (label: string, progress: number) => {
    setActive(label);
    setMenuOpen(false);

    // Map label → overlay id (lowercase, no spaces)
    const idMap: Record<string, string> = {
      Home: "hero", About: "about", Skills: "skills",
      Projects: "projects", Education: "education", Contact: "contact",
    };
    const overlayId = idMap[label];

    // Immediately force the card visible (bypasses scroll timing issues)
    if (overlayId) {
      window.dispatchEvent(
        new CustomEvent("navjump", { detail: { id: overlayId } })
      );
    }

    // Instant scroll — no Lenis easing to overshoot the overlay window
    if (progress === 0) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    const section = document.querySelector(".scroll-animation") as HTMLElement | null;
    if (!section) return;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + progress * scrollable,
      behavior: "instant" as ScrollBehavior,
    });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "52px",
        padding: "0 clamp(1.25rem, 4vw, 3rem)",
        background: scrolled || menuOpen ? "rgba(8, 5, 0, 0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(210,165,80,0.15)" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      {/* Left side group: Hamburger + Logo */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Hamburger button (Mobile) */}
        <button 
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            width: "32px", height: "32px", zIndex: 8001
          }}
          aria-label="Toggle navigation menu"
        >
          <span style={{
            display: "block", width: "22px", height: "2px", background: "var(--primary)",
            transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none"
          }}></span>
          <span style={{
            display: "block", width: "22px", height: "2px", background: "var(--primary)", marginTop: "4px",
            transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1
          }}></span>
          <span style={{
            display: "block", width: "22px", height: "2px", background: "var(--primary)", marginTop: "4px",
            transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none"
          }}></span>
        </button>

        {/* Logo */}
        <button
          onClick={() => { scrollToProgress("Home", 0); setMenuOpen(false); }}
          className="flex items-center gap-2"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Image 
            src="/logo.jpeg" 
            alt="Logo" 
            width={32} 
            height={32} 
            style={{ borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(210,165,80,0.3)" }} 
          />
          <span style={{
            fontFamily: "var(--font-caveat), cursive",
            fontSize: "1.2rem",
            color: "var(--primary)",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}>
            Kaviyarasan Portfolio
          </span>
        </button>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.15rem" }}>
        {NAV_LINKS.map(link => (
          <button
            key={link.label}
            onClick={() => scrollToProgress(link.label, link.progress)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.35rem 0.75rem",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(240,224,180,0.75)",
              transition: "color 0.2s",
              fontFamily: "var(--font-inter), sans-serif",
              textDecoration: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#f0e0b0"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(240,224,180,0.75)"}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Mobile nav links */}
      <div
        className="md:hidden"
        style={{
          position: "absolute", top: "52px", left: 0, right: 0,
          background: "rgba(8, 5, 0, 0.95)",
          borderBottom: "1px solid rgba(210,165,80,0.15)",
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: menuOpen ? "1.5rem 0" : "0",
          gap: "1.2rem",
          overflow: "hidden",
          transition: "max-height 0.4s, padding 0.4s",
          maxHeight: menuOpen ? "400px" : "0",
          boxShadow: menuOpen ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {NAV_LINKS.map(link => (
          <button
            key={`mob-${link.label}`}
            onClick={() => scrollToProgress(link.label, link.progress)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(240,224,180,0.75)",
              transition: "color 0.2s, transform 0.2s",
              fontFamily: "var(--font-inter), sans-serif",
              padding: "0.5rem",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#f0e0b0"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(240,224,180,0.75)"}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
