'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// On the homepage the labels scroll to its sections. Everywhere else About and Contact go to their
// dedicated routes. There is no /work index, so Work always points at the homepage Selected Work.
const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about', route: '/about' },
  { label: 'Contact', href: '/#contact', route: '/contact' },
]

export default function SiteNavigation() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav className={`site-navigation ${isHome ? 'site-navigation--home' : ''}`} aria-label="Primary navigation">
      <Link href="/" className="site-header-brand">
        <span className="site-header-name">Niño Paul Cabiles</span>
        <span className="site-header-signature">pawlystudios.</span>
      </Link>

      <ul className="site-navigation-links">
        {NAV_LINKS.map((link) => {
          const href = !isHome && link.route ? link.route : link.href
          const isCurrent = !isHome && link.route === pathname
          return (
            <li key={link.label}>
              <Link href={href} className="site-navigation-link" aria-current={isCurrent ? 'page' : undefined}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
