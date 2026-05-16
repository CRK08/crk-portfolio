# Kaviyarasan C — Village Portfolio

> A scroll-driven cinematic portfolio where scrolling through the page plays a 520-frame Tamil Nadu village animation on an HTML5 Canvas, with section cards appearing as you journey through the village.

## Live Demo

🔗 [crk-portfolio.vercel.app](https://crk-portfolio.vercel.app/)

---

## What This Is

This is a **cinematic frame-sequence portfolio** built around a 520-frame animation of a Tamil Nadu village. Instead of a traditional portfolio with sections and navigation, you scroll through a film strip — as you scroll, the village animation plays. When you reach certain points in the journey (the school, the panchayat office, the market), overlay cards appear revealing different sections of the portfolio: About, Skills, Projects, Education, and Contact.

---

## How It Works

**Simple version:** The 520 village animation frames are JPEG images stored in `public/frames/`. On scroll, JavaScript picks the correct frame based on how far you've scrolled, and draws it to a fullscreen HTML5 Canvas. When progress crosses certain thresholds, info cards fade in over the village scene.

**No video files. No heavy animation libraries. Just math + canvas + CSS transitions.**

---

## Tech Stack

| | Tool |
|--|------|
| ⚡ Framework | Next.js 16 (App Router) |
| ⚛️ UI | React 19 |
| 🎨 Styling | CSS custom properties + Tailwind v4 |
| 🌊 Scroll | Lenis 1.3 |
| ✍️ Fonts | Inter · Playfair Display · Caveat (Google Fonts via next/font) |
| 📦 Deploy | Vercel |
| 🔤 Language | TypeScript |

---

## Project Structure

```
kaviyarasan-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css         ← All design tokens and card styles
│   │   ├── layout.tsx          ← Fonts, metadata, SmoothScrollProvider
│   │   └── page.tsx            ← Just: <Navbar> + <VillageCanvas>
│   └── components/
│       ├── providers/
│       │   └── SmoothScrollProvider.tsx
│       ├── sections/
│       │   ├── VillageCanvas.tsx   ← THE core engine
│       │   ├── Navbar.tsx
│       │   ├── HeroOverlay.tsx
│       │   ├── AboutOverlay.tsx
│       │   ├── SkillsOverlay.tsx
│       │   ├── ProjectsOverlay.tsx
│       │   ├── EducationOverlay.tsx
│       │   └── ContactOverlay.tsx
│       └── ui/
│           ├── OverlayCard.tsx     ← Shared card shell
│           ├── overlayStyles.ts    ← (unused, legacy)
│           └── LoadingOverlay.tsx  ← (unused, legacy)
├── public/
│   └── frames/
│       ├── frame_0001.jpg
│       └── ... frame_0520.jpg
├── SKILL.md       ← Full build documentation
├── AGENTS.md      ← AI agent instructions
└── references/    ← Deep-dive technical docs
```

---

## Getting Started

### 1. Clone
```bash
git clone https://github.com/CRK08/kaviyarasan-portfolio.git
cd kaviyarasan-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add frames
Place your 520 frames in `public/frames/`:
```
public/frames/frame_0001.jpg
public/frames/frame_0002.jpg
...
public/frames/frame_0520.jpg
```
Frames must be zero-padded to 4 digits.

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Frame Assets

**How frames were generated:** Using Google Veo AI — a text-to-video model. The prompt described a cinematic fly-through of a Tamil Nadu village from dawn, passing through rice fields, a panchayat office, a school, a market, and farmland.

**Technical specs:**
- Format: JPEG
- Count: 520 frames
- Naming: `frame_0001.jpg` through `frame_0520.jpg` (4-digit zero-padded)
- Resolution: 1920×1080 (original); any 16:9 aspect ratio works
- Target size: < 100KB per frame, < 50MB total

**Two clips:**
- Clip 1 (`frame_0001–0400`): Wide village flyover (slower paced, more scenic)
- Clip 2 (`frame_0401–0520`): Closer village details (faster paced)
- Both clips are mapped to 50% of scroll each, equalizing their perceived speed.

**To replace with your own frames:**
Any JPG sequence works. Just update `FRAME_COUNT` and `CLIP1_FRAMES`/`CLIP2_FRAMES` in `VillageCanvas.tsx` if your clip split is different.

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your project (with frames) to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repository → Vercel auto-detects Next.js
4. Click Deploy
5. Done — frames are served via Vercel's global CDN

### Frame size check before deploying
```powershell
# Check total frames size (PowerShell)
(Get-ChildItem "public\frames\*.jpg" | Measure-Object -Property Length -Sum).Sum / 1MB
```
Target: < 50MB total. Vercel free tier limit is 100MB per deployment.

### Optional: Add cache headers
Create `vercel.json` in project root:
```json
{
  "headers": [
    {
      "source": "/frames/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

---

## Customization Guide

### Change colors
Edit `src/app/globals.css` — update these variables:
```css
:root {
  --primary: #d4a84f;    /* main gold accent */
  --secondary: #4a8c2a;  /* green */
  --foreground: #f0e0b0; /* text color */
}
```
Card backgrounds are in `.village-card` and `.village-card-warm`.

### Change content
Each section is its own file in `src/components/sections/`:
| Section | File | What to edit |
|---------|------|-------------|
| Hero | `HeroOverlay.tsx` | Name, role, bio one-liner |
| About | `AboutOverlay.tsx` | `STATS` array + bio paragraph |
| Skills | `SkillsOverlay.tsx` | `SKILL_GROUPS` array |
| Projects | `ProjectsOverlay.tsx` | `PROJECTS` array |
| Education | `EducationOverlay.tsx` | `TIMELINE` array |
| Contact | `ContactOverlay.tsx` | `LINKS` array |

### Change overlay timing
Edit the `OVERLAYS` array in `src/components/sections/VillageCanvas.tsx`:
```typescript
{ id: "about", show: 0.2000, hide: 0.3200 }
```
Change `show` and `hide` values (0–1 scroll progress).  
**Rule:** The matching nav `progress` value in `Navbar.tsx` must be inside `[show, hide]`.

### Change fonts
1. Edit `src/app/layout.tsx` — change the Google Font imports
2. Update CSS variables in `globals.css` if font variable names change
3. Update typography classes in `globals.css`

---

## Credits

- **Veo AI** — Village animation frame generation (Google DeepMind)
- **Lenis** — Smooth scroll library by Studio Freight
- **Google Fonts** — Inter, Playfair Display, Caveat
- **Next.js** — React framework by Vercel
- **Tailwind CSS** — Utility CSS framework
