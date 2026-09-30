import { BRAND_NAME } from '../data/brand.js'

// Central place for site-identity constants the Metadata API and future
// JSON-LD (see lib/schema.js) both read from.
//
// SITE_IS_LAUNCHED gates indexing: flip to true once the full multi-page site
// is ready for search engines. Do not flip this based on
// NODE_ENV alone — `next build` sets NODE_ENV=production for local builds too.
export const SITE_IS_LAUNCHED = false

export const SITE_NAME = BRAND_NAME
export const SITE_TITLE = 'Web Development | pawlystudios.'
export const SITE_DESCRIPTION =
  'pawlystudios. is the web development and digital product practice of Niño Paul Cabiles, building functional websites and tools around real problems.'

// Intentionally unset until a production domain is assigned — do not fabricate one.
// Once known, set NEXT_PUBLIC_SITE_URL and read it here for `metadataBase`.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || undefined
