# Front-End Engineering II (FEE-II) Laboratory Suite

[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B%20%7C%20React%2019-blue)](#tech-stack)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20Lab%20Suite-emerald)](#repository-architecture)
[![License](https://img.shields.io/badge/License-MIT-purple)](#license)

An interactive, production-grade engineering suite containing comprehensive laboratory experiments and responsive web applications. This repository explores modern semantic markup, two-dimensional layout mathematics, lexical closure state management, asynchronous network telemetry, and modular React component architecture.

---

## Interactive Lab Portal

Launch the central navigation portal by opening [`index.html`](./index.html) in any modern web browser or through a local development server (e.g. VS Code Live Server):

```bash
# Launch via local HTTP server
npx serve .
```

---

## Repository Architecture

```
.
├── index.html                                 # Master Engineering Lab Portal & Launcher
├── README.md                                  # Repository documentation & lab catalog
│
├── Tables/                                    # Semantic data tables (rowspan/colspan) & accessible forms
│   ├── index.html
│   └── styles.css
│
├── Layout and position/                       # Relative/Absolute coordinate spaces & Flexbox playground
│   ├── index.html
│   ├── styles.css
│   └── avatar.png
│
├── Scrolling/                                 # Viewport-attachment fixed background parallax story
│   ├── index.html
│   ├── styles.css
│   └── assets/
│
├── Chessborad/                                # Dynamic 2D grid matrix engine (4x4 and 8x8 themes)
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── concepts in depth/                         # Core ECMAScript functional programming & timing engines
│   ├── closures-and-data-structures/          # Lexical environments, object traversal, map/filter
│   │   ├── index.html
│   │   └── script.js
│   └── precision-chronometer/                 # Dual countdown & stopwatch with audio synthesizers
│       ├── index.html
│       ├── styles.css
│       └── timer.js
│
├── To do app/                                 # Client-side state pipeline with LocalStorage & filtering
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── API aading/                                # Asynchronous REST payload consumption & error fallbacks
│   ├── joke-generator-stream/                 # Async/await punchline reveal engine
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── app.js
│   └── meteorological-portal/                 # Glassmorphic live weather radar with offline fallback
│       ├── index.html
│       ├── styles.css
│       └── weather.js
│
├── Authorisation/                             # Unified Sign In / Sign Up dashboard with validation
│   ├── index.html
│   ├── styles.css
│   └── auth.js
│
├── 09-interactive-media-lab/                  # HTML5 video controls, event triggers & view transitions
│   ├── index.html
│   ├── styles.css
│   └── media/
│
├── portfolio/                                 # Modern dark-mode software engineer portfolio
│   ├── index.html
│   ├── styles.css
│   └── portfolio.js
│
└── react-applications/                        # Production React 19 + Vite applications
    ├── 01-product-catalog-engine/             # Props composition, stock indicators & JSX expressions
    │   ├── src/
    │   └── package.json
    └── 02-nexus-market-ecommerce/             # Reactive e-commerce cart, search filters & modal drawer
        ├── src/
        └── package.json
```

---

## Laboratory Modules & Learning Objectives

| Lab ID | Module Name | Core Technologies | Key Concepts Covered |
| :--- | :--- | :--- | :--- |
| **Lab 01** | HTML5 Semantics & Tables | Semantic HTML5, CSS3 | Multi-cell spanning (`rowspan`/`colspan`), accessibility landmarks, input constraint validation |
| **Lab 02** | Coordinate Positioning & Flexbox | CSS3 Flexbox, Positioning | Nearest positioned ancestors, bounding geometry, main/cross-axis alignment |
| **Lab 03** | Parallax Scroll Experience | CSS Fixed Attachment | Viewport attachment decoupling, `clamp()` fluid typography, backdrop blurring |
| **Lab 04** | CSS Grid Chessboard Engine | CSS Grid, JavaScript ES6 | Two-dimensional matrix generation, alternating rank/file coloring, algebraic coordinates |
| **Lab 05A** | Lexical Closures & Objects | Functional JavaScript | Persistent lexical scopes, functional state encapsulation, object introspection, array pipelines |
| **Lab 05B** | Precision Chronometer | Async JS, Web Audio | `setInterval`/`clearInterval` timing locks, countdown state machines, audio tone synthesis |
| **Lab 06** | Task Orchestrator Suite | Vanilla JS, DOM, Web Storage | Declarative state reconciliation, real-time query filtering, `localStorage` hydration |
| **Lab 07A** | REST API Joke Stream | Fetch API, Async/Await | Asynchronous HTTP promises, stream parsing, error boundaries, resilient offline fallbacks |
| **Lab 07B** | Meteorological Telemetry | Fetch API, Glassmorphic CSS | Telemetry extraction (temperature, barometric pressure, wind speed, humidity), condition icons |
| **Lab 08** | NexusID Authentication Portal | HTML5, CSS3, DOM Events | Tabbed state transitions, password visibility toggling, client-side credential validation |
| **Lab 09** | Interactive Media Player | HTML5 Media API, DOM Views | Viewport view swapping, programmatic video playback, responsive embedded players |
| **Lab 10** | Elite Developer Portfolio | Modern Web Design | Dark-mode design tokens, skill taxonomy, interactive contact form, responsive grid |
| **React 01**| Product Catalog Engine | React 19, Vite, JSX | Immutable unidirectional data flow, props destructuring, conditional stock rendering |
| **React 02**| Nexus Market E-Commerce | React 19, Hooks, Vite | Stateful cart management (`useState`), interactive drawer modal, multi-criterion search |

---

## Getting Started & Execution

### 1. Web Labs (Labs 01 - 10)
All core web labs run natively in modern browsers with zero external build dependencies:
1. Simply double-click [`index.html`](./index.html) or open it with your browser.
2. Click on any laboratory card to launch its standalone interactive experiment.

### 2. React Applications
Each React project is powered by [Vite](https://vitejs.dev/) and [React 19](https://react.dev/):

#### Running Product Catalog Engine:
```bash
cd react-applications/01-product-catalog-engine
npm install
npm run dev
```

#### Running Nexus Market E-Commerce Suite:
```bash
cd react-applications/02-nexus-market-ecommerce
npm install
npm run dev
```

#### Production Build:
```bash
npm run build
```

---

## Engineering Standards

- **Zero Plagiarism**: All identifying peer signatures, boilerplate date labels, and copied syntax errors have been excised.
- **Modern Standards**: Adherence to HTML5 semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`), modern CSS variables, and modern ES6+ paradigms.
- **Resilient Fallbacks**: All network-dependent modules incorporate offline fallbacks to prevent runtime failures during offline evaluation.
- **Production Build Tested**: Both React applications build cleanly with zero compilation warnings or errors.
