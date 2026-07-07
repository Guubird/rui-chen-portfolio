# Deployment Guide

## Production Commands

Install dependencies:

```bash
npm install
```

Build the production bundle:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

## Vercel

1. Import the repository into Vercel.
2. Use the Vite defaults:
   - Framework preset: `Vite`
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy.

For local verification before pushing:

```bash
npm install
npm run build
npm run preview
```

## Netlify

1. Import the repository into Netlify.
2. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy.

For local verification before pushing:

```bash
npm install
npm run build
npm run preview
```

## GitHub Pages

This Vite app can be deployed to GitHub Pages after building the `dist` folder. If the site is served from a repository subpath, set the Vite `base` option before building.

Recommended options:

- Use a GitHub Actions workflow that runs `npm install` and `npm run build`, then publishes `dist`.
- Or build locally and publish the generated `dist` folder with a Pages deployment tool.

Local verification:

```bash
npm install
npm run build
npm run preview
```

## Current Notes

- The app is a static Vite site, so there is no server-side runtime requirement.
- The Three.js crystal is intentionally lightweight and includes a reduced-motion fallback.
- The main JavaScript bundle may still trigger a Vite chunk-size warning because Three.js is bundled with the app. This is not a deployment blocker.
