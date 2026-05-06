# Backend Document
## Yaahvi Riddhish Parekh — Full Stack Developer Portfolio
### Version 2.0 — Node.js / Express.js / MongoDB

---

## Section 1: Tech Stack

### Overview

This portfolio is a **full-stack application**. The frontend (HTML/CSS/JS) is served as static files. The backend is a **Node.js + Express.js** REST API that connects to **MongoDB Atlas** to store and serve project data. Both frontend and backend are deployed on **Vercel**.

---

### Full Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | UI, animations, API consumption |
| **Backend Runtime** | Node.js (v18+) | Server-side JavaScript runtime |
| **Backend Framework** | Express.js (v4.x) | REST API routing and middleware |
| **Database** | MongoDB Atlas (cloud) | Stores project details |
| **ODM** | Mongoose (v7.x) | Schema definition, validation, queries |
| **Environment Config** | dotenv | Manage environment variables locally |
| **Deployment** | Vercel | Hosts frontend static files + API as Serverless Functions |
| **Version Control** | Git + GitHub | Source code management |

---

### Why This Stack?

- **Node.js + Express.js** — Yaahvi's primary backend stack; lightweight, fast, and perfect for a REST API
- **MongoDB** — Schema-flexible, cloud-hosted on Atlas, free tier available; ideal for project data that may grow and evolve
- **Mongoose** — Adds schema validation and clean query syntax on top of MongoDB
- **Vercel** — Supports both static frontend hosting AND Node.js serverless functions from a single repo with zero configuration

---

### Browser APIs Used (Frontend Only)

| API | Used For | Fallback |
|-----|---------|---------|
| `Intersection Observer API` | Scroll-triggered animations | Animations play on load |
| `Clipboard API` (`navigator.clipboard`) | Copy email to clipboard | `mailto:` link |
| `Fetch API` | `GET /api/projects` from Express backend | Error state UI |
| `Canvas 2D API` | Particle starfield background | CSS gradient background |
| `CSS Scroll Snap` | Snap scrolling between sections | Normal scroll |

---

### NPM Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

| Package | Purpose |
|---------|---------|
| `express` | HTTP server and routing |
| `mongoose` | MongoDB ODM — schema, validation, queries |
| `dotenv` | Load `MONGODB_URI` from `.env` in local dev |
| `cors` | Allow frontend origin to call the API (cross-origin) |
| `nodemon` | Auto-restart server on file changes during development |

---

## Section 2: Backend Structure

### 2A. Database Schema

The database has **one collection: `projects`**.

#### Project Schema (Mongoose)

```js
// api/models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxLength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxLength: [500, 'Description cannot exceed 500 characters'],
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'Tech stack must have at least one technology',
      },
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub URL is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    order: {
      type: Number,
      default: 0,  // lower number = appears first
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt automatically
  }
);

module.exports = mongoose.model('Project', projectSchema);
```

#### Sample Document (MongoDB)

```json
{
  "_id": "64abc123def456789012",
  "title": "E-Commerce Platform",
  "description": "A full-stack shopping platform built with Node.js and MongoDB, featuring user authentication and payment integration.",
  "techStack": ["Node.js", "Express.js", "MongoDB", "JavaScript", "CSS"],
  "liveUrl": "https://mystore.vercel.app",
  "githubUrl": "https://github.com/yaahviparekh/ecommerce",
  "imageUrl": "https://res.cloudinary.com/yaahvi/image/upload/ecommerce.png",
  "order": 1,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 2B. API Endpoints

The API is built with Express.js and runs as Vercel Serverless Functions.

#### Base URL
- **Local:** `http://localhost:3000`
- **Production:** `https://yaahvi-portfolio.vercel.app`

---

#### `GET /api/projects`
Fetch all projects, sorted by `order` field ascending.

**Request:** No body, no auth required.

**Response 200:**
```json
[
  {
    "_id": "64abc123...",
    "title": "Project Name",
    "description": "Short description.",
    "techStack": ["Node.js", "MongoDB"],
    "liveUrl": "https://...",
    "githubUrl": "https://github.com/...",
    "imageUrl": "https://...",
    "order": 1,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

**Response 500:**
```json
{ "error": "Failed to fetch projects" }
```

---

#### `GET /api/projects/:id`
Fetch a single project by MongoDB `_id`.

**Response 200:** Single project object (same shape as above)
**Response 404:** `{ "error": "Project not found" }`
**Response 500:** `{ "error": "Server error" }`

---

#### `GET /health`
Health check — confirms API and DB connection are alive.

**Response 200:**
```json
{ "status": "ok", "timestamp": "2024-01-15T10:30:00.000Z" }
```

---

### 2C. Express API Structure

```js
// api/index.js — Entry point for Vercel Serverless Function

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projects');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json());

// MongoDB connection (cached for serverless reuse)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

