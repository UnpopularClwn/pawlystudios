# Portfolio Website — CLAUDE.md

## Current Checkpoint

The `pawlystudios.` portfolio (Niño Paul Cabiles) is a single-homepage, capability-first portfolio. The creative
refinement phase (Lanyard, three-role typography, homepage composition, SetSail Featured Build and `/work/setsail`,
privacy cleanup) is CLOSED and committed locally on the working branch. It has not been pushed or deployed.
Pre-launch: `SITE_IS_LAUNCHED` is `false`, the site is `noindex`, inquiry delivery is not configured, and there is no
custom domain. This project folder is the only source of truth. Do not create a duplicate app or experimental copy.

Read `PRODUCT.md` (product, positioning, design direction) and `docs/implementation-status.md` (state, launch order)
before resuming. Everything under `docs/archive/` is historical; it is not a source of truth and may describe earlier
versions of the site. Current code, `PRODUCT.md`, and the status document take precedence over it.

## Identity and Positioning

- Person: **Niño Paul Cabiles**. `pawlystudios.` is his creative identity / signature, not a multi-person agency.
- Primary work: Business Websites, Website Rebuilds, Landing Pages.
- SetSail demonstrates deeper product/build capability. It does not redefine the primary service offering.
- **AI Ad Creative is parked** and is not part of the active portfolio direction (see **Parked Work** below).
- Do not reposition around web portals, SaaS, AI consulting, marketing services, or broad agency services.
- Identity naming: the canonical full identity "Niño Paul Cabiles" is used in the header, footer, About profile card,
  metadata, the Person schema and the social preview. Informal copy ("Hi, I'm Paul.") is intentional.

## Repository State (read this before touching git)

Facts from git (use `git log` for the exact checkpoint commit):

- Active branch: the Orca worktree branch `UnpopularClwn/project-synchronization-review`
  (`~/orca/workspaces/Portfolio/bladderwrack`). It carries several local checkpoint commits (see `git log`; the latest is
  the Website Machine hero + Lenis checkpoint), built on `8938684` ("feat: rebuild pawlystudios portfolio experience").
- Local `main` and `origin/main` are identical at `9c3f2139fdbcd10ef390ba0146eefa7618840ea1`. The working branch is
  ahead of them and has NOT been pushed.
- **Not verified:** what the live Vercel production deployment serves. Pushes to `main` trigger production
  deployments; check the deployment before describing anything as live.
- `personal-portfolio-redesign` (original worktree `~/Documents/Projects/Portfolio`) points at `8938684`. Do not
  modify it or that worktree. It holds three intentional untracked items that are not part of this repository state:
  `portfolio logo transparent.svg`, `portfolio logo.png`, `public/images/new_img/` (unredacted SetSail screenshots;
  never move them into `public/`). Do not delete, stage, move, or modify them.
- Do not merge, push, or deploy without explicit approval.
- Do not rewrite Git history. See the SetSail section for the open history-privacy decision.

## Current Homepage Architecture

`src/app/page.js` renders, in order:

1. `BrandHero` (static)
2. `WhatIBuild`
3. `Experience` (professional background and four numbers from past remote roles; copy in `src/data/experience.js`)
4. `SelectedWork` (SetSail as one concise entry; `id="work"`)
5. `HowIWork`
6. `ToolsSection` (homepage variant)
7. `AboutPaul`
8. `Faq`
9. `Footer withLanyard` (contact-focused footer with the React Bits Lanyard)

Navigation: Work, About, Contact (in-page anchors). Footer navigation: Work, About, Web Development, FAQ.
Routes: `/`, `/work/setsail`, `/about`, `/contact`, `/services/web-development`, `/social-preview`, parked
`/services/ai-ad-creative`. `/work` (an index) does NOT exist and intentionally 404s. Copy is data-driven from
`src/data/` (`whatIBuild.js`, `experience.js`, `homeProcess.js`, `faq.js`, `tools.js`, `setsail.js`). Approved content stays as written
unless a task says otherwise. Header wordmark, footer and the About profile card use the full identity "Niño Paul
Cabiles"; conversational copy ("Hi, I'm Paul.") is intentionally informal.

