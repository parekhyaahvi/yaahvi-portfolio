# Master AI Prompt
## Yaahvi Riddhish Parekh — Full Stack Developer Portfolio
### Version 2.0 — Full Stack Architecture
### (Paste this entire document as your system/project prompt in Antigravity)

---

You are building a **full-stack personal developer portfolio** for **Yaahvi Riddhish Parekh**. This is not a static site. It uses a real Node.js/Express.js backend, a real MongoDB database, and a vanilla JavaScript frontend — all deployed on Vercel. Follow every specification below exactly.

---

## PRESCRIBED TECH STACK (DO NOT DEVIATE)

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose ODM) |
| Deployment | Vercel |

Do NOT use React, Vue, Angular, jQuery, or any frontend framework. Do NOT use a different database. Do NOT use a different hosting platform.

---

## IDENTITY

- **Name:** Yaahvi Riddhish Parekh
- **Role:** Full Stack Developer
- **Tagline:** *"Building scalable web applications with modern technologies"*
- **Theme:** Developer Obsidian — dark, cinematic, modern

---

## SITE STRUCTURE

5-section single-page application with `scroll-snap-type: y mandatory`. All sections are `100vh`. Fixed dot navigation on the right edge (5 dots).

**Sections in order:**
1. Home (Hero)
2. About
3. Skills
4. Projects ← **renders dynamic data from MongoDB via Express API**
5. Contact

---

## DESIGN SYSTEM

### Colors (always use CSS variables — never raw hex in components)
```css
:root {
  --color-canvas:        #0f172a;
  --color-accent-1:      #38bdf8;   /* cyan — primary */
  --color-accent-2:      #8b5cf6;   /* purple — secondary */
  --color-text-primary:  #e2e8f0;
  --color-text-sub:      #94a3b8;
  --color-surface:       rgba(255,255,255,0.05);
  --color-border:        rgba(255,255,255,0.10);
  --color-glow-blue:     rgba(56,189,248,0.35);
  --color-glow-purple:   rgba(139,92,246,0.40);
  --color-skeleton:      rgba(255,255,255,0.06);
}
```

### Fonts
- **Headings + Body:** Inter (import from Google Fonts)
- **Tags + Code:** JetBrains Mono (import from Google Fonts)

---

## SECTION SPECS

### SECTION 1 — HERO
- Canvas particle starfield background (150+ animated white dots on `<canvas>`)
- Ambient glow blobs: blue top-left, purple bottom-right (`filter: blur(120px); opacity: 0.15`)
- Center-aligned content:
  1. Name: *Yaahvi Riddhish Parekh* — white, weight 900, `clamp(3rem, 8vw, 6rem)`
  2. Typewriter subtitle — cycles `['Full Stack Developer', 'Problem Solver', 'Web Architect']` — cyan color, blinking cursor
  3. Subheading — *"Building scalable web applications with modern technologies"* — subtext color
  4. CTA button — *"View My Work"* — cyan border outline, hover: smooth left-to-right cyan fill sweep (`::before translateX` trick), text inverts to `--color-canvas`
- **CTA click:** smooth scroll to Projects section (Section 4)
- Load animation: name `0.0s` → typewriter `0.5s` → subheading `1.2s` → CTA `1.5s`

---

### SECTION 2 — ABOUT
- Two-column CSS grid: `40% | 60%`, vertically centered, gap `4rem`
- **Left column (40%):** Profile image — rounded square, purple box-shadow offset; hover → scale `1.05×` + purple drop-shadow extends
- **Right column (60%):** "About Me" h2 + bio paragraph with inline monospace competency tags:
  > *"I am a `[Full Stack Developer]` passionate about `[problem-solving]` and modern `[web development]`. With a strong foundation in building scalable applications, I blend technical expertise with clean design to craft seamless digital experiences."*
  - Tags styled: cyan background tint, cyan border, JetBrains Mono font
- **Scroll trigger (25% viewport threshold):**
  - Image: slideInLeft + blurSharp keyframe
  - Header: fadeUp at `+0ms`
  - Bio: fadeUp at `+150ms`
  - Tags: fadeUp at `+300ms`

---

### SECTION 3 — SKILLS
- 2×2 CSS grid, max-width `900px`, centered
- Four quadrant cards: **Languages**, **Frameworks**, **Database**, **Tools**
- **Skills data (hardcoded in `js/skills.js`):**
  ```js
  const skillsData = {
    languages:  [{name:'HTML',proficiency:95},{name:'CSS',proficiency:90},{name:'JavaScript',proficiency:88},{name:'Java',proficiency:75}],
    frameworks: [{name:'Node.js',proficiency:82},{name:'Express.js',proficiency:80}],
    database:   [{name:'MongoDB',proficiency:78},{name:'Mongoose',proficiency:76}],
    tools:      [{name:'GitHub',proficiency:92},{name:'GitHub Pages',proficiency:88},{name:'Vercel',proficiency:85}]
  };
  ```
- Each skill node: icon + monospace label + proficiency bar (fills cyan on hover)
- Hover: scale up, cyan border glow, proficiency bar fills
- **Section entrance:** staggered domino cascade (top-left → bottom-right), `scaleIn` keyframe

