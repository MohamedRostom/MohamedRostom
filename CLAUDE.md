# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is Mohamed Rostom's GitHub profile and portfolio site, deployed via GitHub Pages at `https://mohamedrostom.github.io/MohamedRostom/`. It serves as both a GitHub profile (`README.md`) and a full portfolio site (`index.html`).

## Architecture

**Production site (`index.html`)** — Zero-build, single self-contained HTML file. No bundler, no framework, no `node_modules`. Libraries (Lenis, GSAP + ScrollTrigger) load from CDN via `defer` scripts at end of `<body>`. All asset paths are relative so they work under the `/MohamedRostom/` GitHub Pages sub-path.

**Vue demo (`vue/`)** — Experimental Vue 3 + Vite prototype. Not deployed. Uses the same GSAP + Lenis libraries but installed via npm. This is a sandbox for exploring component-based approaches.

**Sample files (`sample-a.html` → `sample-f.html`)** — Design exploration prototypes from an earlier design phase. Not part of the live site; candidates for deletion.

## Design identity (do not change without explicit request)

| Token | Value |
|-------|-------|
| Background | `#050510` |
| Accent teal | `#06B6D4` |
| Accent violet | `#8B5CF6` |
| Body text | `#94A3B8` (var `--slate`) |
| Muted | `#3D4F6B` |
| Display font | Fraunces (Google Fonts) |
| Body font | Manrope (Google Fonts) |
| Glass card | `rgba(255,255,255,0.04)` bg + `rgba(255,255,255,0.08)` border + `backdrop-filter: blur` |

The aesthetic is cinematic dark-glass with grain texture, dot-grid background, custom cursor, and teal↔violet gradient accents. Preserve this identity on all additions.

## Motion system (index.html)

- **Lenis** drives smooth scroll; its `scroll` event feeds `ScrollTrigger.update` so GSAP and Lenis share one scroll source.
- **GSAP + ScrollTrigger** handles all scroll-driven animation (parallax, reveals, pinning).
- All motion is wrapped in an `init()` guard that is skipped entirely when `prefers-reduced-motion: reduce` is active — content must be fully visible and readable without JS or with reduced-motion.
- Animate only `transform` and `opacity` (GPU-composited). Never animate layout properties.
- The pinned Experience timeline is the one sanctioned pinned scroll moment.

## vue commands

```bash
cd vue
npm run dev      # dev server (Vite)
npm run build    # production build
npm run preview  # preview the build
```

## Deployment

The live site deploys automatically from the `main` branch root via GitHub Pages. To ship a change: commit and push `index.html` (and any referenced assets) to `main`. The `.nojekyll` file at root must remain — it prevents Jekyll from processing assets.

Live URL: `https://mohamedrostom.github.io/MohamedRostom/`

## Planned work

The full cinematic elevation plan lives in `docs/superpowers/specs/2026-06-07-portfolio-elevation-design.md`. The agreed build order is: scaffold libs → section reveals → hero cinematic → pinned Experience scene → micro-interactions → content/SEO → a11y audit → deploy.
