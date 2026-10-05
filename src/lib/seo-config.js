import { BRAND_NAME } from '../data/brand.js'

// Central place for site-identity constants the Metadata API and future
// JSON-LD (see lib/schema.js) both read from.
//
// SITE_IS_LAUNCHED is one of the two conditions for indexing (see INDEXING_ENABLED
// below): flip to true once the full multi-page site is ready for search engines.
// Do not flip this based on NODE_ENV alone — `next build` sets NODE_ENV=production
// for local builds too.
export const SITE_IS_LAUNCHED = false

export const SITE_NAME = BRAND_NAME
export const SITE_TITLE = 'Niño Paul Cabiles | Web Developer · pawlystudios.'
export const SITE_DESCRIPTION =
  'pawlystudios. is the portfolio and creative identity of Niño Paul Cabiles, focused on business websites, website rebuilds, and landing pages.'

// Intentionally unset until a production domain is assigned — do not fabricate one.
// Once known, set NEXT_PUBLIC_SITE_URL and read it here for `metadataBase`.
// This is the single validation point for the site origin: an absolute http(s)
// URL is normalized to its origin (no path, no trailing slash); anything missing
// or malformed becomes `undefined`, so canonicals, the sitemap, robots and schema
// all stay silent instead of emitting broken URLs.
export function parseSiteUrl(raw) {
  if (!raw) return undefined
  try {
    const url = new URL(raw)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.origin : undefined
  } catch {
    return undefined
  }
}

export const SITE_URL = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

// The single indexing switch. The site is indexable only when it is launched AND
// has a valid origin, so a launch with a missing or malformed NEXT_PUBLIC_SITE_URL
// fails closed (noindex, robots Disallow, empty sitemap, no schema) instead of
// exposing a half-configured site. Every indexing decision reads this, never
// SITE_IS_LAUNCHED directly.
export function isIndexingEnabled({ isLaunched, siteUrl }) {
  return isLaunched === true && Boolean(siteUrl)
}

export const INDEXING_ENABLED = isIndexingEnabled({ isLaunched: SITE_IS_LAUNCHED, siteUrl: SITE_URL })

// The only routes that belong in the sitemap. Parked or internal routes
// (/services/ai-ad-creative, /social-preview) are deliberately absent.
export const INDEXABLE_ROUTES = ['/', '/about', '/contact', '/services/web-development', '/work/setsail']

// Each route owns its canonical path. Resolved against `metadataBase`, so it is
// only emitted once SITE_URL is known and is never inherited from the root layout.
export const canonicalFor = (path) => (SITE_URL ? { canonical: path } : undefined)

// One shared social card for every route. Served by src/app/social-preview/route.js.
export const SOCIAL_IMAGE = {
  path: '/social-preview',
  width: 1200,
  height: 630,
  alt: 'pawlystudios. by Niño Paul Cabiles, business websites, website rebuilds, and landing pages.',
}

// Open Graph + Twitter metadata for a route. `title` is the full rendered title
// (not the template fragment) so shared links never fall back to the homepage's.
// `path` is omitted for the root default. URLs and the image are relative and
// resolve against `metadataBase`, so they are only emitted when SITE_URL is valid.
export function socialFor({ title, description, path }) {
  const image = { url: SOCIAL_IMAGE.path, width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height, alt: SOCIAL_IMAGE.alt }

  return {
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      ...(SITE_URL && path ? { url: path } : {}),
      ...(SITE_URL ? { images: [image] } : {}),
    },
    twitter: {
      card: SITE_URL ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(SITE_URL ? { images: [{ url: image.url, alt: image.alt }] } : {}),
    },
  }
}