---

### SECTION 4 — PROJECTS *(Full Stack — Dynamic from MongoDB)*

**This section fetches data from the Express backend.**

- `fetch('/api/projects')` is called **immediately on page load** (not on section scroll) so data is ready
- **While loading:** show 3 skeleton shimmer placeholder cards (`--color-skeleton` background with animated shimmer `::after`)
- **On success:** inject project cards into the DOM with staggered `fadeUp` animation (`100ms` delay between cards)
- **On error / empty:** show friendly error message with fallback GitHub link

**Project card layout:**
- Thumbnail image (top, `aspect-ratio: 16/9`)
- Title (Inter, weight 700)
- Description (subtext color)
- Tech stack chips (monospace, cyan tint background, cyan border)
- Two buttons: "Live Demo" (cyan filled) + "GitHub" (outline)
- Card hover: `translateY(-6px)`, deeper shadow

**Project grid:** 3 columns desktop → 2 tablet → 1 mobile

---

### SECTION 5 — CONTACT
- Centered glassmorphic panel:
  ```css
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 24px;
  ```
- Section title: *"Get in Touch"*
- Row of 3 circular icon buttons (80px): Email ✉, GitHub, LinkedIn
- Subtext: *"Let's build something amazing together"*
- **Hover:** float up `5px` + purple shadow pool beneath
- **Email click:** `navigator.clipboard.writeText(email)` → icon ✓ → toast *"Copied to clipboard!"* auto-dismiss 2.5s → fallback: `mailto:`
- **GitHub/LinkedIn:** `window.open(url, '_blank')`

---

## BACKEND SPECS

### File: `api/index.js`
```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json());

// Cached DB connection for serverless
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

app.use('/api/projects', async (req, res, next) => {
  await connectDB(); next();
}, require('./routes/projects'));

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

module.exports = app;
```

### Mongoose Schema: `api/models/Project.js`
```js
const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true, maxLength: 100 },
  description: { type: String, required: true, trim: true, maxLength: 500 },
  techStack:   { type: [String], required: true },
  liveUrl:     { type: String, trim: true, default: '' },
  githubUrl:   { type: String, required: true, trim: true },
  imageUrl:    { type: String, trim: true, default: '' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Project', projectSchema);
```

### Routes: `api/routes/projects.js`
```js
const router = require('express').Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch { res.status(500).json({ error: 'Failed to fetch projects' }); }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
```

---

## STATIC CONFIG

```js
// js/config.js
const config = {
  name: 'Yaahvi Riddhish Parekh',
  roles: ['Full Stack Developer', 'Problem Solver', 'Web Architect'],
  tagline: 'Building scalable web applications with modern technologies',
  email: 'YOUR_EMAIL_HERE',
  github: 'YOUR_GITHUB_URL_HERE',
  linkedin: 'YOUR_LINKEDIN_URL_HERE',
};
```

---

## REQUIRED FILE STRUCTURE

```
portfolio/
├── index.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── layout.css
│   ├── hero.css
│   ├── about.css
│   ├── skills.css
│   ├── projects.css
│   ├── contact.css
│   ├── nav.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── config.js
│   ├── typewriter.js
│   ├── particles.js
│   ├── scrollObserver.js
│   ├── dotNav.js
│   ├── skills.js
│   ├── projects.js
│   └── clipboard.js
├── assets/
│   ├── icons/
│   ├── profile.jpg
│   └── favicon.ico
├── api/
│   ├── index.js
│   ├── models/Project.js
│   └── routes/projects.js
├── scripts/seed.js
├── vercel.json
├── package.json
├── .env
├── .gitignore
└── README.md
```

---

## VERCEL CONFIG (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    { "src": "api/index.js", "use": "@vercel/node" },
    { "src": "index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index.js" },
    { "src": "/health", "dest": "/api/index.js" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

## ANIMATION KEYFRAMES (include in `animations.css`)

```css
@keyframes fadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn    { from{opacity:0} to{opacity:1} }
@keyframes slideInLeft { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
@keyframes scaleIn   { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
@keyframes blurSharp { from{filter:blur(8px);opacity:0.5} to{filter:blur(0);opacity:1} }
@keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
```

---

## RULES

### Do:
- Use `rel="noopener noreferrer"` on all external links
- Use `try/catch` on all async operations (fetch, clipboard, mongoose queries)
- Use `aria-label` on every icon button
- Use `role="alert"` on error messages
- Cache MongoDB connection for Vercel serverless reuse (`let isConnected`)
- Fire `fetch('/api/projects')` immediately on page load, not on scroll
- Add `.env` and `node_modules/` to `.gitignore`
- Remove all `console.log()` before deploying

### Do NOT:
- Use any frontend JS framework (React, Vue, Angular, jQuery)
- Use raw hex values outside `variables.css`
- Use `localStorage` or `sessionStorage`
- Store `MONGODB_URI` anywhere in source code — env var only
- Use `innerHTML` with dynamic data from the API (sanitize or use `textContent`/`createElement`)
- Use `eval()` or `new Function()`
- Ship without running Lighthouse (target: Performance ≥ 90, Accessibility ≥ 90)
