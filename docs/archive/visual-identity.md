# Visual Identity

> **ARCHIVED, historical only.** This describes an earlier design of this site (a dark amber/charcoal theme system,
> a Resume page, and F1 / flight-simulation / coffee influences). It is not the current design source of truth. For
> the current direction see `PRODUCT.md` (repo root) and `docs/implementation-status.md`.

Session 2.3 added a scroll-aware theme system, a restrained GSAP motion layer, a Resume page, and
CSS-only media render frames. This document records how those pieces work and the rules for
extending them later.

## The Four Influences

**F1** — speed, precision, timing, sharp handoffs. Shows up as: fast motion timing (180–350ms),
horizontal media reveals, project sequence numbers, thin accent lines. Never used: logos, team
colors, checkered flags, driver imagery, fake telemetry.

**Flight simulation** — information hierarchy, calm state changes, structured panels. Shows up as:
status labels ("DOCUMENT STATUS: ON FILE"), the Resume page's toolbar/embed structure, the
`systems` theme's cooler blue-black palette, smooth 350–650ms transitions. Never used: cockpit
instrument recreations, airline branding, ECAM/PFD/ND/MCDU screens.

**Coffee** — warmth, texture, personal atmosphere. Shows up as: the `personal` theme's warm
charcoal/copper palette on About, Trusted Partner, and Contact, slower 500–900ms motion, the subtle
texture layer's warm glow in that theme. Never used: coffee bean icons, cup icons, café stock
photography.

**Home service audience** — the audience is the actual design constraint. Every motion respects
`prefers-reduced-motion`. No section requires JavaScript to be readable. Nothing pins scroll for
more than a normal section's height. Mobile always shows text immediately, before any animation
resolves.

## Theme System

Five named themes, each a `[data-active-theme="..."]` selector on `<html>` overriding a small set
of CSS custom properties defined in `src/styles/global.css`:

