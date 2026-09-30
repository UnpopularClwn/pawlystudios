# Implementation Status

Last updated: 2026-09-30 (final housekeeping checkpoint closing the creative refinement session).

This is the active status document. Product direction and design principles live in `PRODUCT.md`; agent rules and
boundaries live in `CLAUDE.md`. Everything under `docs/archive/` is historical and may describe earlier versions of
the site, including an older design identity. It is not a source of truth.

## Snapshot

- Identity: Niño Paul Cabiles. `pawlystudios.` is his creative identity / signature, not a multi-person agency.
- Primary work: Business Websites, Website Rebuilds, Landing Pages. SetSail demonstrates deeper product/build
  capability without redefining the offering.
- AI Ad Creative is parked and not part of the active direction.
- Phase: pre-launch; creative refinement closed. `SITE_IS_LAUNCHED` is `false`; the site is `noindex`.
- Creative refinement is closed and committed locally. Next work is supporting pages, then SEO and launch.

## Repository State

- Active branch: Orca worktree `~/orca/workspaces/Portfolio/bladderwrack`, branch
  `UnpopularClwn/project-synchronization-review`. The latest commit is the local "finalize pawlystudios. portfolio
  experience" checkpoint, on top of `8938684`. Not pushed. Working tree is clean apart from documented exclusions.
- `main` and `origin/main` are at `9c3f2139fdbcd10ef390ba0146eefa7618840ea1`. What the live Vercel deployment serves is
  NOT verified from this repository.
- `personal-portfolio-redesign` (original worktree `~/Documents/Projects/Portfolio`) points at `8938684`. Do not touch
  it. Its three untracked items (`portfolio logo transparent.svg`, `portfolio logo.png`, `public/images/new_img/`) are
  intentionally not part of this repository state; `new_img` holds unredacted SetSail screenshots.

## Current Homepage (working tree)

Order: Hero, SetSail Featured Build, What I Build, Tools, Experience, How I Work, About, FAQ, Contact-focused Footer
with Lanyard.

- Hero: identity line, H1 "I build modern websites and landing pages for businesses.", supporting copy and one CTA;
  two-column on desktop.
- SetSail Featured Build: see SetSail Status.
- What I Build: Business Websites, Website Rebuilds, Landing Pages (three-column rows on desktop).
- Tools: "Tools I Use" marquee (includes Claude Code and ChatGPT), static reduced-motion fallback. shadcn/ui and Motion
  Primitives appear as tools the owner uses, not as dependencies of this site.
- Experience: prior work with a digital marketing agency serving real estate investors; unnamed, no metrics.
- How I Work: three stages.
- About: short story with the outdoor portrait.
- FAQ: seven questions.
- Footer: heading, email (dominant), WhatsApp +63 906 055 8493 and LinkedIn beneath, and the Lanyard.

Design system: three font roles (UI system stack with Inter fallback, DISPLAY General Sans, EXPRESSIVE Sofia Sans
Extra Condensed), fluid container, varied section rhythm, homepage type-scale tokens in `src/styles/tokens.css`.
Navigation: Work, About, Contact. Footer navigation: Work, About, Web Development, FAQ.

## Routes

- `/`: homepage above.
- `/work/setsail`: the canonical SetSail case study. There is no `/work` index (404 by design).
- `/about`, `/services/web-development`: exist but predate the current positioning; queued for a consistency review
  (for example the web-development metadata and the schema Service description still mention "web portals").
  `/services/web-development` carries a compact SetSail pointer to `/work/setsail` (no imagery), the six-step roadmap,
  and the Website Maintenance offer, with no published pricing.
- `/contact`: form-only inquiry page; the form and server infrastructure are preserved.
- `/social-preview`: generated 1200 × 630 preview, not yet attached to Open Graph/Twitter metadata.
- `/services/ai-ad-creative`: parked draft, unlinked. Not part of the active direction.

## SetSail Status

- **Homepage Featured Build:** a large "SetSail" title, a two-sentence first-person hook, and a purpose-built generic
  approval card (invented bakery draft post, not a SetSail screen). Drag right to approve, left to request changes;
  resistance, controlled rotation, stamps, spring-back, release threshold. Accessible: two real buttons, ArrowLeft and
  ArrowRight on the focused card, `role="status"` live region, `touch-action: pan-y`, reduced-motion path. After a
  decision the section turns: "That solved one part of it." then four typographic evidence tiles (roles, onboarding
  stages, monthly reporting, stack) and a link to `/work/setsail`. No product screenshots or device mockups on the
  homepage.
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
- Accessibility baseline: skip link, visible focus, muted-text contrast, dialog focus containment and restoration,
  keyboard operation, semantic structure, reduced-motion alternatives.
- Contact system: client and server validation, shared field limits, project-type allowlist (`Web Development`,
  `Website Maintenance`, `Other / Not Sure Yet`), malformed-payload handling, honeypot, optional rate limiting, Resend
  delivery that reports `NOT_CONFIGURED` until configured.
- SEO scaffolding: root metadata, gated Person / ProfessionalService / WebSite / Service JSON-LD (builder in
  `src/lib/schema.js`, gated by `SITE_IS_LAUNCHED` and a real site URL), `robots.js` without a sitemap, `noindex`.
- Security headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, a conservative
  `Permissions-Policy`, a report-only CSP; the Next.js signature is disabled.
- Pixel-exact optimized runtime logo and favicon derived from the unchanged approved transparent SVG.
- Earlier QA (visual, responsive, accessibility, motion, hosted deployment, Lighthouse: Performance 96, Accessibility
  100, Best Practices 96, SEO 66 while noindex) was recorded against an older pre-launch build, before the current
  homepage. Re-run it after the creative work.

## Known Design Observations (not requirements)

- Several installed design skills advise increasing whitespace; this project wants intentional density (see
  `PRODUCT.md`).
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

## Remaining Launch Order

1. Configure Resend contact delivery (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, Production only).
2. Test a real contact submission end to end.
3. SEO / GEO / AEO: metadata, canonicals, structured data (Person and `pawlystudios.` entity consistency), sitemap,
   robots/indexing, Open Graph/Twitter, headings, image metadata.
4. Attach `/social-preview` to Open Graph/Twitter metadata.
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
