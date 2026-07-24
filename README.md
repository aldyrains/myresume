# Aldi Riansyah — Resume & Portfolio

Personal portfolio site for **Aldi Riansyah** (Hybrid Mobile Engineer). Hosted as a static GitHub Pages project under `/myresume/`.

## Quick start

Serve the repo root with any static server (GitHub Pages, `npx serve`, etc.). There is **no build step** for day-to-day content updates.

```bash
# example local preview
npx serve -l 5173 .
# then open http://localhost:5173/myresume/  (or adjust base paths for local)
```

> Production asset paths use the `/myresume/` prefix. For local preview without that base path, open via a server that mirrors the Pages layout, or temporarily rely on relative `./` fallbacks in `js/init.js` (`assetUrl`).

## Architecture

This is a **hybrid** site:

1. **Create React App production build** (`static/js`, `static/css`) — section shell only (`Header`, `About`, `Resume`, `Portfolio`, `Testimonials`, `Contact`, `Footer`).
2. **jQuery enhancement layer** — [`js/init.js`](js/init.js) waits for React mount, then rewrites content from `PROFILE_DATA`.
3. **Theme CSS** — [`css/layout.css`](css/layout.css) + [`css/enhancements.css`](css/enhancements.css) for modern UI, carousel, dark mode, and the PDF viewer.

There is **no `src/` tree** in this repository. Do not attempt a full CRA rebuild unless you recover the original source separately.

```
PROFILE_DATA (init.js)
  ├─ Hero / About / Resume / Skills / Orgs
  ├─ Journey timeline (#portfolio)
  └─ Portfolio carousel (#testimonials)
        └─ Fullscreen PDF.js viewer → aldi-riansyah-portfolio-2026.pdf
```

## Updating content

Edit `PROFILE_DATA` inside [`js/init.js`](js/init.js):

| Field | Purpose |
|-------|---------|
| `work`, `education`, `skills`, `organizations` | Resume sections |
| `journey` | Timeline cards |
| `portfolio[]` | Carousel + viewer metadata (`pdfPage`, `thumb`, stack, features) |
| `resumeFile` / `portfolioFile` | Download / viewer documents |
| `i18n.en` / `i18n.id` | Nav + section copy |

### PDF assets (URL-safe)

- `aldi-riansyah-resume.pdf` — CV download
- `aldi-riansyah-portfolio-2026.pdf` — showcase document (lazy-loaded in modal)
- Preview slides: `images/portfolio/slides/slide-01.jpg` … `slide-15.jpg`

Original Kinobi/export filenames may still exist alongside the URL-safe copies.

## Features

- Updated CV + full work history from 2026 resume
- Portfolio auto-carousel (pause on hover, arrows, swipe, keyboard, dots)
- LinkedIn-style fullscreen PDF viewer (PDF.js): page nav, zoom, fullscreen, thumbs, ESC
- Dark / light theme (persisted)
- English / Bahasa Indonesia UI strings (persisted)
- SEO: meta, Open Graph, Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml`

## Deployment

Push to the GitHub Pages branch/directory configured for `https://aldyrains.github.io/myresume/`. No environment variables are required. Do not commit API keys (none are used).

## License

Personal portfolio content © Aldi Riansyah.