Tools section: the marquee is titled "Tools I Use". It lists shadcn/ui and Motion Primitives as tools the owner uses
in his work; they are NOT dependencies of this repository and nothing in the copy says the portfolio is built with
them. Keep it that way; the owner should confirm those two entries.

Supporting pages (`/about`, `/services/web-development`, `/contact`) still exist. `/about` and
`/services/web-development` predate the current positioning (the web-development metadata and the schema Service
description still mention "web portals") and are queued for a consistency review. `/contact` and its inquiry form are
preserved even though the homepage does not use the form.

## Design System

Three font roles; every typography rule maps to one of them (tokens in `src/styles/tokens.css`):

- **UI** (`--font-ui`): `-apple-system, BlinkMacSystemFont, Inter, "Segoe UI", Roboto, sans-serif`. Apple's SF is
  never bundled. Inter is loaded through `next/font` with preload off, so Apple devices never download it.
- **DISPLAY** (`--font-display`): General Sans, self-hosted (Medium and SemiBold).
- **EXPRESSIVE** (`--font-expressive`): Sofia Sans Extra Condensed via `next/font/google` (300 and 400). Labels,
  metadata, and oversized numbers only; never paragraphs.
- `--font-body` and `--font-heading` remain as aliases of UI and DISPLAY for secondary pages.
- Homepage type scale tokens: `--type-h3`, `--type-lead`, `--type-body`, `--type-ui`, `--type-small`, `--type-label`,
  `--type-number`, `--type-number-sm`. `SectionEyebrow` has `expressive` and `quiet` variants (default unchanged).
- Container: `--container-max: clamp(1180px, 86vw, 1320px)`. Text stays on this grid; visuals may bleed past it.
- Layout intent: intentional density, varied section rhythm, no macro-whitespace, no bento default, no card soup, no
  glassmorphism, no decorative interaction without purpose.
- Motion: GSAP with ScrollTrigger is the motion system (`src/lib/motion.js`, `Reveal`, `useReveal`). The homepage
  hero is static (its canvas art and text entrance were removed). Smooth scrolling is
  Lenis (`SmoothScroll.jsx`, lerp 0.12; do not add CSS `scroll-behavior: smooth` or another scroll library). Reduced
  motion is respected. React Three Fiber, Three.js, `@react-three/drei`, `@react-three/rapier`, and `meshline`
  exist for the Lanyard. Motion, Tailwind, shadcn/ui, and Motion Primitives are not installed and must not be added
  without a new approved requirement.
- Server components are the default; client boundaries are isolated to browser behavior; static rendering is retained
  where possible.

## Lanyard (technical implementation done; final artwork undecided)

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

## SetSail (redesign complete)

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

## Parked Work

AI Ad Creative is intentionally parked, not deleted, and is not part of the active direction:

- No public navigation, homepage, Contact project-type option, or launch-gated schema reference to it (schema removal
  was committed in `baa2a19`, although `src/lib/schema.js` service copy still needs the broader schema pass).
- The `/services/ai-ad-creative` route, its components (`AiAdCreativeHero`, `SelectedCreative`, `CreativeTypes`,
  `CreativePipeline`, `AudienceSection`, `WorkingTogether`, `AiAdCreativeCta`, and related), and
  `src/data/ai-ad-creative.js` remain in code, reachable only by direct URL. No redirect, no placeholder.
- Do not work on, redesign, expand, or restore it without explicit approval. Shared global styles or tokens may affect
  it; report that rather than working on the route.
- `next.config.js` no longer allows `i.ytimg.com` for `next/image`; re-add it only if a thumbnail is ever rendered via
  `next/image` again.

## Brand and Contact Identity

