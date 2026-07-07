# Development Log

## 2026-07-07: First Working Version

Built the first working version of Rui Chen's personal portfolio website.

## What Was Built

- Created the project handoff documents before implementation:
  - `README.md`
  - `BLUEPRINT.md`
  - `PROMPT.md`
  - `DECISIONS.md`
  - `planning-with-files/PLAN.md`
  - `planning-with-files/COMPONENTS.md`
  - `planning-with-files/DESIGN_SYSTEM.md`
  - `planning-with-files/TODO.md`
- Created a Vite + React + TypeScript app.
- Configured Tailwind CSS, Framer Motion, Three.js, and lucide-react.
- Copied evidence assets from `/Users/bird/Desktop/Porfolio` into `public/assets/evidence`.
- Added WorkTrace and ClipDock screenshots as project evidence.
- Built a cinematic hero with oversized typography and a pointer-reactive Three.js crystal.
- Added DOM-based pointer ripple effects.
- Built complete sections: Hero, Selected Projects, Research / Awards / Certificates, Technical Stack, About, Contact, and Footer.
- Added responsive styling for desktop, tablet, and mobile.
- Added reduced-motion behavior in CSS and reduced Three.js scene activity when motion reduction is preferred.

## Source Material Used

- WorkTrace `PROJECT_BRAIN.md`, `ARCHITECTURE.md`, and `DEVELOPMENT_LOG.md`.
- ClipDock `README.md` and `DEVELOPMENT_LOG.md`.
- Evidence images from the Desktop `Porfolio` folder.
- Desktop screenshots: `Worktrace.png` and `Clipdock.png`.

## Design Decisions

- Used EathanPortfolio only as inspiration for cinematic contrast, scale, acid-lime accents, and interactive energy.
- Replaced the portrait/subject image concept with a custom abstract 3D crystal.
- Kept WorkTrace and ClipDock as the strongest project section.
- Kept certificates and university screenshots as credibility evidence rather than primary hero content.
- Used the public contact email `15980825997@163.com`.
- Treated the Desktop folder typo `Porfolio` as the evidence source and delivered the new project to the requested `Portfolio` folder.

## Verification

- Ran `npm install`.
- Ran `npm run build` successfully.
- Started the Vite dev server.
- Opened the local site in the in-app browser.
- Confirmed page title, hero text, Three.js canvas, project content, and evidence images were present.
- No browser console errors were captured during the smoke test.

## Build Note

Vite reports a large JavaScript chunk because the first version bundles Three.js in the main app. This is acceptable for first review and can be improved later with dynamic imports or manual chunking.

## 2026-07-07: Identity And Visual Cleanup

### What Changed

- Corrected positioning to: computer science student and early-stage builder focused on local-first macOS tools, AI-native software, and spatial computing experiments.
- Updated the contact email to `15980825997@163.com`.
- Removed the extra hero status card.
- Reworked the hero into a cleaner centered composition prioritizing RUI CHEN, identity line, intro copy, and project tags.
- Kept the abstract 3D crystal, but moved it into the background atmosphere so it no longer blocks the layout.
- Replaced the square pointer ripple with a softer, circular, lower-frequency effect.
- Reduced crystal particle count for a lighter visual load.
- Reorganized the stack section into structured groups: Native macOS, AI-native tools, Web / Creative frontend, Spatial computing, and Research & foundations.
- Updated README, PROMPT, and BLUEPRINT with the corrected identity and design rules.

### Verification

- Ran `npm run build` successfully after the cleanup.
- Synced the corrected project to `/Users/bird/Desktop/Portfolio`.
- Ran `npm run build` successfully in the delivered Desktop folder.
- Verified the local dev server in browser at `http://127.0.0.1:5174/`.
- Confirmed the corrected identity line, email, grouped stack, Three.js canvas, and absence of stale identity text.
- Captured a hero screenshot and confirmed the hero is cleaner, centered, and free of the old status card.

## 2026-07-07: Production Hardening And Deployment Prep

### What Changed

- Replaced the remaining uppercase old-name instruction in `PROMPT.md` with `RUI CHEN`.
- Added concise SEO metadata, Open Graph basics, Twitter summary metadata, and theme color.
- Reduced Three.js GPU cost with a lower pixel-ratio cap, lower-detail crystal geometry, fewer atmospheric particles, and low-power renderer preference.
- Capped the crystal render cadence near 30fps and paused rendering while the document is hidden.
- Improved reduced-motion behavior so the crystal renders as a static atmosphere and the pointer ripple is disabled.
- Strengthened Three.js cleanup for animation frames, resize observer, event listeners, geometry, materials, renderer, and WebGL context release.
- Bounded pointer ripple DOM nodes, slowed ripple frequency, and cleaned up pending timers on unmount.
- Added `DEPLOYMENT.md` with Vercel, Netlify, and GitHub Pages deployment notes.
- Updated `README.md` with production commands, hardening notes, verification status, limitations, and future improvements.

### Verification

- Ran `npm run build` successfully after the hardening pass.
- Ran `npm run preview` successfully against the production build.
- Verified desktop, tablet, and mobile viewports in browser.
- Checked the browser console during preview and found no obvious app errors.
- Scanned source, docs, and generated build output for stale old-name and old package-name references.

### Known Limitations

- The production bundle can still show Vite's large chunk warning because Three.js is bundled into the main app.
- No custom Open Graph image is configured yet.
- GitHub Pages may require a Vite `base` setting if deployed under a repository subpath.
