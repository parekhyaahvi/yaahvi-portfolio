# Product Requirements Document (PRD)
## Yaahvi Riddhish Parekh — Full Stack Developer Portfolio
### Version 2.0 — Full Stack Architecture

---

## 1. Overview

**Product Name:** Yaahvi Riddhish Parekh Portfolio Website
**Product Type:** Full Stack Personal Developer Portfolio
**Owner:** Yaahvi Riddhish Parekh
**Purpose:** A cinematic, dark-theme personal portfolio that functions as a live proof-of-concept of Yaahvi's Full Stack development capabilities — using a real Node.js/Express backend, MongoDB database, and a JavaScript frontend.

---

## 2. Goals & Objectives

| Goal | Description |
|------|-------------|
| **Primary** | Convert recruiters and collaborators into contacts via Email, GitHub, or LinkedIn |
| **Secondary** | Demonstrate Full Stack capability through a real backend API, real database, and live deployment |
| **Tertiary** | Establish a strong personal brand — modern, dark, developer-coded |

---

## 3. Target Users

- **Recruiters & HR Managers** — Scanning for skill stack and personality fit quickly
- **Technical Hiring Managers** — Evaluating real full-stack architecture decisions
- **Collaborators & Peers** — Developers looking to connect or work together
- **Clients** — Individuals or small businesses seeking a developer

---

## 4. Prescribed Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML, CSS, JavaScript (Vanilla) |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (via Mongoose ODM) |
| **Deployment** | Vercel |

---

## 5. Scope

### In Scope
- 5-section single-page application: Home, About, Skills, Projects, Contact
- Node.js/Express REST API to serve project data
- MongoDB database storing all project details (title, description, tech stack, links, image)
- Frontend fetches projects dynamically from the API on page load
- Full scroll-snapping navigation with dot nav sidebar (5 dots)
- Animated hero with typewriter effect and particle background
- About section with scroll-triggered entrance animations
- Skills matrix with hover micro-interactions
- Projects section rendering cards dynamically from the API response
- Glassmorphic contact section with clipboard copy + toast feedback
- Fully responsive layout (desktop-first, mobile compatible down to 375px)
- Deployed to Vercel (frontend as static files, API as Vercel Serverless Functions)

### Out of Scope (v1)
- Admin panel for managing projects via a UI
- User authentication or session management
- Blog or articles section
- Contact form with database submission
- Analytics dashboard

---

## 6. Functional Requirements

### FR-01: Hero Section (Home)
- Display full name: **Yaahvi Riddhish Parekh**
- Animated typewriter subtitle cycling through: `['Full Stack Developer', 'Problem Solver', 'Web Architect']`
- Subheading: *"Building scalable web applications with modern technologies"*
- **"View My Work"** CTA button — smooth cyan left-to-right fill sweep on hover; scrolls to Projects section on click
- Animated particle/starfield canvas background (150+ floating dots)
- Ambient glow blobs behind content (blue top-left, purple bottom-right)
- Load animation sequence:
  - `0.0s` → name fades in
  - `0.5s` → typewriter starts
  - `1.2s` → subheading slides up
  - `1.5s` → CTA button drops in

### FR-02: About Section
- Two-column layout: 40% visual (profile image), 60% content (bio text)
- Profile image slides in from the left when section is 25% in viewport; blurry → sharp focus on entrance
- On hover: image scales `1.05×`, purple drop-shadow extends
- Bio uses inline color-coded monospace tags for competencies: `[Full Stack Developer]`, `[Problem Solver]`
- Staggered entrance animations: Header `+0ms`, Bio `+150ms`, Tags `+300ms`

### FR-03: Skills Section
- 2×2 CSS Grid layout, four categories: Languages, Frameworks, Database, Tools
- Each skill node: icon + monospace label + proficiency bar (fills cyan on hover)
- On hover: scale up, border illuminates with cyan neon glow
- Skills stagger in via domino cascade when section scrolls into view
- Skills data:
  - **Languages:** HTML, CSS, JavaScript, Java
  - **Frameworks:** Node.js, Express.js
  - **Database:** MongoDB, Mongoose
  - **Tools:** GitHub, GitHub Pages, Vercel

### FR-04: Projects Section *(Requires Backend + Database)*
- Project cards rendered dynamically — data fetched from `GET /api/projects` on page load
- Each project card displays:
  - Project title
  - Short description
  - Tech stack tags (pill chips)
  - Live demo link button (opens in new tab)
  - GitHub repo link button (opens in new tab)
  - Thumbnail/preview image (URL stored in DB)
- Cards enter with staggered fade-up animation after API data arrives
- Loading state: skeleton shimmer placeholder cards while API is fetching
- Error state: graceful message if API fails — *"Projects coming soon — check GitHub for updates"*
- Cards laid out in a responsive grid (3 columns desktop, 2 tablet, 1 mobile)

### FR-05: Contact Section
- Full-screen section with centered glassmorphic frosted-glass panel
- Three circular icon buttons: Email (✉), GitHub (octocat), LinkedIn (in)
- On hover: icons float up `5px`, brand-colored purple shadow pool appears beneath
- Email click: copy address to clipboard → icon switches to ✓ → toast: *"Copied to clipboard!"* (auto-dismiss 2.5s) → fallback: `mailto:` if Clipboard API unavailable
- GitHub / LinkedIn: `window.open(url, '_blank')` with `rel="noopener noreferrer"`
- Muted subtext: *"Let's build something amazing together"*

### FR-06: Navigation
- Dot Navigation fixed to right edge of viewport — 5 dots (one per section)
- Active dot scales `1.5×` and turns cyan when its section occupies the viewport
- Smooth `scroll-snap-type: y mandatory` — all sections are `100vh`, snap on scroll

---

## 7. API Requirements

| Endpoint | Method | Auth | Description | Response |
|----------|--------|------|-------------|----------|
| `GET /api/projects` | GET | None | Fetch all projects | `[{ _id, title, description, techStack, liveUrl, githubUrl, imageUrl, order }]` |
| `GET /api/projects/:id` | GET | None | Fetch single project | Single project object |
| `GET /health` | GET | None | API health check | `{ status: "ok", timestamp }` |

*POST/PUT/DELETE are out of scope for v1. Projects are seeded directly into MongoDB via a seed script.*

---

## 8. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Page load < 2s; API response < 500ms |
| **Responsiveness** | Functional on screens ≥ 375px |
| **Accessibility** | Semantic HTML, keyboard navigable, ARIA labels on all icon buttons |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| **SEO** | Proper `<title>`, `<meta description>`, Open Graph tags |
| **Hosting** | Vercel — frontend static + API as Vercel Serverless Functions |
| **Uptime** | 99.9% via Vercel platform + MongoDB Atlas free tier |

---

## 9. Design Requirements

- **Theme:** Developer Obsidian (dark, cinematic)
- **Canvas:** `#0f172a` | **Primary Accent:** `#38bdf8` | **Secondary Accent:** `#8b5cf6`
- **Primary Text:** `#e2e8f0` | **Subtext:** `#94a3b8`
- **Fonts:** Inter (headings/body), JetBrains Mono (tags/code)

---

## 10. Success Metrics

| Metric | Target |
|--------|--------|
| Time to First Meaningful Paint | < 1.5s |
| API response time (GET /api/projects) | < 500ms |
| Contact icon click-through rate | > 20% of unique visitors |
| Lighthouse Performance Score | ≥ 90 |
| Lighthouse Accessibility Score | ≥ 90 |
| Mobile usability (Google) | Pass |
