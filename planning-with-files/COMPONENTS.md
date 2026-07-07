# Component Breakdown

## App

Owns the full page composition and renders all sections.

## Header

Fixed or sticky top navigation with Rui Chen wordmark, compact section links, and contact action.

## Hero

Large emotional opening section with name, positioning, proof badges, and the 3D crystal.

## CrystalScene

Three.js scene for the abstract crystal object.

Responsibilities:

- Render a glassy low-poly crystal.
- Add subtle internal glow and particles.
- Respond to pointer movement.
- Respect reduced motion.
- Dispose resources in cleanup.

## PointerField

DOM-based pointer ripple layer for soft interactive feedback.

## ProjectSection

Selected project section containing the strongest case cards.

## ProjectCard

Reusable card for WorkTrace, ClipDock, VisionOS / AR Billiards Assistant, SURF, and AI-native systems.

## EvidenceSection

Research, awards, and certificate section using local images.

## EvidenceCard

Reusable supporting proof card with image, title, and short context.

## StackSection

Technical stack and capability grid.

## AboutSection

Short personal narrative and builder philosophy.

## ContactSection

Collaboration invitation and contact link.

## Footer

Closing line, year, and compact identity statement.
