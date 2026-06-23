# 🌌 Roopak's 3D Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-v3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)

---

## ✨ Features

- 🎮 **Real-time Interactive 3D Models**: Uses Three.js & `@react-three/drei` to render and interact with custom 3D models representing skill categories (React, Python, Node, Git, etc.).
- 🎭 **Cinematic Scroll Animations**: Smooth page transitions, fade-ins, and staggered content revealing driven by GSAP and ScrollTrigger.
- 💼 **Curated Projects Showcase**: Interactive showcases for featured work like:
  - **Nebula Dashboard**: An immersive financial management platform for next-gen digital assets.
  - **Vertex OS**: Experimental operating system UI designed for foldable devices.
  - **Liquid Motion**: An exploration of organic physics-based interactions.
- 📊 **Dynamic Timeline**: A scroll-scaled timeline depicting work experiences, SIH (Smart India Hackathon 2025) achievements, and IEEE student leadership details.
- ✉️ **Integrated Contact Form**: Direct client inquiry and messaging pipeline integrated with **EmailJS**.
- 📱 **Fully Responsive Layout**: Built with mobile-first principles utilizing Tailwind CSS v4's modern utility architecture.

---

## 🛠️ Tech Stack & Key Libraries

- **Core**: [React 19](https://react.dev/) & [Vite 8](https://vite.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) via [`@react-three/drei`](https://github.com/pmndrs/drei) & [`@react-three/postprocessing`](https://github.com/pmndrs/postprocessing)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) & [`@gsap/react`](https://github.com/greensock/react)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Native CSS Custom Properties
- **Form Service**: [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`)

---

## 📂 Repository Structure

```text
rooopak_protfolio/
├── public/                 # Static assets
│   ├── images/             # UI icons, branding logos, and README assets
│   └── models/             # Pre-optimized 3D GLTF/GLB models
├── src/
│   ├── components/         # Reusable UI & 3D Model wrapper components
│   │   ├── models/         # Specific 3D canvas components
│   │   │   ├── contact/
│   │   │   ├── experiences_models/
│   │   │   ├── hero_models/
│   │   │   └── skills_model/
│   │   └── navbar.jsx
│   ├── constants/          # Application data lists (projects, experience, socials)
│   ├── pages/              # Main route views (Home, Expanded Projects, Detailed Expertise)
│   ├── sections/           # Section wrappers (Hero, Showcase, Skills, Experience, Contact)
│   ├── App.jsx             # React router configuration
│   ├── index.css           # Core styling system & utility rules
│   └── main.jsx            # Entry point
├── eslint.config.js        # Code quality rule definitions
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite build engine config
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rouopak/portfolio.git
   cd rooopak_protfolio
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` to see it in action.

### Production Build

To build and optimize the portfolio for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 💼 Experience Highlighted

- **Software Developer** (Jan 2024 - Present): Developing interactive interfaces and responsive full-stack applications with state management and optimized rendering.
- **Smart India Hackathon 2025**: Shortlisted in the **Top 10** teams selected to represent JSSATE Noida. Spearheaded solution ideation and product planning.
- **IEEE Student Member** (Oct 2024 - Feb 2026): Orchestrated student-led hackathons and active technical community initiatives.

---

## 🔗 Let's Connect

- **LinkedIn**: [linkedin.com/in/rooopak](https://www.linkedin.com/in/rooopak/)
- **LeetCode**: [leetcode.com/u/P5bCajrsMq](https://leetcode.com/u/P5bCajrsMq/)
- **GitHub**: [@rouopak](https://github.com/rouopak)

---

![Showcase Footer](public/images/readme-bottom.png)
