# Website Flow Document
## Yaahvi Riddhish Parekh — Full Stack Developer Portfolio
### Version 2.0 — Full Stack Architecture

---

## Overview

This document describes the complete user journey through the portfolio — every interaction, animation state, API call, loading state, and decision point a user experiences from the moment the page loads to the moment they leave or convert.

---

## Flow Map (High-Level)

```
[Browser Opens URL]
        ↓
[HTML/CSS/JS loads from Vercel CDN]
        ↓
[Page Load → Hero section animates in]
[SIMULTANEOUSLY → GET /api/projects fires in background]
        ↓
[User scrolls or clicks dot nav]
        ↓
[Section 2: About → scroll-triggered animations]
        ↓
[Section 3: Skills → domino card entry]
        ↓
[Section 4: Projects → skeleton loaders → API response → cards render]
        ↓
[Section 5: Contact → glassmorphic panel]
        ↓
[User clicks Email / GitHub / LinkedIn → Conversion]
```

---

## Detailed Step-by-Step User Flow

---

### PHASE 1 — Page Load & Hero (Section 1: Home)

**Step 1.1 — URL Loads**
- Browser fetches the static HTML/CSS/JS bundle from Vercel CDN
- Dark obsidian background (`#0f172a`) renders immediately — no white flash
- Particle/starfield canvas begins animating
- **Simultaneously in the background:** `fetch('/api/projects')` fires immediately so data is ready by the time the user reaches Section 4

**Step 1.2 — Hero Entrance Animation Sequence**

| Time | Event |
|------|-------|
| `0.0s` | Full name *"Yaahvi Riddhish Parekh"* fades in |
| `0.5s` | Typewriter begins typing subtitle in cyan |
| `1.2s` | Subheading slides up and fades in |
| `1.5s` | *"View My Work"* CTA button drops in |

**Step 1.3 — User Reads Hero**
- Massive negative space directs focus entirely to name, role, and tagline

**Step 1.4 — User Hovers CTA Button**
- Button: outline-only → smooth cyan fill sweeps left to right
- Text color inverts to dark canvas color

**Step 1.5 — User Clicks "View My Work"**
- Page snap-scrolls directly to Section 4 (Projects)
- OR: User ignores CTA and manually scrolls section by section

**Step 1.6 — User Notices Dot Navigation**
- 5 dots visible on right edge — Dot 1 is active (scaled 1.5×, cyan)

---

### PHASE 2 — About Section (Section 2)

**Step 2.1 — Section Enters Viewport (25% threshold)**
- Intersection Observer triggers entrance animations

**Step 2.2 — Staggered Entrance Sequence**

| Delay | Element | Animation |
|-------|---------|-----------|
| `+0ms` | "About Me" heading | Slides up, fades in |
| `+0ms` | Profile image | Slides in from left; blurry → sharp focus |
| `+150ms` | Bio paragraph | Slides up, fades in |
| `+300ms` | Monospace competency tags | Slides up, fades in |

**Step 2.3 — User Reads Bio**
- Left: profile image with purple offset shadow (40% column)
- Right: bio text with `[Full Stack Developer]` and `[Problem Solver]` styled as cyan monospace tags (60% column)

**Step 2.4 — User Hovers Profile Image**
- Scales to `1.05×`; purple drop-shadow dynamically extends around the border

**Step 2.5 — Dot 2 becomes active**

**Step 2.6 — User scrolls to Section 3**

---

### PHASE 3 — Skills Section (Section 3)

**Step 3.1 — Section Enters Viewport**
- Intersection Observer triggers

**Step 3.2 — Staggered Domino Entry**
- Grid quadrants and individual skill nodes cascade in diagonally (top-left → bottom-right)
- Each uses `scaleIn` keyframe with increasing `animation-delay`

**Step 3.3 — User Sees 2×2 Skills Grid**

```
┌─────────────────────┬─────────────────────┐
│   LANGUAGES         │   FRAMEWORKS        │
│  HTML  CSS  JS  Java│  Node.js  Express.js│
├─────────────────────┼─────────────────────┤
│   DATABASE          │   TOOLS             │
│  MongoDB  Mongoose  │  GitHub  GH Pages   │
│                     │  Vercel             │
└─────────────────────┴─────────────────────┘
```

**Step 3.4 — User Hovers Skill Node**
- Card scales up slightly
- Border glows cyan (`box-shadow: 0 0 20px rgba(56,189,248,0.35)`)
- Proficiency bar animates from `0%` → target% in cyan at bottom of card

**Step 3.5 — Dot 3 becomes active**

**Step 3.6 — User scrolls to Section 4**

---

### PHASE 4 — Projects Section (Section 4)

This is the only section with real backend and database communication.

**Step 4.1 — API Call (fires on page load, not on section entry)**
```
Frontend → GET /api/projects → Express.js API → MongoDB Atlas → JSON response
```
- The `fetch('/api/projects')` call was made in Step 1.1 (page load), so the response may already be cached in a JS variable by the time the user reaches this section

**Step 4.2A — If API is still loading when user arrives:**
- Skeleton shimmer placeholder cards display (ghost cards with animated shimmer effect)
- These indicate content is loading without breaking the visual experience

**Step 4.2B — If API has already responded:**
- Cards render immediately with staggered fade-up animation

