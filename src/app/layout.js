import { inter, generalSans, sofiaCondensed } from './fonts.js'
import SiteHeader from '../components/header/SiteHeader.jsx'
import SmoothScroll from '../components/shared/SmoothScroll.jsx'
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_URL, SITE_IS_LAUNCHED } from '../lib/seo-config.js'
import { buildLaunchSchema, serializeJsonLd } from '../lib/schema.js'
import '../styles/global.css'

export const metadata = {
  ...(SITE_URL
    ? {
        metadataBase: new URL(SITE_URL),
        alternates: { canonical: '/' },
      }
    : {}),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: SITE_IS_LAUNCHED
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({ children }) {
  const structuredData = buildLaunchSchema({ siteUrl: SITE_URL, isLaunched: SITE_IS_LAUNCHED })

  return (
    <html lang="en" className={`${inter.variable} ${generalSans.variable} ${sofiaCondensed.variable}`}>
      <head>
        {structuredData && (
          <script
            id="pawlystudios-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
          />
        )}
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
