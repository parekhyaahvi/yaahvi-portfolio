# Design Document — Frontend Guidelines
## Yaahvi Riddhish Parekh — Full Stack Developer Portfolio
### Version 2.0 — Full Stack Architecture

---

## 1. Design Philosophy

The portfolio operates under the **Developer Obsidian** theme: cinematic, dark, technical, and modern. Every design decision reinforces the message that Yaahvi is a Full Stack developer who thinks in systems and aesthetics. The site itself is the portfolio piece — built on a real stack, not a template.

**Core Principles:**
- **Massive negative space** → forces focus on identity and content
- **Glassmorphic depth** → layered, premium visual hierarchy
- **Tactile micro-interactions** → every hover must feel physically satisfying
- **Staggered animation choreography** → entrances feel directed, not random
- **Monospace as a design element** → developer culture embedded in typography
- **Dynamic content** → Projects section proves real backend capability

---

## 2. Color System

All colors defined as CSS custom properties on `:root`. Never use raw hex values outside `variables.css`.

```css
:root {
  --color-canvas:        #0f172a;                  /* Background — deep obsidian navy */
  --color-accent-1:      #38bdf8;                  /* Primary accent — electric cyan */
  --color-accent-2:      #8b5cf6;                  /* Secondary accent — electric purple */
  --color-text-primary:  #e2e8f0;                  /* Primary text — near-white slate */
  --color-text-sub:      #94a3b8;                  /* Subtext — muted blue-gray */
  --color-surface:       rgba(255, 255, 255, 0.05);/* Glass card surface */
  --color-border:        rgba(255, 255, 255, 0.10);/* Glass card border */
  --color-glow-blue:     rgba(56, 189, 248, 0.35); /* Cyan neon glow */
  --color-glow-purple:   rgba(139, 92, 246, 0.40); /* Purple shadow pool */
  --color-skeleton:      rgba(255, 255, 255, 0.06);/* Skeleton shimmer base */
  --color-error:         rgba(239, 68, 68, 0.15);  /* Error state background */
  --color-error-border:  rgba(239, 68, 68, 0.30);  /* Error state border */
}
```

**Usage Rules:**
- `--color-accent-1` (cyan): role text, skill borders on hover, CTA fill, dot nav active, proficiency bars, project card tag chips, link buttons
- `--color-accent-2` (purple): image hover shadows, ambient background blobs, contact icon hover shadows
- Text is always `--color-text-primary`; captions/subtitles always `--color-text-sub`
- Never use raw `#ffffff`

---

## 3. Typography

```css
/* Google Fonts import — place in <head> */
/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"> */

:root {
  --font-heading: 'Inter', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| Hero name | `--font-heading` | 900 | `clamp(3rem, 8vw, 6rem)` | `--color-text-primary` |
| Section titles | `--font-heading` | 700 | `clamp(2rem, 5vw, 3.5rem)` | `--color-text-primary` |
| Typewriter role | `--font-heading` | 600 | `clamp(1.25rem, 3vw, 2rem)` | `--color-accent-1` |
| Body/bio text | `--font-body` | 400 | `1.1rem` | `--color-text-primary` |
| Subtext/captions | `--font-body` | 400 | `0.95rem` | `--color-text-sub` |
| Skill/bio tags | `--font-mono` | 500 | `0.85rem` | `--color-accent-1` |
| Project tech chips | `--font-mono` | 400 | `0.8rem` | `--color-accent-1` |
| CTA button | `--font-heading` | 600 | `1rem` | `--color-text-primary` |
| Project card title | `--font-heading` | 700 | `1.2rem` | `--color-text-primary` |
| Project card desc | `--font-body` | 400 | `0.95rem` | `--color-text-sub` |

---

## 4. Layout & Spacing

### Global Page Structure
```css
html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  background-color: var(--color-canvas);
}

