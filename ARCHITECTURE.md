# Architecture notes

## Why this shape exists

The live site is a **frozen CRA React 17 build** plus a **jQuery content layer**. Product copy, portfolio showcase, theme, and i18n live in [`js/init.js`](js/init.js) so updates do not require rebundling React.

## Data flow

1. `index.html` mounts `#root` and loads CRA chunks.
2. React renders section IDs: `#home`, `#about`, `#resume`, `#portfolio`, `#testimonials`, `#contact`, `#footer`.
3. `waitForLandingPage()` polls until key nodes exist.
4. `enhanceLandingPage()` → `applyResumeContent()` replaces DOM from `PROFILE_DATA`.
5. Portfolio cards open `#portfolio-viewer`, which loads `aldi-riansyah-portfolio-2026.pdf` via PDF.js **only when opened**.

## Key files

| Path | Role |
|------|------|
| `js/init.js` | Single source of truth for profile + interactions |
| `css/enhancements.css` | Design tokens, carousel, viewer, dark theme |
| `index.html` | SEO shell, script includes |
| `images/portfolio/slides/` | JPEG page previews for carousel/thumbs |
| `aldi-riansyah-*.pdf` | Canonical CV / portfolio documents |

## Preferences

- Theme: `localStorage['myresume-theme']` → `html[data-theme]`
- Language: `localStorage['myresume-lang']` → `en` \| `id`

## Constraints

- Preserve `/myresume/` public path.
- Do not delete CRA `static/` chunks without a replacement build.
- Prefer incremental CSS/JS improvements over rewriting the React app.
