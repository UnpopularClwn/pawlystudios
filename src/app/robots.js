import { INDEXING_ENABLED, SITE_URL } from '../lib/seo-config.js'

// Mirrors launch state. Pre-launch the whole site is disallowed and no sitemap is
// advertised. At launch the site is open (parked routes are kept out of search by
// their own noindex, which crawlers must be able to fetch) and the sitemap is
// advertised only when a valid SITE_URL exists.
export default function robots() {
  if (!INDEXING_ENABLED) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
