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

## 2026-07-08: Homepage Interaction Pass

### What Changed

- Made the primary navigation items more visually obvious with bordered glass treatment and clearer text contrast.
- Added an intentional acid-lime hover state for top navigation with smooth transition, black text inversion, and a restrained glow.
- Strengthened Hero CTA hover feedback for WorkTrace, ClipDock, VisionOS / AR, and CUDA Python with full white background fill, black text, clean border, and slight scale lift.
- Increased the pointer ripple's visibility and responsiveness while keeping it circular, lightweight, bounded, and disabled under reduced-motion preferences.

### Verification

- Ran `npm run build` successfully after the interaction update.

## 2026-07-08: Glass Neural Core Hero Object

### What Changed

- Replaced the earlier solid green rotating crystal with a lighter Glass Neural Core hero object.
- Added a translucent glass orb, glowing internal nodes, thin neural connection lines, and subtle acid-lime / blue-white orbit paths.
- Preserved slow rotation, pointer-responsive movement, reduced-motion fallback, visibility pause, render cadence limiting, and full Three.js cleanup.
- Kept the existing hero layout, text, navigation, CTA buttons, pointer field, and all lower-page content unchanged.

### Verification

- Ran `npm run build` successfully after replacing the hero object.

## 2026-07-08: Crystal Memory Hero Object

### What Changed

- Replaced the Glass Neural Core with a more Rui-specific Crystal Memory concept connected to WorkTrace, local-first memory, AI-native tools, and personal knowledge systems.
- Built an irregular translucent glass crystal rather than a perfect sphere or solid green blob.
- Added glowing memory fragments inside and around the crystal, with sparse connection traces and subtle acid-lime / blue-white data paths.
- Added pointer-reactive memory behavior: nearby points briefly brighten and pulse on mouse movement without adding click behavior.
- Preserved slow rotation, subtle breathing, reduced-motion fallback, visibility pause, render cadence limiting, and full Three.js cleanup.
- Added a future note that memory nodes could later link to WorkTrace, ClipDock, VisionOS / AR, or GitHub project pages, but did not implement those interactions.

### Verification

- Ran `npm run build` successfully after replacing the hero object.

## 2026-07-08: Dot Wave Field Hero Background

### What Changed

- Replaced the Crystal Memory central object with a cleaner Dot Wave Field background.
- Removed the large crystal/orb-like focal object so the hero feels more atmospheric and less object-centered.
- Built a bounded Three.js point field arranged like a calm memory ocean, with subtle idle wave motion and depth-based blue-white / acid-lime color variation.
- Added pointer-responsive ripple behavior so nearby dots rise, brighten, and settle without click interactions or links.
- Preserved reduced-motion fallback, render cadence limiting, visibility pause, event listener cleanup, geometry/material disposal, and renderer disposal.
- Added a TODO note that dots could later become interactive memory/project nodes, but did not implement that behavior.

### Verification

- Ran `npm run build` successfully after replacing the hero background.

## 2026-07-08: Dot Wave Field Pointer Ripple Tuning

### What Changed

- Strengthened the Dot Wave Field mouse interaction while keeping the same sea-like visual design.
- Moved pointer tracking to the window level so the hero background can respond even though the visual layer itself is pointer-transparent.
- Increased ripple radius, lift, brightness, propagation speed, and decay visibility so normal mouse movement feels like touching water.
- Added subtle outward displacement near the cursor while keeping ripple events bounded and lightweight.
- Preserved reduced-motion fallback, render cadence limiting, visibility pause, and Three.js cleanup.

### Verification

- Ran `npm run build` successfully after tuning the pointer ripple behavior.

## 2026-07-08: Dot Wave Field Motion Smoothing

### What Changed

- Reduced pointer interaction strength by roughly 30-40% for a calmer high-end product feel.
- Increased render cadence from about 30fps to about 60fps by changing the frame interval from 33ms to 16ms.
- Added delta-time based animation and separated pointer target/current state so dots follow the cursor with damping instead of snapping.
- Reduced idle wave amplitude and slowed idle wave timing so the field breathes more gently.
- Reduced vertical lift, outward displacement, brightness boost, point size boost, and opacity boost for pointer/ripple response.
- Softened ripple falloff and added a slight delayed ripple start so the motion feels like gentle pressure followed by a smooth wave.
- Preserved bounded ripple count, reduced-motion fallback, visibility pause, no click behavior, and Three.js cleanup.

### Tuned Parameters

- `FRAME_INTERVAL`: `33ms` effective cadence to `16ms`.
- `MAX_RIPPLES`: `7` to `6`.
- `RIPPLE_LIFETIME`: `2.25s` to `2.45s`.
- Pointer peak strength: `1.0` to `0.68`.
- Pointer vertical lift multiplier: `0.34` to `0.20`.
- Pointer outward push multiplier: `0.22` to `0.12`.
- Pointer brightness multiplier: `0.82` to `0.46`.
- Ripple lift multipliers: `0.38 / 0.12` to `0.22 / 0.065`.
- Ripple glow multipliers: `1.25 / 0.46` to `0.72 / 0.24`.
- Idle wave amplitudes: `0.075 / 0.055 / 0.035` to `0.045 / 0.034 / 0.022`.

### Verification

- Ran `npm run build` successfully after smoothing the Dot Wave Field motion.

## 2026-07-08: Final Homepage Motion Polish

### What Changed

- Kept the Dot Wave Field concept, hero layout, typography, colors, buttons, and page sections unchanged.
- Refactored the hero motion code into clearer systems: idle motion sampling, pointer pressure, ripple sampling, and renderer updates.
- Made idle breathing the primary animation layer with slower, lower-amplitude multi-frequency waves.
- Changed pointer interaction from a visible particle effect into a softer pressure field that the dots follow with exponential damping.
- Added spring-like recovery by smoothing dot positions, brightness, material size, opacity, haze motion, and field rotation toward targets.
- Reduced pointer interaction strength by another ~20% for a calmer, Apple-like product-page feel.
- Kept the same bounded dot count and reduced GPU/CPU churn by reusing typed arrays and avoiding per-dot color object allocations in the render loop.
- Preserved reduced-motion fallback, visibility pause, requestAnimationFrame lifecycle, event listener cleanup, geometry/material disposal, and renderer disposal.

### Architecture Notes

- `sampleIdleMotion` handles the always-on low-frequency breathing layer.
- `updatePointerField` separates pointer target/current values and applies delta-time exponential damping.
- `sampleRippleSystem` creates delayed, softly decaying afterglow waves.
- `updateRenderer` combines idle, pressure, ripple, smoothing, buffer writes, and material interpolation.
- The structure prepares the field for future interactive memory/project nodes without implementing project links yet.

### Tuned Parameters

- Render loop now follows `requestAnimationFrame` directly instead of using a 16ms manual frame gate.
- `RIPPLE_LIFETIME`: `2.45s` to `1.65s`.
- `MAX_RIPPLES`: `6` to `5`.
- Pointer peak strength: `0.68` to `0.54`.
- Pointer vertical lift multiplier: `0.20` to `0.145`.
- Pointer outward push multiplier: `0.12` to `0.055`.
- Pointer brightness contribution: `0.46` to `0.28`.
- Ripple lift multipliers: `0.22 / 0.065` to `0.12 / 0.03`.
- Ripple glow multipliers: `0.72 / 0.24` to `0.34 / 0.09`.
- Idle wave amplitudes reduced from `0.045 / 0.034 / 0.022` to `0.026 / 0.020 / 0.012`.

### Verification

- Ran `npm run build` successfully after the final homepage motion polish.
