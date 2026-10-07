# Implementation Status

Last updated: 2026-10-07 (static hero; homepage restructure; `/resume` page).

This is the active status document. Product direction and design principles live in `PRODUCT.md`; agent rules and
boundaries live in `CLAUDE.md`. Everything under `docs/archive/` is historical and may describe earlier versions of
the site, including an older design identity. It is not a source of truth.

## Snapshot

- Identity: Niño Paul Cabiles. `pawlystudios.` is his creative identity / signature, not a multi-person agency.
- Primary work: Business Websites, Website Rebuilds, Landing Pages. SetSail demonstrates deeper product/build
  capability without redefining the offering.
- AI Ad Creative is parked and not part of the active direction.
- Phase: pre-launch; creative refinement closed. `SITE_IS_LAUNCHED` is `false`; the site is `noindex`.
- Supporting pages, the Website Machine hero and Lenis smooth scrolling are done and committed locally. The SEO
  metadata/indexing/social foundation is built (see Foundation). Schema, GEO and AEO content work are still pending.

## Repository State

- Active branch: Orca worktree `~/orca/workspaces/Portfolio/bladderwrack`, branch
  `UnpopularClwn/project-synchronization-review`. Several local checkpoint commits sit ahead of `origin/main` (see
  `git log`; the latest is the Website Machine hero + Lenis checkpoint). Not pushed. Working tree is clean apart from
  documented exclusions.
- `main` and `origin/main` are at `9c3f2139fdbcd10ef390ba0146eefa7618840ea1`. What the live Vercel deployment serves is
  NOT verified from this repository.
- `personal-portfolio-redesign` (original worktree `~/Documents/Projects/Portfolio`) points at `8938684`. Do not touch
  it. Its three untracked items (`portfolio logo transparent.svg`, `portfolio logo.png`, `public/images/new_img/`) are
  intentionally not part of this repository state; `new_img` holds unredacted SetSail screenshots.

## Current Homepage (working tree)

Order: Hero, What I Build, Experience, Selected Work, How I Work, Tools, About, FAQ, Contact-focused Footer with
Lanyard.

- Hero: identity line, H1 "I build modern websites and landing pages for businesses.", supporting copy and one CTA on
  the brand color. Static: the "Website Machine" canvas artwork (`src/components/home/machine/`) and the CSS text
  entrance were removed on 2026-10-07 at the owner's request. Night Shift (the earlier hero art) is also retired.
- What I Build: Business Websites, Website Rebuilds, Landing Pages (three-column rows on desktop).
- Tools: "Tools I Use" marquee (includes Claude Code and ChatGPT), static reduced-motion fallback. shadcn/ui and Motion
  Primitives appear as tools the owner uses, not as dependencies of this site.
- Experience: "I've been working remotely for over 5 years.", two intro paragraphs, a short "How I got here" story
  that ends on "I like knowing what I'm trying to solve before I start building.", then a ruled row of four numbers
  (5+ years working remotely, 100+ client accounts supported, 28 team members coordinated, 30–40 client social
  workflows managed) under the context line "Numbers from my remote roles over the years, not from my website work."
  These are historical role figures, never pawlystudios. client counts. Copy in `src/data/experience.js`.
- Selected Work: see SetSail Status. The case study's "Try the idea on the homepage" link was removed with the demo.
- How I Work: three stages.
- About: short story with the outdoor portrait.
- FAQ: seven questions.
- Footer: heading, email (dominant), WhatsApp +63 906 055 8493 and LinkedIn beneath, and the Lanyard.

Design system: three font roles (UI system stack with Inter fallback, DISPLAY General Sans, EXPRESSIVE Sofia Sans
Extra Condensed), fluid container, varied section rhythm, homepage type-scale tokens in `src/styles/tokens.css`.
Navigation: Work, About, Contact. Footer navigation: Work, About, Resume, Web Development, FAQ. The homepage
Experience section ends with a "View résumé" link.

## Routes

