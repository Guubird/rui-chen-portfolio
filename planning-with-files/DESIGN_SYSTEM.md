# Design System

## Palette

| Token | Usage | Value |
| --- | --- | --- |
| `space` | Main background | `#030014` |
| `ink` | Secondary background | `#080719` |
| `panel` | Panels and project cards | `rgba(255, 255, 255, 0.055)` |
| `acid` | Primary accent | `#CCFF00` |
| `cyan` | Secondary technical accent | `#88AAFF` |
| `text` | Primary text | `#FFFFFF` |
| `muted` | Secondary text | `rgba(255, 255, 255, 0.62)` |
| `line` | Hairlines | `rgba(255, 255, 255, 0.12)` |

## Typography

Display:

```css
"Anton", "Impact", "Arial Black", sans-serif
```

Sans:

```css
"Space Grotesk", "Inter", system-ui, sans-serif
```

Mono:

```css
"IBM Plex Mono", "SFMono-Regular", Consolas, monospace
```

## Layout Rules

- Use full-width cinematic sections with constrained inner content.
- Use large type only for hero and section anchors.
- Keep cards rectangular with small radii.
- Avoid nested cards.
- Use evidence images as supporting material, not hero content.
- Maintain generous spacing and strong contrast.
- On mobile, sections should stack cleanly and the crystal should remain atmospheric without overlapping hero text.

## Motion Rules

- Motion should be subtle, premium, and functional.
- Crystal rotation should be continuous but gentle.
- Pointer response should be visible but not distracting.
- Cards can lift slightly on hover.
- Respect `prefers-reduced-motion`.

## Image Rules

- Use WorkTrace and ClipDock screenshots as project evidence.
- Use certificates in a compact proof grid.
- Use SURF screenshots as a horizontal evidence rail or responsive grid.
- Keep image corners tight and borders subtle.

## Accessibility Rules

- Use semantic sections and headings.
- Use accessible link labels.
- Keep contrast high.
- Add descriptive alt text to evidence images.
- Avoid interactions that require motion to understand content.
