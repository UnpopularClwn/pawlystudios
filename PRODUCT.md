# Product

Active design and product context for agents. Where this file and `docs/archive/` disagree, this file wins. Detailed
repository, launch, and environment state lives in `CLAUDE.md` and `docs/implementation-status.md`.

## Register

Brand / portfolio. The design is part of the product.

## Identity

**Niño Paul Cabiles.** `pawlystudios.` is Niño's creative identity and signature, not a multi-person agency. Do not
write copy, schema, or design that implies a team, a studio staff, or agency scale.

## Users

Business owners and teams who need a new website, a rebuild of one that has fallen behind, or a focused landing page.
They want quick proof that Niño is credible, practical, and able to handle the work directly.

## Product Purpose

Confirm Niño's credibility, show real work, explain what he builds and how he works, establish who is behind the work,
and make it easy to start a direct conversation. The portfolio is capability-first, not a generic agency site.

## Positioning

Primary work:

- Business Websites
- Website Rebuilds
- Landing Pages

SetSail (a larger web application) demonstrates deeper product and build capability. It does not redefine the primary
service offering. Do not reposition the portfolio around web portals, SaaS development, AI consulting, marketing
services, or broad agency services.

**AI Ad Creative is parked and is not part of the active portfolio direction.** The `/services/ai-ad-creative` route
exists only as an unlinked draft. Do not use it to inform positioning, copy, or design, and do not restore it without
explicit approval.

## Brand Personality

Direct, capable, and personal. Calm, specific, and human. Restrained but memorable.

## Anti-references

- Generic agency templates and corporate consultant copy
- AI-influencer language and marketing buzzwords
- Fake proof, fake statistics, unsupported claims, stock-photo portfolios
- shadcn-style card soup, bento-grid defaults, glassmorphism
- Intrusive popups
- Decorative interaction with no purpose; overbuilt interactions that hide the work or slow the page

## Design Principles

- Show real work and real assets.
- Put the visitor's problem before the solution.
- Keep Niño's voice short, direct, and specific. First person, conversational, no em dashes.
- Use interaction to support credibility, never to obscure it.
- Use the viewport: intentional density rather than macro-whitespace. Give typography room and separate ideas, but
  avoid large accidental dead zones.
- Strong visual hierarchy; vary rhythm and composition so sections do not read as identical stacked blocks.
- Keep the contact path honest and easy to find.

## Current Homepage (`/`)

1. Hero
2. What I Build
3. Experience (professional background, numbers from past remote roles)
4. Selected Work (SetSail, concise)
5. How I Work
6. Tools
7. About
8. FAQ
9. Contact-focused Footer with the Lanyard

The homepage is about Paul first. SetSail is selected work, not the centerpiece; its detail lives on `/work/setsail`.
The Experience numbers are historical figures from Paul's remote roles, never pawlystudios. client counts.

Navigation is Work, About, Contact (in-page anchors). Footer navigation is Work, About, Resume, Web Development, FAQ.

Routes: `/`, `/work/setsail`, `/resume`, `/about`, `/contact`, `/services/web-development`, `/social-preview`.

`/resume` is the structured professional record (roles, figures from past roles, SetSail as one short entry,
training, grouped tools). `/about` stays the personal narrative; the two complement each other.
`/services/ai-ad-creative` is parked and unlinked. There is no `/work` index (intentionally 404).

`/about` and `/services/web-development` predate the current positioning and are queued for a consistency review. They
are not the design reference for the homepage. `/contact` and its inquiry form are intentionally preserved even though
the homepage does not use the form.

The Hero is a static typographic composition on the brand color: identity line, headline, supporting copy and one CTA.
It has no artwork and no entrance animation (the "Website Machine" canvas art was removed on 2026-10-07). Copy is approved and unchanged. Spacing follows the density direction in Design Principles: varied section rhythm, a fluid container
(`clamp(1180px, 86vw, 1320px)`), no macro-whitespace.

## Typography

Three roles. Every typography rule maps to exactly one of them.

- **UI** (body, navigation, buttons, FAQ answers, functional text): Apple system stack with Inter as the non-Apple
  fallback: `-apple-system, BlinkMacSystemFont, Inter, "Segoe UI", Roboto, sans-serif`. Apple's SF is never bundled.
- **DISPLAY** (H1/H2, project titles, major statements, the pawlystudios. identity): General Sans, self-hosted.
- **EXPRESSIVE** (selected labels, metadata, oversized numbers, small editorial moments): Sofia Sans Extra Condensed,
  light or regular, tracked, uppercase where appropriate. Never for paragraphs or long sentences. Use it as
  punctuation, not wallpaper.

## Motion and Interaction

GSAP (with ScrollTrigger) is the primary motion system. The homepage hero is static (no artwork, no entrance
animation). Smooth wheel scrolling is Lenis (`SmoothScroll.jsx`: lerp 0.12, touch and keyboard native,
bypassed under reduced motion); do not add CSS `scroll-behavior: smooth` or another scroll library. React Three Fiber,
Three.js, and Rapier are already present for the Lanyard. 3D may be explored elsewhere only where it materially improves storytelling. Motion, Tailwind, shadcn/ui,
and Motion Primitives are not installed and are not to be added without a new approved requirement.

## Accessibility and Inclusion

Content must remain understandable without motion, WebGL, or client-side JavaScript. Reduced-motion preferences must be
respected. Preserve semantic HTML, keyboard access, visible focus, readable contrast, and responsive layouts. Do not
sacrifice keyboard, touch, or responsive behavior for visual effects.

