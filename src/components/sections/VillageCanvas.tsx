"use client";

import { useEffect, useRef, useState, useCallback } from "react";

import HeroOverlay from "@/components/sections/HeroOverlay";
import AboutOverlay from "@/components/sections/AboutOverlay";
import SkillsOverlay from "@/components/sections/SkillsOverlay";
import ProjectsOverlay from "@/components/sections/ProjectsOverlay";
import EducationOverlay from "@/components/sections/EducationOverlay";
import ContactOverlay from "@/components/sections/ContactOverlay";

const FRAME_COUNT = 260;

// Clip split: clip1 = frames 1–200 (200 frames), clip2 = frames 201–260 (60 frames)
// Each clip gets 50% of scroll distance so both play at equal perceived speed.
const CLIP1_FRAMES = 200; // frames 0001–0200
const CLIP2_FRAMES = 60;  // frames 0201–0260

// Each nav jump point is centred inside its card window.
// show < nav_progress < hide for every section.
const OVERLAYS = [
  { id: "hero", show: 0.0000, hide: 0.0600 }, // nav 0.0000 ✓
  { id: "about", show: 0.2480, hide: 0.2880 }, // nav 0.2488 ✓
  { id: "skills", show: 0.3858, hide: 0.4258 }, // nav 0.3863 ✓
  { id: "projects", show: 0.6550, hide: 0.6950 }, // nav 0.6208 ✓
  { id: "education", show: 0.7650, hide: 0.8050 }, // nav 0.7458 ✓
  { id: "contact", show: 0.9536, hide: 1.0000 }, // nav 0.9542 ✓
] as const;

type OverlayId = typeof OVERLAYS[number]["id"];

export default function VillageCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const prevIdsRef = useRef("");
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  // Force-show an overlay when a nav link is clicked (cleared after 2s or next scroll)
  const forcedRef = useRef<OverlayId | null>(null);
  const forcedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(true); // start immediately, frames load progressively
  const [visibleOverlays, setVisibleOverlays] = useState<Set<OverlayId>>(
    new Set(["hero"])
  );

  // ── Canvas resize + DPR scaling ──────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
    }
  }, []);

  // ── Cover-fit draw ─────────────────────────────────────────────
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const ctx = ctxRef.current;
    if (!ctx || !img.naturalWidth) return;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let drawW: number, drawH: number;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    // Mobile: 1.3x zoom so subject fills frame better
    if (window.innerWidth <= 768) {
      drawW *= 1.3;
      drawH *= 1.3;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // ── Preload all 551 frames ────────────────────────────────────
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    let loadedCount = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const idx = i - 1;
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        // Draw frame 1 as soon as it's ready
        if (idx === 0) drawFrame(imgs[0]);
      };
      img.onerror = () => { loadedCount++; };
      imgs[idx] = img;
    }
    framesRef.current = imgs;

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas, drawFrame]);

  // ── Listen for nav-jump events ────────────────────────────────
  useEffect(() => {
    const onNavJump = (e: Event) => {
      const id = (e as CustomEvent<{ id: OverlayId }>).detail?.id;
      if (!id) return;
      if (forcedTimer.current) clearTimeout(forcedTimer.current);
      forcedRef.current = id;
      setVisibleOverlays(new Set([id]));
      prevIdsRef.current = id;
      // Auto-clear after 3 s (scroll will take over naturally)
      forcedTimer.current = setTimeout(() => { forcedRef.current = null; }, 3000);
    };
    window.addEventListener("navjump", onNavJump);
    return () => window.removeEventListener("navjump", onNavJump);
  }, []);

  // ── Scroll handler ────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) { tickingRef.current = false; return; }

        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));

        // Piecewise frame index: clip1 (0–399) uses progress 0→0.5,
        // clip2 (400–519) uses progress 0.5→1.0 — equal scroll per clip.
        let frameIndex: number;
        if (progress < 0.5) {
          frameIndex = Math.min(CLIP1_FRAMES - 1, Math.floor(progress * 2 * CLIP1_FRAMES));
        } else {
          frameIndex = CLIP1_FRAMES + Math.min(CLIP2_FRAMES - 1, Math.floor((progress - 0.5) * 2 * CLIP2_FRAMES));
        }
        frameIndex = Math.min(FRAME_COUNT - 1, frameIndex);
        const img = framesRef.current[frameIndex];
        if (img?.complete) drawFrame(img);

        // Compute visible overlays — also respect forced overlay from nav click
        const newVisible = new Set<OverlayId>();
        if (forcedRef.current) {
          newVisible.add(forcedRef.current);
        } else {
          for (const o of OVERLAYS) {
            if (progress >= o.show && progress < o.hide) newVisible.add(o.id);
          }
        }
        const newIds = [...newVisible].sort().join(",");
        if (newIds !== prevIdsRef.current) {
          prevIdsRef.current = newIds;
          setVisibleOverlays(newVisible);
        }

        // Clear force once user scrolls away from nav target
        if (forcedRef.current) {
          const overlay = OVERLAYS.find(o => o.id === forcedRef.current);
          if (overlay && (progress < overlay.show - 0.05 || progress > overlay.hide + 0.05)) {
            forcedRef.current = null;
          }
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once to set initial frame
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaded, drawFrame]);

  return (
    <>
      {/* Tall scroll section */}
      <section
        ref={sectionRef}
        className="scroll-animation relative"
        style={{ willChange: "transform" }}
      >
        {/* Sticky viewport-pinned container */}
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ willChange: "contents", transform: "translateZ(0)" }}
          />

          {/* Overlays */}
          <HeroOverlay visible={visibleOverlays.has("hero")} />
          <AboutOverlay visible={visibleOverlays.has("about")} />
          <SkillsOverlay visible={visibleOverlays.has("skills")} />
          <ProjectsOverlay visible={visibleOverlays.has("projects")} />
          <EducationOverlay visible={visibleOverlays.has("education")} />
          <ContactOverlay visible={visibleOverlays.has("contact")} />
        </div>
      </section>
    </>
  );
}