// Routes
app.use('/api/projects', async (req, res, next) => {
  await connectDB();
  next();
}, projectRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
```

```js
// api/routes/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

---

### 2D. Database Seed Script

Projects are seeded directly into MongoDB for v1 (no admin UI).

```js
// scripts/seed.js
// Run locally: node scripts/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../api/models/Project');

const projects = [
  {
    title: 'Project One',
    description: 'A full-stack web application built with Node.js and MongoDB.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    liveUrl: 'https://project-one.vercel.app',
    githubUrl: 'https://github.com/yaahviparekh/project-one',
    imageUrl: '',
    order: 1,
  },
  // Add more projects here
];

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log('✅ Database seeded successfully');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
```

---

### 2E. Frontend API Consumption

```js
// js/projects.js — Frontend fetches from the Express API

const API_URL = '/api/projects';

const fetchProjects = async () => {
  const grid = document.getElementById('projects-grid');

  // Show skeleton loaders
  renderSkeletons(grid, 3);

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API error');
    const projects = await res.json();

    grid.innerHTML = '';

    if (projects.length === 0) {
      grid.innerHTML = '<p class="projects-empty">No projects yet — check GitHub for updates.</p>';
      return;
    }

    projects.forEach((project, i) => {
      const card = createProjectCard(project);
      card.style.animationDelay = `${i * 100}ms`;
      card.classList.add('animate-in');
      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = `
      <div class="projects-error" role="alert">
        <p>Projects coming soon — <a href="https://github.com/yaahviparekh" target="_blank" rel="noopener noreferrer">check GitHub for updates</a>.</p>
      </div>`;
  }
};

// Fire immediately on page load — data ready before user scrolls to Projects
fetchProjects();
```

---

### 2F. Environment Variables

```bash
# .env (local development only — NEVER commit this file)
MONGODB_URI=mongodb+srv://yaahvi:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
FRONTEND_ORIGIN=http://localhost:5500
NODE_ENV=development
```

**Vercel production environment variables** (set in Vercel dashboard → Settings → Environment Variables):

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `FRONTEND_ORIGIN` | `https://yaahvi-portfolio.vercel.app` |
| `NODE_ENV` | `production` |

---

### 2G. Full File & Directory Structure

```
portfolio/
├── index.html                  # Main SPA entry point
├── css/
│   ├── variables.css           # CSS custom properties (design tokens)
│   ├── reset.css               # CSS normalize/reset
│   ├── layout.css              # Scroll snap, section grid structure
│   ├── hero.css                # Hero section styles
│   ├── about.css               # About section styles
│   ├── skills.css              # Skills grid + card styles
│   ├── projects.css            # Project cards, skeleton, error states
│   ├── contact.css             # Contact panel styles
│   ├── nav.css                 # Dot navigation styles
│   ├── animations.css          # @keyframes definitions
│   └── responsive.css          # All media queries
├── js/
│   ├── config.js               # Contact info, personal data (email, github, linkedin)
│   ├── typewriter.js           # Typewriter effect + blinking cursor
│   ├── particles.js            # Canvas starfield particle system
│   ├── scrollObserver.js       # Intersection Observer for all sections
│   ├── dotNav.js               # Dot nav active state tracking
│   ├── projects.js             # fetch('/api/projects'), render cards, skeleton, error
│   └── clipboard.js            # Email copy to clipboard + toast logic
├── assets/
│   ├── icons/                  # SVG tech icons (HTML, CSS, JS, Node.js, etc.)
│   ├── profile.jpg             # Profile image
│   └── favicon.ico             # Site favicon
├── api/
│   ├── index.js                # Express app entry point (Vercel Serverless Function)
│   ├── models/
│   │   └── Project.js          # Mongoose Project schema
│   └── routes/
│       └── projects.js         # GET /api/projects, GET /api/projects/:id
├── scripts/
│   └── seed.js                 # Database seed script (run locally)
├── vercel.json                 # Vercel routing + security headers config
├── package.json                # Node.js project manifest
├── .env                        # Local environment variables (gitignored)
├── .gitignore                  # node_modules, .env, .DS_Store
└── README.md                   # Setup and deployment instructions
```

---

### 2H. Vercel Configuration

```json
// vercel.json
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
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

### 2I. Deployment Pipeline

```
Developer pushes to GitHub (main branch)
              ↓
Vercel detects push via webhook
              ↓
Vercel builds:
  - Static files (HTML/CSS/JS) → Vercel CDN
  - api/index.js → Vercel Serverless Function (Node.js runtime)
              ↓
Environment variables injected from Vercel dashboard
              ↓
HTTPS enforced automatically
              ↓
Frontend live at: https://yaahvi-portfolio.vercel.app
API live at: https://yaahvi-portfolio.vercel.app/api/projects
```