| Theme | Palette direction | Used on |
|---|---|---|
| `precision` | Near-black, crisp amber (the site's default/base tokens) | Hero |
| `problem` | Flatter charcoal, higher contrast, least decoration | Problem section ("Sound familiar?") |
| `systems` | Cooler blue-black | How It Works, Services page, Resume page |
| `proof` | Dark graphite, brighter amber/copper | Proof section, Featured Work, Portfolio page |
| `personal` | Warm charcoal, cream text, copper accent | About, Trusted Partner, Contact page |

Semantic tokens (`--page-bg`, `--surface`, `--surface-raised`, `--text-primary`, `--text-muted`,
`--accent`, `--accent-soft`, `--theme-line`, `--glow`, `--texture-opacity`) are the only things a
theme override touches. Every existing component still reads the old token names (`--ink`,
`--panel`, `--bone`, `--steel`, `--amber`, `--line`, etc.) — those are aliased to the semantic
tokens in `:root`, so no component CSS needed to change for theming to work. **New code should use
the semantic token names directly**, not the legacy aliases.

`body` transitions `background-color` and `color` over 700ms whenever `prefers-reduced-motion: no-preference` is set. Under reduced motion, the transition rule is dropped entirely (see
`src/styles/global.css`), so the color still changes but instantly, with no animation.

### How a theme gets applied

Two hooks, both in `src/hooks/`:

- **`usePageTheme(themeName)`** — for pages with one fixed theme (Services, Portfolio, Contact,
  Resume, 404). Runs in `useLayoutEffect`, so the attribute is set before paint — navigating to
  `/contact` never flashes the previous page's theme, and a hard refresh on `/contact` loads
  straight into the `personal` theme.
- **`useScrollTheme(containerRef)`** — for the homepage only. Scans the container for any
  descendant with a `data-theme="..."` attribute (Hero, Problem, How It Works, Proof, Featured
  Work, About, Trusted Partner all carry one) and uses a GSAP `ScrollTrigger` per section to flip
  `data-active-theme` as each scrolls to the middle of the viewport. Sets the first section's theme
  synchronously on mount so there's no flash before the first scroll trigger fires. Under
  `prefers-reduced-motion`, it skips ScrollTrigger entirely and just sets the first theme once.

Every `ScrollTrigger` created by `useScrollTheme` and `useGsapReveal` is killed in the hook's
cleanup function (`gsap.context().revert()` or explicit `.kill()`), so navigating away from the
homepage — or any page using a reveal — does not leak triggers.

## Motion System

`src/lib/motion.js` exports:

- `registerGsap()` — idempotent `ScrollTrigger` plugin registration, called once per hook, safe to
  call from multiple components.
- `prefersReducedMotion()` — the single source of truth every motion hook checks before touching
  GSAP.
- `MOTION` — three named presets, one per influence:
  - `f1`: 0.28s, `power3.out`, 0.06 stagger — used for Proof, Featured Work, Portfolio case study
    headers, the media gallery's horizontal reveal.
  - `flight`: 0.5s, `power2.out`, 0.1 stagger — used for Hero, Problem, How It Works, and the
    Services solution cards.
  - `coffee`: 0.7s, `power1.out`, 0.14 stagger — used for the About section.

`src/hooks/useGsapReveal.js` is the one reveal hook every section uses. It takes a `preset` name, a
`selector` for which descendants to animate (defaults to direct children), and a `y` offset. Under
reduced motion it calls `gsap.set(targets, { opacity: 1, y: 0 })` — content is immediately in its
final, fully-readable state, no animation, no scroll dependency for visibility.

`src/components/motion/RouteTransition.jsx` wraps the router outlet and plays a single 0.32s
fade/rise on every route change, keyed by `location.pathname`. It never blocks navigation — the
new page's DOM is already mounted and interactive the instant React Router swaps it; the animation
is purely a cosmetic layer on top and is skipped completely under reduced motion.

### What was deliberately not built

Per the brief's explicit "Avoid" list: no scroll hijacking, no long pinned sections, no cursor
followers, no infinite marquees, no 3D tilts, no full-page canvas effects, no smooth-scroll
replacement library (native `scroll-behavior: smooth` from Session 1.1 stays as-is, already
disabled under reduced motion).

## Media Render Frames

`src/components/media/`:

- **`BrowserFrame`** — CSS-only browser chrome (dot row + label bar) around a real screenshot.
  Used on the homepage Featured Work cards.
- **`PhoneFrame`** — CSS-only mobile frame for feed-style social graphics. Used inside
  `MediaGallery`.
- **`MediaGallery`** — horizontal scroll-snap strip of `PhoneFrame`s with an F1-timed staggered
  reveal. Used in Portfolio case studies.

All three render **real assets only** — the social media graphics already in `public/images/` and,
if/when they arrive, real Set Sail screenshots. No fake dashboards, no invented analytics, no
placeholder client work were created. Where no real media exists (Set Sail, currently), the
existing honest placeholder text from Session 2.2 is unchanged.

No mockup/frame dependency was added — every frame is plain CSS.

## Resume Page

Route: `/resume`. Components in `src/components/resume/`:

- **`ResumeHighlights`** — a short, verified-claims summary (matches `docs/content-claims.md`),
  always visible regardless of whether a PDF exists.
- **`ResumeToolbar`** — Download/Open-in-new-tab actions, rendered only when a resume URL exists.
- **`ResumeEmbed`** — a native `<object data="..." type="application/pdf">` with an `<iframe>`
  fallback inside it, which itself falls back to a plain download link if neither can render the
  PDF. No PDF.js or similar library was added, per the dependency rules.

**Current state: no PDF exists in the project yet.** A real resume document was found during this
session (`assets/AI-Forward Executive Assistant.docx`), but it is a `.docx`, not a PDF, and no
clean docx-to-PDF conversion path is available in this environment (see
`docs/content-claims.md` → "Resume File Format" for what was tried and why it was rejected). Until
a real PDF is supplied, `ResumeEmbed` renders an honest "pending upload" state with a link to
Contact — the same honesty pattern used for WhatsApp/email in Session 1.1, now resolved for
WhatsApp/email but still open for the resume file itself.

CSS grid areas in `src/pages/ResumePage.css` reorder the toolbar/highlights/embed blocks so mobile
sees Download/Open actions first, then the highlights summary, then the embedded document —
matching the brief's mobile priority order.

## UI Detail Distribution

Per the brief's "use only a few, not all of them everywhere" instruction:

- **Home**: scroll-based theme transitions (the main personality device), one status-style label
  removed from Hero in Session 2.2 (kept out — a fixed "taking new projects" pill reads as a stale
  claim once it goes untouched for months, so it was not restored here).
- **Services**: numbered solution cards (`01`–`04`), four distinct card layouts (`split`,
  `full-width`, `workflow`, `compact`) instead of one repeated card shape — see below.
- **Portfolio**: project sequence numbers (`01`, `02`), `MediaGallery`'s horizontal reveal.
- **Contact**: the `personal` warm theme is the section's whole personality device; no extra UI
  chrome was added on top, per the brief's "softer, less technical UI" direction.
- **Resume**: `DOCUMENT STATUS` label, clean toolbar, minimal decorative motion (only the shared
  route-transition fade).

## Services Page Layout Variation

Each of the four `SolutionCard` entries now carries a `variant` field in `src/data/services.js`
(`split`, `full-width`, `workflow`, `compact`), and `SolutionCard.css` gives each variant a
distinct structural treatment — a two-column split, a full-width standalone statement, a
left-rule "workflow" feel, and a denser compact layout with the scope panel laid out horizontally.
No real per-service photography exists, so the variation is achieved through layout and typography
rather than fabricated imagery — consistent with the "do not create fake dashboard screens" rule.

## Texture

`src/components/shared/TextureLayer.jsx` — one fixed, `aria-hidden` div behind all content. Two
radial gradients keyed to `--glow` (which shifts per theme, cooler in `systems`, warmer in
`personal`) plus a repeating 3px radial-gradient dot pattern for grain, all at `--texture-opacity: 0.035`. No image asset, no canvas, no JS — purely CSS, so it costs nothing at runtime beyond
one composited layer.

## Reduced Motion Behavior

Every motion primitive checks `prefersReducedMotion()` independently and short-circuits to the
final, readable state:

- `useGsapReveal` → `gsap.set(..., { opacity: 1, y: 0 })`, no ScrollTrigger created.
- `useScrollTheme` → sets the first section's theme once, no ScrollTrigger created.
- `RouteTransition` → skips the `gsap.fromTo` call entirely; content renders at full opacity
  immediately.
- The global `body` background/color transition is removed via the existing
  `@media (prefers-reduced-motion: reduce)` block in `src/styles/global.css` (unchanged from
  Session 1.1, now also covers theme-driven color changes since they ride the same `transition`
  property).

## Extending This System

- New homepage sections that should shift the theme: add `data-theme="precision|problem|systems|proof|personal"` to the section's root element. `useScrollTheme` picks it up automatically — no
  code change needed elsewhere.
- New pages: call `usePageTheme('themeName')` once at the top of the page component.
- New reveals: use `useGsapReveal({ preset: 'f1' | 'flight' | 'coffee', selector, y })` rather than
  writing a one-off GSAP call. Keeps every animation on the same three timing bands.
- New media: prefer `BrowserFrame` (desktop screenshots) or `PhoneFrame`/`MediaGallery` (mobile
  feed-style images) over ad hoc `<img>` styling, so new work stays visually consistent with
  existing case studies.
- Do not add a new theme without checking contrast against `--text-primary`/`--text-muted` in every
  existing section that could inherit it via `useScrollTheme`.
