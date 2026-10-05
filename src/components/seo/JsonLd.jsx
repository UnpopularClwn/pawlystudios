import { SITE_URL, INDEXING_ENABLED } from '../../lib/seo-config.js'
import { buildPageSchema, serializeJsonLd } from '../../lib/schema.js'

// Server component: renders nothing until launch with a valid SITE_URL.
export default function JsonLd({ route, title, description }) {
  const data = buildPageSchema({ siteUrl: SITE_URL, isLaunched: INDEXING_ENABLED, route, title, description })
  if (!data) return null

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
}
