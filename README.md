# Yaahvi's Portfolio

A modern, high-performance, and visually stunning portfolio website for **Yaahvi Riddhish Parekh**, a Full Stack Developer and Problem Solver.

**Live Demo:** [yaahvi-portfolio.vercel.app](https://yaahvi-portfolio.vercel.app)

---

## 🚀 Features

- **Premium Aesthetics**: Features a dynamic mesh gradient background, noise overlay for texture, and smooth glassmorphism effects.
- **Interactive UI**:
  - **Custom Particle System**: Interactive background canvas using Vanilla JavaScript.
  - **Typewriter Effect**: Dynamic role display in the hero section.
  - **Dot Navigation**: Seamless section-to-section navigation with scroll synchronization.
  - **Theme Toggle**: Support for light and dark modes with fluid transitions.
- **Global Pulse Analytics**: A real-time activity feed tracking visitor counts and locations, powered by a Node.js/Express backend and MongoDB.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing experiences.
- **Performance Optimized**: Built with Vanilla JS and optimized CSS for fast load times and smooth animations.

## 🛠️ Tech Stack

### Frontend
- **HTML5 & CSS3**: Custom design system using CSS variables and modern layout techniques (Grid/Flexbox).
- **JavaScript (ES6+)**: Vanilla JS for all interactive components.
- **Canvas API**: Powering the interactive particle system.

### Backend
- **Node.js & Express**: Handling API requests and server-side logic.
- **MongoDB & Mongoose**: Database for storing and retrieving visitor statistics.
- **Vercel**: Serverless deployment for both frontend and API.

## 📁 Project Structure

```text
├── api/                # Vercel serverless functions (Express API)
├── assets/             # Images and static resources
├── css/                # Modular CSS files (variables, reset, layout, etc.)
├── js/                 # Component-based JavaScript logic
├── scripts/            # Utility scripts (seeding database, etc.)
├── index.html          # Main entry point
└── vercel.json         # Vercel deployment configuration
```

## ⚙️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parekhyaahvi/yaahvi-portfolio.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root and add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Seed the database (Optional):**
   ```bash
   npm run seed
   ```

---

## 📧 Contact

- **Name:** Yaahvi Riddhish Parekh
- **Email:** parekhyaahvi@gmail.com
- **GitHub:** [@parekhyaahvi](https://github.com/parekhyaahvi)
- **LinkedIn:** [Yaahvi Parekh](https://www.linkedin.com/in/yaahvi-parekh)

---
*Built with ❤️ by Yaahvi*