- Runtime brand: `pawlystudios.`
- Person: Niño Paul Cabiles.
- Approved logo source: `public/logos/portfolio logo transparent.svg`.
- Pixel-exact optimized runtime logo: `public/logos/pawlystudios-logo.webp`.
- Email: `ninopaul.cabiles@gmail.com`
- WhatsApp: +63 906 055 8493 (`https://wa.me/639060558493`)
- LinkedIn: `https://www.linkedin.com/in/nino-paul-cabiles`

Contact values are centralized in `src/data/contact.js` (also `whatsappDisplay`). The homepage footer shows the email as
the dominant contact link with WhatsApp and LinkedIn beneath it. `/contact` is form-only.

## Tech Stack and Boundaries

- Next.js 16 App Router, React 19, JavaScript, custom CSS, GSAP, Lenis (smooth scrolling), `next/image`.
- Fonts: see **Design System**.
- 3D for the Lanyard only: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`.
- Not installed: Motion, Tailwind, shadcn/ui, Motion Primitives. (`shadcn/ui` and `Motion Primitives` appear in the "Tools I Use" marquee as tools the owner uses; they are not
  dependencies of this repository.)

## Asset State

- SetSail evidence: `public/images/setsail/agency-workflow-fragment.png`,
  `lifecycle-stages-fragment.png`, `client-mobile-fragment.png` (case study; `client-mobile-fragment.png` is also the one
  homepage Selected Work visual, approved 2026-10-07). All other SetSail screenshots and hero mockups were
  removed from the tree (still present in older Git history).
- Lanyard assets: `public/lanyard/card.glb`, `lanyard.png` (official React Bits), `badge-front.svg` (neutral
  placeholder, no photograph), `badge-back.svg`.
- Portraits: `public/images/paul-about-portrait.jpg` (homepage About and `/about`), `paul-headshot-about.png`
  (About ProfileCard default avatar and schema image). Neither is used on the Lanyard.
- `qa/` holds local QA screenshots, is gitignored, and is not a deliverable.

## Next.js Security State

- Runtime versions: `next@16.3.3`, `react@19.2.8`, `react-dom@19.2.8` (patched in `a96da75`).
- The critical Next.js unauthenticated-RCE advisories (`GHSA-p293-qw3h-jr36`, `GHSA-2xp9-vwfh-vxw4`, affecting `next`
  `16.0.0–16.3.2`) are resolved.
- Remaining `npm audit --omit=dev` findings, both transitive through `next` itself: `sharp <0.35.4` (HIGH, libheif)
  and `baseline-browser-mapping >=2.0.0 <2.11.0` (MODERATE, DoS). Do not pin/override either without a separate,
  reviewed dependency task. The audit currently reports 4 findings in total; do not run `npm audit fix`.

## Vercel / Environment State

- Vercel project: `pawlystudios`. Pre-launch production URL: `https://pawlystudios.vercel.app` (custom domain
  intentionally deferred).
- `NEXT_PUBLIC_SITE_URL=https://pawlystudios.vercel.app` is configured in Vercel, **Production only**. Preview and
  Development are intentionally unset (a preview deployment inheriting the production origin would produce a wrong
  `metadataBase`/canonical).
- No other environment variables were configured as of the last documented check: `RESEND_API_KEY`,
  `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Verify in Vercel
  before relying on this. Do not change environment variables without a task.
- `SITE_IS_LAUNCHED` is `false` (`src/lib/seo-config.js`); the site emits `noindex, nofollow` and the JSON-LD graph is
  gated off. `src/app/robots.js` preserves pre-launch crawling behavior without a sitemap URL. Global title,
  description, and gated schema are still Web Development-oriented; broadening them (and the SEO/GEO/AEO work) is a
  future task.
- A branded 1200 × 630 social preview exists at `/social-preview` and is not yet attached to Open Graph/Twitter
  metadata.
- Baseline security headers and a report-only CSP are configured in `next.config.js`; the Next.js signature is
  disabled. HSTS and enforcing CSP remain launch review items.

## Contact Form State

- Flow: `InquiryForm.jsx` (client) → `submitContactForm.js` (`'use server'` Server Action) → server validation +
  honeypot → optional rate limiting → `contactSubmission.js`'s `processContactForm` → Resend delivery.
- Project types: `Web Development`, `Website Maintenance`, `Other / Not Sure Yet`.
- **Required** for real delivery: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`. Missing any one makes
  `getDelivery()` return `null` and `processContactForm` return `NOT_CONFIGURED`, which is the honest state shown to
  visitors. Never fake success.