## SetSail and Lanyard (current state)

- **Homepage Selected Work** (`SelectedWork.jsx`, `id="work"`, since 2026-10-07): eyebrow "Selected Work", the
  "SetSail" title, one line ("A client portal and agency workspace I designed and built around a real workflow
  problem."), a "View case study" button to `/work/setsail`, and ONE approved privacy-safe fragment
  (`client-mobile-fragment.png`) with the "From the actual build" caption. No counts, feature lists, stack or
  architecture on the homepage. The interactive approval card and the evidence tiles were removed with it.
- **`/work/setsail`** is the one canonical SetSail case study, about BUILDING it (friction, the swipe decision, how it
  grew, under the hood with `<details>` and an architecture diagram, how it was built, and a bridge back to Business
  Websites / Website Rebuilds / Landing Pages). Each section has its own composition. There is NO `/work` index (it
  404s on purpose). The old dialog and folder components are deleted; there is one story, not two.
- **Copy lives in `src/data/setsail.js`**, including the claim rules in its header comment.
- **Medium:** DOM, CSS and GSAP only. No second R3F canvas (the Lanyard is the only WebGL context on the homepage and
  the case study has none). R3F stays available for a future genuinely spatial idea.
- **Confidentiality boundary (hard rule): demonstrate concepts, do not reproduce the product.** No fictional SetSail
  portal, dashboard, approval queue, calendar, navigation or connected workflow. No recreated screens.
- **Privacy-safe evidence only.** The case study uses three hard-cropped real fragments in `public/images/setsail/`
  (`agency-workflow-fragment.png`, `lifecycle-stages-fragment.png`, `client-mobile-fragment.png`), exported so the
  pixels contain no client or business names, initials, agency logo, testimonials, menu or place imagery, private URLs,
  account information, or count/usage figures. Sanitization is in the exported pixels, never CSS blur, overlay or
  clipping. Any new fragment must be inspected at full resolution first. Captions read "From the actual build" and
  "Client information left out."
- **Identity protection:** describe the context only as "an organic social media agency". Do not show the agency logo
  in new imagery, name clients, or name the previous workflow software.
- **Claims (verified against the real SetSail codebase):** say "I built...", never "is used by...". No client counts,
  adoption, results, time-saved or performance claims. KPI reporting is monthly CSV import, not live analytics.
  Booking is connected Calendly links, not a native scheduling engine. The Cloud Campaign integration (content
  handoff, scheduling, analytics read, reconciliation, webhook contract) is built and tested but behind readiness
  flags that default OFF; never say SetSail automatically schedules or publishes content. Four roles (Super Admin,
  Admin, Creative Coordinator, Client), invitation-only access, RLS, append-only audit log, 8 onboarding and 7
  recurring stages, Kanban and list tasks.
- **Git history:** earlier commits of this public repository still contain the unsafe SetSail images that were removed
  from the current tree. The current tree is safe; history is not rewritten. Whether to purge history, make the
  repository private, or leave it is an open decision for the owner.

**Lanyard**

The React Bits Lanyard (R3F, Rapier, rope joints, drag, inertia, official GLB and lanyard texture) is dynamically
imported client-only, homepage-only, with a static reduced-motion fallback and an error-boundary fallback.

- **Badge artwork is a neutral placeholder** (`public/lanyard/badge-front.svg`: brand palette, concentric-ring
  graphic, wordmark pill, name, role). The studio headshot was rejected for the badge and is no longer used on it.
  Final badge artwork is still undecided. Do not use another personal photo or a generated portrait.
- **Drag limit:** while dragging, the card position is soft-limited (`softLimit` in `Lanyard.jsx`, tanh resistance)
  to stay inside the visible stage, capped by the strap's reach, with the drag depth clamped so it cannot swell toward
  the camera. The card meets progressive resistance and can never touch the canvas edge. Release still uses the normal
  Rapier swing. Verified left, right, down, up and diagonal at 1440, 1024, 768 and 390.
- **Off-screen optimization:** an IntersectionObserver (200px margin) sets `frameloop="never"` on the Canvas and
  `paused` on Rapier's Physics while the stage is off-screen. Measured: 0 draw calls off-screen, full rate on return.
- **Resting composition:** camera target `[0, -0.45, 0]` at z = 12; the stage is a taller panel with a fading top edge.
- Preserve the React Bits physics. Changes to `Lanyard.jsx` are marked as local additions in comments.

## Design Skills in This Environment

Design skills are installed (`impeccable`, `design-taste-frontend`, and others). Some of their advice conflicts with
this project's direction; this file takes precedence. In particular, several skills say to double or greatly increase
whitespace, and this project wants intentional density instead.

## Approved Contact Details

- Email: `ninopaul.cabiles@gmail.com`
- WhatsApp: +63 906 055 8493 (`https://wa.me/639060558493`)
- LinkedIn: `https://www.linkedin.com/in/nino-paul-cabiles`

The canonical source is `src/data/contact.js`; components read from it.

## Launch State

Pre-launch. `SITE_IS_LAUNCHED` is `false` and the site is `noindex`. Inquiry delivery is not configured and must keep
returning `NOT_CONFIGURED`; never fake success. Do not flip the launch flag, enable indexing, push, or deploy without
explicit approval. See `docs/implementation-status.md` for the launch order and pending items.
