import { inter, generalSans, sofiaCondensed } from './fonts.js'
import SiteHeader from '../components/header/SiteHeader.jsx'
import SmoothScroll from '../components/shared/SmoothScroll.jsx'
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_URL, INDEXING_ENABLED, socialFor } from '../lib/seo-config.js'
import '../styles/global.css'

export const metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: INDEXING_ENABLED
    ? { index: true, follow: true }
    : { index: false, follow: false },
  ...socialFor({ title: SITE_TITLE, description: SITE_DESCRIPTION }),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${generalSans.variable} ${sofiaCondensed.variable}`}>
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
