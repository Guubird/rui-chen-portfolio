# Reusable Codex Prompt

Build a high-end personal portfolio website for **Rui Chen**, a computer science student and early-stage builder focused on local-first macOS tools, AI-native software, and spatial computing experiments.

Use this stack:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- lucide-react

Create a complete responsive site, not just a hero page. Required sections:

- Hero
- Selected Projects
- Research / Awards / Certificates
- Technical Stack
- About
- Contact
- Footer

Visual direction:

- Dark cinematic background.
- Huge high-contrast typography.
- Acid-lime / futuristic accent.
- Premium creative engineering portfolio feeling.
- Lightweight circular pointer effects only: subtle, low-frequency, performance-friendly, and never square outlines.
- No human portrait or avatar background.
- Replace portrait imagery with an abstract dynamic 3D crystal object used as background atmosphere, not as a heavy foreground object.
- The crystal should feel glassy, refractive, premium, futuristic, and alive.
- The crystal should respond subtly to pointer movement.
- The page should not look like a generic resume website.
- The hero should be clean and centered. It should prioritize `RUI CHEN`, the corrected identity line, a short intro, and project tags/buttons.

Content direction:

- Feature WorkTrace as a local-first macOS work memory app with tracking, sessions, missions, timeline, story, patterns, memory, and future AI reflection over compressed data.
- Feature ClipDock as a local-first macOS productivity utility for saving links, snippets, prompts, and commands.
- Feature VisionOS / AR Billiards Assistant as a spatial computing concept around table mapping and trajectory assistance.
- Feature SURF / XJTLU research experience as credibility support.
- Include NVIDIA CUDA Python certificate, TOEFL/MyBest score, XJTLU SURF certificate, and SURF university promotion screenshots as supporting proof.
- Use contact email `15980825997@163.com`.
- Organize technical stack into clear groups: Native macOS; AI-native tools; Web / Creative frontend; Spatial computing; Research & foundations.

Implementation requirements:

- Use real local assets from `public/assets/evidence`.
- Keep projects as the strongest section.
- Keep certificates and awards secondary.
- Add reduced-motion fallback.
- Avoid excessive GPU load.
- Dispose Three.js geometry, materials, renderer, animation frame, timers, and event listeners in cleanup.
- Keep the Three.js crystal lightweight enough for production: modest particle count, capped render cadence, static reduced-motion fallback, and no aggressive foreground render loop.
- Use semantic HTML.
- Ensure buttons and links are accessible.
- Build and verify with `npm run build`.
- Verify the production bundle with `npm run preview` before deployment when possible.