- `/`: homepage above.
- `/work/setsail`: the canonical SetSail case study. There is no `/work` index (404 by design).
- `/resume`: the structured professional record (copy in `src/data/resume.js`, sourced only from Paul's resume PDF).
  Introduction, at-a-glance figures from past roles (with the same "not from my website work" context line), three
  roles (SEO for Real Estate Investors, Marketing-Mo, Peak Support), SetSail as one short entry linking to the case
  study, Athena training, grouped tools, and the shared Footer with a "Want to talk?" heading. Indexable, canonical
  `/resume`, ProfilePage JSON-LD with a breadcrumb. **PDF download is on hold:** the resume PDF lists automatic
  content scheduling as a current SetSail feature, which conflicts with the SetSail claim rules. The owner will
  revise the PDF; then add it as `public/resume/nino-paul-cabiles-resume.pdf` with a "Download PDF" action. The
  source PDF sits untracked at `docs/AI-Forward Developer.docx.pdf` and is intentionally not committed.
- `/about`, `/services/web-development`: exist but predate the current positioning; queued for a consistency review
  (for example the web-development metadata and the schema Service description still mention "web portals").
  `/services/web-development` carries a compact SetSail pointer to `/work/setsail` (no imagery), the six-step roadmap,
  and the Website Maintenance offer, with no published pricing.
- `/contact`: form-only inquiry page; the form and server infrastructure are preserved.
- `/social-preview`: generated 1200 × 630 preview, not yet attached to Open Graph/Twitter metadata.
- `/services/ai-ad-creative`: parked draft, unlinked. Not part of the active direction.

## SetSail Status

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

## Lanyard Status

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

## Foundation and Infrastructure (still true)

- Next.js App Router, shared tokens, containers, sections, buttons, GSAP motion system with reduced-motion handling.
- Smooth scrolling: Lenis 1.3.26 (`src/components/shared/SmoothScroll.jsx`; lerp 0.12, wheelMultiplier 1, one rAF loop
  paused when the tab is hidden). Touch, keyboard, find-in-page and nested scrollers stay native; reduced motion
  creates no Lenis instance. Same-page hash clicks use `lenis.scrollTo` and land at the `--header-height` offset (via
  `scroll-padding-top`); there is no CSS `scroll-behavior: smooth`.
- Accessibility baseline: skip link, visible focus, muted-text contrast, dialog focus containment and restoration,
  keyboard operation, semantic structure, reduced-motion alternatives.
- Contact system: client and server validation, shared field limits, project-type allowlist (`Web Development`,
  `Website Maintenance`, `Other / Not Sure Yet`), malformed-payload handling, honeypot, optional rate limiting, Resend
  delivery that reports `NOT_CONFIGURED` until configured.
- SEO foundation (central config in `src/lib/seo-config.js`):
  - `SITE_URL` is validated once (absolute http/https, normalized to its origin; missing or malformed is `undefined`).
  - Each of the five public routes has its own title, description, self-referencing canonical (`canonicalFor`) and
    Open Graph / Twitter metadata (`socialFor`, `summary_large_image`, one shared 1200x630 card, no social handles).
  - `/services/ai-ad-creative` carries its own `noindex, nofollow` at any launch state. `/social-preview` (the card,
    a static `ImageResponse` in the brand blue/cream/red, default card font) is served with
    `X-Robots-Tag: noindex, nofollow`. Neither is in the sitemap, and robots does not block them so crawlers can
    see the noindex.
  - `robots.js`: `Disallow: /` and no sitemap while `SITE_IS_LAUNCHED` is false; `Allow: /` plus the absolute sitemap
    URL when launched with a valid `SITE_URL`. `sitemap.js`: empty until launched with a valid `SITE_URL`, then
    exactly `/`, `/about`, `/contact`, `/services/web-development`, `/work/setsail`, `/resume`.
  - Structured data (`src/lib/schema.js`, rendered per page by `src/components/seo/JsonLd.jsx`) is emitted only when
    launched with a valid `SITE_URL`. Each page graph holds Person, Brand (`pawlystudios.`, not a LocalBusiness or
    Organization), WebSite, and a page node (WebPage / AboutPage / ContactPage / ProfilePage). The web development page adds a
    Service and a breadcrumb; SetSail is a plain WebPage with a breadcrumb. No FAQPage, ratings, offers, address or
    SoftwareApplication. `SITE_IS_LAUNCHED` remains `false`; the site is `noindex`.
- Security headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, a conservative
  `Permissions-Policy`, a report-only CSP; the Next.js signature is disabled.
- Pixel-exact optimized runtime logo and favicon derived from the unchanged approved transparent SVG.
- Earlier QA (visual, responsive, accessibility, motion, hosted deployment, Lighthouse: Performance 96, Accessibility
  100, Best Practices 96, SEO 66 while noindex) was recorded against an older pre-launch build, before the current
  homepage. Re-run it after the creative work.

## Known Design Observations (not requirements)

- Several installed design skills advise increasing whitespace; this project wants intentional density (see
  `PRODUCT.md`).
- Flagged for the accessibility / SEO launch audit: same-page hash links go through Next `<Link>`, which scrolls
  without moving the browser's sequential focus starting point (identical with Lenis on or off); only the skip link is
  a native anchor and is left native.
- Flagged for later consideration only: the number of small labels above headings; a 3px accent side-border on the About
  turn line; the Tools marquee has no pause on hover/focus; no
  `not-found` page and no privacy link near the contact form.

## Next.js Security State

- Runtime versions: `next@16.3.3`, `react@19.2.8`, `react-dom@19.2.8` (patched in `a96da75`).
- The critical unauthenticated-RCE advisories (`GHSA-p293-qw3h-jr36`, `GHSA-2xp9-vwfh-vxw4`, affecting `next`
  `16.0.0–16.3.2`) are resolved.
- Remaining `npm audit --omit=dev` findings, both transitive through `next`: `sharp <0.35.4` (HIGH, libheif) and
  `baseline-browser-mapping >=2.0.0 <2.11.0` (MODERATE, DoS). Do not pin/override without a separate, reviewed
  dependency task, and do not run `npm audit fix`.

## Vercel / Environment State

- Vercel project: `pawlystudios`. Pre-launch URL: `https://pawlystudios.vercel.app` (custom domain intentionally
  deferred, not required for the initial launch).
- `NEXT_PUBLIC_SITE_URL=https://pawlystudios.vercel.app` is configured for **Production only**; Preview and Development
  are intentionally unset.
- As of the last documented check no delivery variables are set: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`,
  `CONTACT_TO_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Verify in Vercel before relying on this.
- `SITE_IS_LAUNCHED` remains `false`.
- Launch invariant: indexing is enabled only when `SITE_IS_LAUNCHED` is true AND `NEXT_PUBLIC_SITE_URL` is a valid
  http(s) origin (`INDEXING_ENABLED` in `src/lib/seo-config.js`, the only value indexing code reads). Otherwise the site
  fails closed: `noindex, nofollow`, `robots.txt` `Disallow: /`, empty sitemap, no JSON-LD. Both settings are
  build-time (the flag is a source constant), so changing either needs a redeploy; still confirm them in launch
  rehearsal.

## Remaining Launch Order

1. Configure Resend contact delivery (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, Production only).
2. Test a real contact submission end to end.
3. SEO / GEO / AEO: metadata, canonicals, sitemap, robots/indexing, Open Graph/Twitter and structured data are done.
   Still pending: GEO/AEO content answers, heading and image review.
4. (Done) `/social-preview` is attached to Open Graph/Twitter metadata.
5. Review final launch configuration.
6. Set `SITE_IS_LAUNCHED` to `true` (only after explicit approval).
7. Run final test/lint/build/security audit.
8. Final desktop/tablet/mobile smoke test.
9. Merge/push/deploy (only after explicit approval).
10. Verify the actual Vercel production deployment.
11. Verify canonical, robots, schema, social metadata, and contact delivery in production.

Deferred, not required for this launch: custom domain, Upstash rate limiting (safe to add later), final commercial
pricing, HSTS/CSP hardening beyond the baseline, SetSail `SoftwareApplication` schema.

## Current Contact Details

- Email: `ninopaul.cabiles@gmail.com`
- WhatsApp: +63 906 055 8493 (`https://wa.me/639060558493`)
- LinkedIn: `https://www.linkedin.com/in/nino-paul-cabiles`

Values are centralized in `src/data/contact.js`.

## Intentionally Pending

- Creative follow-ups: supporting-page consistency review (`/about`, `/services/web-development`); final Lanyard badge
  artwork; confirm the Tools entries shadcn/ui and Motion Primitives.
- Git-history privacy decision: old commits of the public repository still contain removed SetSail images. No history
  rewrite has been done.
- Launch and domain: custom domain, SEO/GEO/AEO pass, sitemap, absolute JSON-LD IDs, final schema publication, Open
  Graph/Twitter attachment, SetSail `SoftwareApplication` schema decision.
- Form delivery: credentials and provider verification (architecture is complete and tested).
- Commercial content: approved prices; none are published.
- Security and QA: HSTS verification, enforcing CSP review, Lighthouse and domain-dependent QA on the final
  configuration (earlier numbers predate the current homepage).
- Final launch: explicit approval, `SITE_IS_LAUNCHED = true`, removing `noindex`, publishing the sitemap and schema.

## Important Project Rules

- Do not fabricate contact details, business claims, metrics, statistics, testimonials, client identities, or domains.
- Do not fake successful inquiry submission; legitimate submissions must keep returning `NOT_CONFIGURED` until a real
  provider is connected.
- Keep server components as the default. Keep GSAP as the main motion system.
- Do not add Motion, Tailwind, shadcn/ui, or Motion Primitives without a new approved requirement.
- Do not work on the parked AI Ad Creative route, and do not create a `/work` index.
- Do not reintroduce SetSail product screens or recreations; do not change the Lanyard physics.
- The client owns the finished website. Ongoing support is optional.
- Do not enable indexing, push, deploy, or change environment variables without explicit approval.

## Not Launch Ready

Creative refinement is closed, but launch configuration is intentionally unfinished. The inquiry form returns
`NOT_CONFIGURED`; no custom domain exists; domain-dependent metadata, sitemap, and schema publication are unset; the
Lanyard artwork is a placeholder; removed SetSail images remain in old Git history; and indexing must stay disabled
until final launch approval and QA.
