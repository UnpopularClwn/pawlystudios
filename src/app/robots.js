import { SITE_IS_LAUNCHED, SITE_URL } from '../lib/seo-config.js'

// Mirrors launch state. Pre-launch the whole site is disallowed and no sitemap is
// advertised. At launch the site is open (parked routes are kept out of search by
// their own noindex, which crawlers must be able to fetch) and the sitemap is
// advertised only when a valid SITE_URL exists.
export default function robots() {
  if (!SITE_IS_LAUNCHED) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    ...(SITE_URL ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  }
}