- **Optional:** `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (sliding-window rate limit, 5 requests per 10
  minutes, IP-hash keyed). Absent config skips rate limiting; a runtime failure fails open.
- Do not configure credentials without an approved provider and real server-side values, and do not store real
  credentials in this file or any repository documentation.

## Deployment Notes

- GitHub: `https://github.com/UnpopularClwn/pawlystudios..git`. Vercel production branch: `main`. Pushes to `main`
  trigger production deployments; non-main and PR work can create preview deployments.
- Earlier hosted QA and a Lighthouse baseline (Performance 96, Accessibility 100, Best Practices 96, SEO 66 while
  noindex, LCP 2.7 s, CLS 0, TBT 90 ms) were recorded against the older pre-launch deployment, before the current
  homepage. Re-run them after the creative work; do not treat them as current.

## Resume Rules

- Do not fabricate contact details, client identities, business claims, metrics, statistics, testimonials, or domains.
- Do not configure inquiry delivery without an approved provider and real server-side credentials.
- Do not enable indexing until the production domain, metadata, launch QA, and explicit approval are complete.
- Preserve approved content and the data-driven content organization. Prefer focused changes and reuse of existing
  components. Do not broadly refactor.
- No em dashes in public copy. No unsupported claims. `pawlystudios.` is a personal creative identity, not an agency.
- The owner is the creative director: research before major creative changes, improvement loops max three passes.
- The client owns the finished website. Ongoing support is optional.
- Update `docs/implementation-status.md` after future implementation sessions.

**Do not, without explicit approval:**

- Restore or work on AI Ad Creative, or expose it in nav, homepage, contact, or schema.
- Create a `/work` index or add other projects.
- Put SetSail product screenshots, mockups, or any recreated SetSail UI back on the site, or weaken the SetSail
  confidentiality and claim rules.
- Change the Lanyard physics, or treat its placeholder artwork as final.
- Redesign `/about` or `/services/web-development` outside their planned consistency review.
- Flip `SITE_IS_LAUNCHED` or otherwise enable indexing.
- Push, deploy, rewrite Git history, or change environment variables.
- Add pricing content (none is approved).
- Install Motion, Tailwind, shadcn/ui, or Motion Primitives.

## Creative and Launch Backlog

Future work (creative phase is closed):

1. Supporting-page consistency review: `/about` and `/services/web-development`.
2. Final Lanyard badge artwork (owner to decide).
3. Git-history privacy decision for the public repository (unsafe SetSail images remain in old commits).
4. Confirm the Tools entries shadcn/ui and Motion Primitives.

Launch (in order, each after explicit approval where noted):

1. Configure Resend contact delivery (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, Production only).
2. Test a real contact submission end to end.
3. SEO / GEO / AEO: homepage and page metadata, canonicals, structured data (Person and `pawlystudios.` entity
   consistency), sitemap, robots/indexing, Open Graph/Twitter, headings, image metadata.
4. Attach `/social-preview` to Open Graph/Twitter metadata.
5. Review final launch configuration.
6. Set `SITE_IS_LAUNCHED` to `true` (only after explicit approval).
7. Run final test/lint/build/security audit.
8. Final desktop/tablet/mobile smoke test.
9. Merge/push/deploy (only after explicit approval).
10. Verify the actual Vercel production deployment.
11. Verify canonical, robots, schema, social metadata, and contact delivery in production.

Deferred, not required for launch: custom domain, Upstash rate limiting, final commercial pricing, HSTS/CSP hardening
beyond the baseline, SetSail `SoftwareApplication` schema.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
