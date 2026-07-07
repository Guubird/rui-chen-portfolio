# Decisions

## Identity

- Public site identity is `Rui Chen`, per the project request.
- All public-facing text uses `Rui Chen`.
- Rui is positioned as a computer science student and early-stage builder, not as an inflated senior/professional persona.

## Source Folder

- The requested `/Users/bird/Desktop/Portfolio` folder did not exist during inspection.
- A Desktop folder named `/Users/bird/Desktop/Porfolio` existed and contained the expected evidence assets.
- Decision: use `/Users/bird/Desktop/Porfolio` as the evidence source and deliver the final website to `/Users/bird/Desktop/Portfolio`.

## Visual System

- Use EathanPortfolio as inspiration for cinematic darkness, large typography, acid-lime accents, and interactive energy.
- Do not copy Eathan wording, portrait composition, or identity.
- Replace the human subject layer with a Three.js abstract crystal used as background atmosphere.
- Keep pointer effects circular, subtle, low-frequency, and performance-friendly.

## Content Hierarchy

- Projects lead the portfolio.
- WorkTrace and ClipDock are the main proof points because they contain the strongest product and engineering detail.
- VisionOS / AR Billiards Assistant is presented as an exploratory spatial computing concept.
- SURF, certificates, and screenshots support credibility but do not dominate.

## Technical Approach

- Use a single Vite React app with componentized sections.
- Use Three.js directly for the crystal and low-cost particles.
- Use Framer Motion for UI entrances and card polish.
- Keep image assets in `public/assets/evidence` so they can be referenced with stable public paths.

## Performance

- Keep particle count moderate.
- Avoid heavy post-processing in this first version.
- Respect reduced-motion preferences.
- Dispose Three.js resources on unmount.

## Contact

- Use `15980825997@163.com` as the public contact email.
- Phrase contact as collaboration/internship/research invitation, not a hard-coded sales form.
