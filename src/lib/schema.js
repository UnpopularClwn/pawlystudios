import { BRAND_NAME, logo } from '../data/brand.js'
import { contact } from '../data/contact.js'
import { SITE_DESCRIPTION } from './seo-config.js'

// Route keys the pages pass to <JsonLd />. `path` is the canonical path, so page
// URLs always match the canonical, Open Graph and sitemap values.
export const SCHEMA_ROUTES = {
  home: { path: '/', type: 'WebPage' },
  about: { path: '/about', type: 'AboutPage' },
  contact: { path: '/contact', type: 'ContactPage' },
  webDevelopment: { path: '/services/web-development', type: 'WebPage', crumb: 'Web Development' },
  setsail: { path: '/work/setsail', type: 'WebPage', crumb: 'SetSail Case Study' },
  resume: { path: '/resume', type: 'ProfilePage', crumb: 'Resume' },
}

const PERSON_NAME = 'Niño Paul Cabiles'

// Page graph for one route. Shared entities (person, brand, website) are repeated on
// every page so each document is self-contained; ids are stable fragments of the
// canonical URLs. Returns null until launch with a valid site origin (`siteUrl` is the
// validated origin from seo-config), so nothing malformed or premature is ever emitted.
export function buildPageSchema({ siteUrl, isLaunched, route, title, description }) {
  const config = SCHEMA_ROUTES[route]
  if (!siteUrl || !isLaunched || !config) return null

  const urlFor = (path) => (path === '/' ? siteUrl : `${siteUrl}${path}`)
  const idFor = (path, fragment) => new URL(`${path}#${fragment}`, siteUrl).toString()

  const personId = idFor('/', 'paul-cabiles')
  const brandId = idFor('/', 'pawlystudios')
  const websiteId = idFor('/', 'website')
  const pageUrl = urlFor(config.path)
  const pageId = idFor(config.path, 'webpage')
  const breadcrumbId = idFor(config.path, 'breadcrumb')
  const serviceId = idFor('/services/web-development', 'service')

  const page = {
    '@type': config.type,
    '@id': pageId,
    url: pageUrl,
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
  }
  const extra = []

  if (route === 'home') page.about = { '@id': personId }
  if (route === 'about' || route === 'resume') page.mainEntity = { '@id': personId }

  if (route === 'webDevelopment') {
    page.mainEntity = { '@id': serviceId }
    extra.push({
      '@type': 'Service',
      '@id': serviceId,
      name: 'Web Development',
      serviceType: 'Web Development',
      url: pageUrl,
      description: 'Business websites, website rebuilds, and landing pages, with optional ongoing website support.',
      provider: { '@id': personId },
      brand: { '@id': brandId },
    })
  }

  // SetSail is a case study, not an offering or a software listing: a plain page
  // that is about the work, with no application or product fields.
  if (route === 'setsail') {
    page.about = {
      '@type': 'Thing',
      name: 'SetSail',
      description: 'A client portal and agency workspace.',
    }
  }

  if (config.crumb) {
    page.breadcrumb = { '@id': breadcrumbId }
    extra.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: urlFor('/') },
        { '@type': 'ListItem', position: 2, name: config.crumb, item: pageUrl },
      ],
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: PERSON_NAME,
        url: urlFor('/'),
        image: `${siteUrl}/images/paul-about-portrait.jpg`,
        sameAs: [contact.linkedin],
        brand: { '@id': brandId },
      },
      {
        '@type': 'Brand',
        '@id': brandId,
        name: BRAND_NAME,
        url: urlFor('/'),
        description: SITE_DESCRIPTION,
        logo: `${siteUrl}${logo.src}`,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: BRAND_NAME,
        url: urlFor('/'),
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      page,
      ...extra,
    ],
  }
}

export function serializeJsonLd(data) {
  return JSON.stringify(data).replaceAll('<', '\\u003c')
}
