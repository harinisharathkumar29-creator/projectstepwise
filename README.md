# Stepwise AI 🚀

> **"Don't just tell me what to do. Teach me how to do it."**  
> *From confusing tools to a working application, one guided step at a time.*

Stepwise AI is a personalized, beginner-friendly learning platform designed for students, first-time developers, and hackathon participants. It transforms high-level development goals into structured, interactive step-by-step guides with exact commands, underlying explanations, expected outcomes, verification checklists, and targeted troubleshooting.

---

## ✨ Features

- **Personalized Guide Generator**: Specify your project goal, choose the tools you actually have, set your experience level, and select a learning depth (*Quick*, *Guided*, or *Deep Learning*).
- **Interactive Tool Map & Explainers**: Explore 16+ tools (Google Antigravity, GitHub, Vercel, Gemini AI, VS Code, Terminal, React, Vite, etc.) with beginner-friendly breakdowns of purpose, inputs, outputs, and relationships.
- **Interactive Tutorial Workspace**:
  - Live progress tracking (in-memory React session)
  - Step navigation with completed checkmarks
  - Single-click command copying with clipboard confirmation
  - "Where to go", "Action", "Why this matters", "Expected result", and "How to verify" breakdowns
  - Common pitfalls and recovery steps for each stage
  - Integrated "I'm stuck" modal for instant troubleshooting without losing your spot
  - Final completion screen with verification checklist
- **Slide-Style Animated Walkthrough**:
  - Play / Pause / Step / Restart controls
  - Real-time workflow node highlighting (Antigravity → Terminal → GitHub → Vercel)
  - CSS-powered lightweight animations with reduced-motion support
- **Dedicated Error Diagnosis Hub**:
  - Paste terminal errors or select common beginner errors (`npm not recognized`, `port in use`, `module not found`, `git push rejected`, `vercel deployment failure`, etc.)
  - Receive actionable diagnostic reports: meaning, likely causes, first safe check, recommended fix, verification, and fallback recovery.
- **Built-in Demo Tutorial**:
  - 13-step comprehensive guide: *"Build and Deploy Your First Website"* (Google Antigravity → GitHub → Vercel)
  - Works 100% offline without requiring an API key or account.
- **Secure Gemini AI Integration**:
  - Optional dynamic tutorial generation using Google's Gemini Flash model
  - Client-safe design with graceful fallback to the built-in structured guide whenever an API key is not configured.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev)
- **Linter**: [Oxlint](https://oxc.rs)
- **Styling**: Modern CSS3 (CSS custom properties, glassmorphism, 3D perspective transforms, responsive grid layout)
- **Zero Heavy Dependencies**: No WebGL / Three.js bundle overhead; fast load times and clean bundle size.

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org) (v18 or newer recommended, tested on v24)
- npm (v9 or newer)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/stepwise-ai.git
cd stepwise-ai

# Install dependencies
npm install
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build & Lint
```bash
# Check code quality
npm run lint

# Compile TypeScript and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🔑 Optional Gemini AI Configuration

To enable dynamic AI guide generation:
1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
2. Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/):
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
3. Restart the dev server (`npm run dev`).

> *Note:* If no API key is provided, Stepwise AI runs completely on its built-in knowledge base and demo tutorials with no degraded user experience.

---

## 🌐 Deployment Instructions

### Deploy to GitHub & Vercel

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "feat: complete Stepwise AI MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stepwise-ai.git
git push -u origin main
```

#### Step 2: Deploy on Vercel
1. Log in to [Vercel](https://vercel.com) with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Import your `stepwise-ai` repository.
4. Framework Preset will auto-detect as **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. *(Optional)* Expand **Environment Variables** and add `VITE_GEMINI_API_KEY`.
6. Click **"Deploy"**. Your application will be live at `https://<your-project>.vercel.app` in seconds!