**Step 4.3 — API Responds Successfully**
- `GET /api/projects` returns array of project objects from MongoDB
- Frontend JavaScript maps over the array and injects project cards into the DOM
- Each card contains: title, description, tech stack pill tags, Live Demo button, GitHub button, thumbnail image

**Step 4.4 — Cards Animate In**
- Each project card fades up with increasing `animation-delay` (staggered, 100ms apart)

**Step 4.5 — User Reads Project Cards**
- Scans project title, description, and tech stack chips
- Decides whether to click Live Demo or GitHub repo link

**Step 4.6 — User Clicks "Live Demo" on a Project Card**
- `window.open(liveUrl, '_blank')` — opens in new tab
- User lands on the live project

**Step 4.7 — User Clicks "GitHub" on a Project Card**
- `window.open(githubUrl, '_blank')` — opens in new tab
- User lands on the project repo

**Step 4.8A — API Error State**
- If `GET /api/projects` fails (network error, server down, MongoDB timeout):
- Error state renders: *"Projects coming soon — check GitHub for updates"*
- GitHub link button displayed as fallback

**Step 4.9 — Dot 4 becomes active**

---

### PHASE 5 — Contact Section (Section 5)

**Step 5.1 — Section Enters Viewport**
- Glassmorphic panel fades in at center of dark screen
- High background blur creates a floating premium feel

**Step 5.2 — User Sees Contact Panel**
- Three circular icon buttons: Email, GitHub, LinkedIn
- Muted subtext: *"Let's build something amazing together"*

**Step 5.3 — User Hovers Icon**
- Icon floats up `5px` (`translateY(-5px)`)
- Purple shadow pool appears beneath the button
- ~200ms smooth CSS transition

**Step 5.4A — User Clicks Email Icon**
1. `navigator.clipboard.writeText(email)` is called
2. Icon briefly switches to a ✓ checkmark
3. Toast slides up from bottom: *"Copied to clipboard!"*
4. Toast auto-dismisses after 2.5 seconds
5. User pastes email address into their mail client
6. **Fallback:** if Clipboard API is unavailable → `window.location.href = 'mailto:...'`

**Step 5.4B — User Clicks GitHub Icon**
- `window.open(githubUrl, '_blank')` with `rel="noopener noreferrer"`
- User lands on Yaahvi's GitHub profile

**Step 5.4C — User Clicks LinkedIn Icon**
- `window.open(linkedinUrl, '_blank')` with `rel="noopener noreferrer"`
- User lands on Yaahvi's LinkedIn profile

**Step 5.5 — Dot 5 becomes active**

**Step 5.6 — End of page. User exits via:**
- Clicking a social link (conversion)
- Scrolling back up via dot nav
- Closing the browser tab

---

### PHASE 6 — Non-Linear Navigation (Dot Nav — Available at All Times)

| Click | Destination | Notes |
|-------|------------|-------|
| Dot 1 | Hero | Smooth snap-scroll |
| Dot 2 | About | Triggers animations if first visit |
| Dot 3 | Skills | Triggers animations if first visit |
| Dot 4 | Projects | Shows skeleton if API not yet resolved |
| Dot 5 | Contact | Glassmorphic panel ready |

**Active state rule:** The dot for the section currently occupying the majority of the viewport scales to `1.5×` and turns cyan. All others are base size and dim.

---

## Backend Interaction Flow (Projects API)

```
Page Load
    │
    └── fetch('/api/projects')  ← fires immediately, async
            │
            ├── [Pending] → skeleton shimmer cards shown in Projects section
            │
            ├── [Success 200] → JSON array of projects
            │        │
            │        └── JS renders project cards into DOM
            │             └── staggered fade-up animation
            │
            └── [Error / Timeout] → error message rendered
                     └── fallback GitHub link shown
```

**MongoDB → Express → Frontend data shape:**
```json
[
  {
    "_id": "64abc123...",
    "title": "Project Name",
    "description": "Short description of the project.",
    "techStack": ["Node.js", "MongoDB", "Express.js"],
    "liveUrl": "https://project.vercel.app",
    "githubUrl": "https://github.com/yaahvi/project",
    "imageUrl": "https://...",
    "order": 1
  }
]
```

---

## Edge Cases & States

| Scenario | Behavior |
|----------|----------|
| API responds before user reaches Projects section | Cards render instantly with no skeleton shown |
| API times out | Error state with GitHub fallback link |
| MongoDB returns empty array | "No projects yet — check GitHub" message shown |
| Clipboard API blocked (HTTP / old browser) | `mailto:` fallback fires |
| User on mobile (touch) | Swipe up/down navigates sections; dot nav tappable |
| Section animations already played | One-shot via Intersection Observer (no replay on re-scroll) |
| Very slow connection | Particle canvas degrades gracefully; text readable immediately |
| User refreshes mid-page | Returns to Section 1 (Hero); API call re-fires |

---

## Conversion Events (Priority Order)

1. **Email copied** — highest intent signal
2. **LinkedIn opened** — professional contact
3. **GitHub profile opened** — technical evaluation
4. **Live Demo clicked** (on a project card) — project interest
5. **GitHub repo clicked** (on a project card) — code review
6. **"View My Work" clicked** — engagement, scrolls to Projects
