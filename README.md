# Rui Chen Portfolio

## Project Summary

Rui Chen Portfolio is a high-end personal portfolio website for Rui Chen, a computer science student and early-stage builder focused on local-first macOS tools, AI-native software, and spatial computing experiments.

The site uses a cinematic dark interface, oversized high-contrast typography, an acid-lime futuristic accent, a subtle pointer effect, and an abstract Dot Wave Field hero background instead of a portrait. It is intended to feel like a premium creative engineering portfolio, not a generic resume page.

## Primary Goals

- Present Rui as a computer science student and early-stage builder focused on practical AI-native tools and interactive systems.
- Feature WorkTrace and ClipDock as the strongest project stories.
- Include the VisionOS / AR Billiards Assistant concept as a spatial computing direction.
- Use SURF, XJTLU, NVIDIA CUDA, and TOEFL evidence as credibility support without letting certificates dominate.
- Build a complete responsive site with meaningful sections: Hero, Selected Projects, Research/Awards/Certificates, Technical Stack, About, Contact, and Footer.

## Content Sources

Project source material:

- `/Users/bird/Desktop/WorkTrace`
- `/Users/bird/Desktop/ClipDock`
- `/Users/bird/Desktop/Porfolio`

Note: the evidence folder found on Desktop is named `Porfolio` rather than `Portfolio`. Its materials are copied into this project under `public/assets/evidence/`.

Available evidence assets:

- NVIDIA CUDA Python certificate
- TOEFL/MyBest score image
- XJTLU SURF school winner certificate
- Five SURF university promotion screenshots
- WorkTrace screenshot
- ClipDock screenshot

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- lucide-react

## How To Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL, usually:

```text
http://localhost:5173
```

To verify a production build:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

## Current Status

Production-hardened first working version implemented.

The app includes a responsive one-page portfolio, a cleaner centered hero, atmospheric Three.js Dot Wave Field, lightweight circular pointer effect, selected project sections with real WorkTrace and ClipDock content, supporting research/certificate evidence, grouped technical stack, about, contact, and footer sections.

The production hardening pass reduced unnecessary WebGL work, capped the crystal render cadence, lowered particle count and pixel ratio, paused rendering when the tab is hidden, strengthened cleanup for animation frames/listeners/WebGL resources, bounded pointer ripple DOM nodes and timers, and added a static reduced-motion fallback.

The latest homepage interaction pass makes the top navigation more legible, adds intentional acid-lime hover feedback, strengthens Hero CTA hover states with white-fill inversion, and makes the pointer ripple more visible while keeping the effect lightweight and behind the content.

The hero background has been revised from the earlier Crystal Memory object into a Dot Wave Field: a calm sea-like field of small glowing dots that breathe gently and create subtle pointer-responsive ripples behind the typography.

The Dot Wave Field pointer response has been strengthened so normal mouse movement creates clearer water-like ripples, with nearby dots rising, brightening, and smoothly settling back into the calm field.

The latest motion tuning softens the Dot Wave Field interaction into a calmer Apple-like response: lower ripple amplitude, softer brightness, smoother pointer damping, higher render cadence, and slower recovery.

The final homepage polish refactors the Dot Wave Field into separated idle motion, pointer pressure, ripple, and renderer systems. Motion now runs at the display refresh rate with delta-time damping, lower interaction force, smoother afterglow, and reusable buffers for stable performance.

The site now includes a Fiverr hiring path for freelance portfolio and rapid web prototype work. Visitors can use the header `HIRE ME` button or the compact freelance CTA near the bottom of the page to open Rui's Fiverr gig: `https://www.fiverr.com/guubird/build-a-premium-interactive-portfolio-website-with-react-and-ai`.

Verified:

- `npm install` completed.
- `npm run build` completed successfully.
- `npm run preview` completed successfully.
- Local browser smoke test completed after starting the Vite dev server.
- The page title, hero content, Three.js canvas, project content, and evidence images were confirmed in browser.
- Rui Chen naming was scanned across source, docs, and generated build output.

## Implementation Notes

- The hero uses an abstract Dot Wave Field instead of a human image or central object.
- The hero prioritizes Rui Chen's name, corrected identity line, short intro, and project tags.
- WorkTrace and ClipDock are positioned as the strongest project proof.
- Certificates and screenshots support credibility but are visually secondary.
- The site keeps the high-contrast cinematic inspiration from EathanPortfolio while using Rui-specific engineering language, structure, and content.
- Reduced-motion CSS is included and the Three.js component reduces activity when users prefer reduced motion.
- Contact email: `15980825997@163.com`.
- Fiverr hire link: `https://www.fiverr.com/guubird/build-a-premium-interactive-portfolio-website-with-react-and-ai`.
- Deployment notes are documented in `DEPLOYMENT.md`.

## Future Improvements

- Add project detail pages or modal case studies for WorkTrace and ClipDock.
- Add live GitHub links if the repositories are published.
- Add a richer VisionOS/AR Billiards Assistant case study with diagrams or prototype media.
- Add downloadable resume integration once the preferred public resume is finalized.
- Add image lightbox behavior for certificates and SURF evidence.
- Add a custom Open Graph image once a public domain and final visual asset are available.
- Code split Three.js if bundle size becomes a deployment concern.
- In the future, dots could become interactive memory/project nodes, such as linking to WorkTrace, ClipDock, VisionOS / AR, or GitHub project pages. Do not implement this yet.
