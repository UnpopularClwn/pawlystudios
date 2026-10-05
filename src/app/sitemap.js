import { SITE_IS_LAUNCHED, SITE_URL, INDEXABLE_ROUTES } from '../lib/seo-config.js'

// Empty (valid) sitemap until the site is launched with a valid SITE_URL, so a
// pre-launch or misconfigured build never advertises pages or malformed URLs.
export default function sitemap() {
  if (!SITE_IS_LAUNCHED || !SITE_URL) return []

  return INDEXABLE_ROUTES.map((path) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
  }))
}