section {
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Spacing Scale
```css
:root {
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  4rem;
  --space-xl:  8rem;
}
```

### Section Layout Summary
| Section | Layout |
|---------|--------|
| Hero | Single centered column, max-width `900px` |
| About | Two-column CSS grid `40% | 60%`, gap `4rem` |
| Skills | 2×2 CSS grid `1fr 1fr`, gap `1.5rem`, max-width `900px` |
| Projects | 3-column responsive CSS grid, max-width `1100px` |
| Contact | Single centered column, glass card max-width `700px` |

---

## 5. Component Specs

### 5.1 — CTA Button ("View My Work")

```css
.cta-btn {
  border: 2px solid var(--color-accent-1);
  background: transparent;
  color: var(--color-text-primary);
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}
.cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-accent-1);
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: -1;
}
.cta-btn:hover::before { transform: translateX(0); }
.cta-btn:hover { color: var(--color-canvas); }
```

---

### 5.2 — Dot Navigation

```css
.dot-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-text-sub);
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
}
.dot.active {
  transform: scale(1.5);
  background: var(--color-accent-1);
}
```

---

### 5.3 — Skill Card / Node

```css
.skill-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: default;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}
.skill-card:hover {
  transform: scale(1.04) translateY(-2px);
  border-color: var(--color-accent-1);
  box-shadow: 0 0 20px var(--color-glow-blue);
}
.skill-bar {
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  background: var(--color-accent-1);
  width: 0%;
  transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.skill-card:hover .skill-bar {
  width: var(--proficiency, 80%);
}
```

---

### 5.4 — Project Card

```css
.project-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
.project-card__image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  background: rgba(255,255,255,0.03); /* fallback if no image */
}
.project-card__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}
.project-card__title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--color-text-primary);
}
.project-card__desc {
  font-size: 0.95rem;
  color: var(--color-text-sub);
  line-height: 1.6;
  flex: 1;
}
.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-accent-1);
  background: rgba(56, 189, 248, 0.10);
  border: 1px solid rgba(56, 189, 248, 0.20);
  border-radius: 6px;
  padding: 3px 10px;
}
.project-card__links {
  display: flex;
  gap: 0.75rem;
}
.project-link-btn {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.project-link-btn--primary {
  background: var(--color-accent-1);
  color: var(--color-canvas);
  border: none;
}
.project-link-btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
.project-link-btn:hover { opacity: 0.85; transform: translateY(-1px); }
```

---

### 5.5 — Skeleton Shimmer (Loading State)

```css
.skeleton {
  background: var(--color-skeleton);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.06) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}
```

---

### 5.6 — Error State

```css
.projects-error {
  background: var(--color-error);
  border: 1px solid var(--color-error-border);
  border-radius: 16px;
  padding: 2rem 3rem;
  text-align: center;
  color: var(--color-text-sub);
  font-family: var(--font-mono);
  font-size: 0.95rem;
}
```

---

### 5.7 — Glassmorphic Contact Panel

```css
.contact-panel {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 4rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
```

---

### 5.8 — Contact Icon Buttons

```css
.contact-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.contact-icon:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--color-glow-purple);
}
```

---

### 5.9 — Toast Notification

```css
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid var(--color-accent-1);
  color: var(--color-text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 9999;
  pointer-events: none;
}
.toast.visible {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
```

---

## 6. Animation System

### Core Keyframes

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-60px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes blurSharp {
  from { filter: blur(8px); opacity: 0.5; }
  to   { filter: blur(0); opacity: 1; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

### Project Cards — Dynamic Animation After API Response

```js
// After fetch('/api/projects') resolves and cards are injected into DOM:
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.animationDelay = `${i * 100}ms`;
  card.classList.add('animate-in'); // applies fadeUp keyframe
});
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  canvas { display: none; }
}
```

---

## 7. Background & Atmosphere

### Starfield Canvas (Hero)

```js
// canvas behind hero content — 150-200 particles
// Each particle: random x/y, random vx/vy (±0.3), random opacity (0.5–0.9)
// Particles wrap at canvas edges; rendered in requestAnimationFrame loop
```

### Ambient Glow Blobs

```css
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}
.blob-blue   { background: var(--color-accent-1); width: 600px; height: 600px; top: -100px; left: -100px; }
.blob-purple { background: var(--color-accent-2); width: 500px; height: 500px; bottom: -100px; right: -100px; }
```

---

## 8. Projects Grid Layout

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 1100px;
  padding: var(--space-md);
}

/* Skeleton cards match real card dimensions */
.skeleton-card {
  height: 380px;
  border-radius: 20px;
}
```

---

## 9. Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid { gap: 2rem; }
}

/* Mobile */
@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }  /* stack vertically */
  .contact-panel { padding: 2.5rem 2rem; }
  .dot-nav { right: 1rem; }
}

/* Small mobile */
@media (max-width: 480px) {
  .cta-btn { width: 100%; text-align: center; }
  .contact-icon { width: 60px; height: 60px; }
  .dot-nav {
    right: auto;
    bottom: 1.5rem;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
  }
}
```

---

## 10. Accessibility Guidelines

- One `<h1>` only (hero name). Each section has its own `<h2>`.
- All `<section>` elements have `aria-label` (e.g., `aria-label="About Yaahvi"`)
- All icon buttons: `aria-label` required (e.g., `aria-label="Copy email address"`)
- Project link buttons: `aria-label` includes project name (e.g., `aria-label="View live demo of Project Name"`)
- Focus styles: `outline: 2px solid var(--color-accent-1); outline-offset: 4px` on all interactive elements
- Loading state: skeleton cards include `aria-busy="true"` on the projects container
- Error state: error message uses `role="alert"` so screen readers announce it
- Color contrast ratio ≥ 4.5:1 for all body text; ≥ 3:1 for large headings
- `<html lang="en">` set correctly
- All external `<a>` tags: `target="_blank" rel="noopener noreferrer"`
