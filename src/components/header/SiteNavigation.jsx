'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function SiteNavigation() {
  const pathname = usePathname()

  return (
    <nav className={`site-navigation ${pathname === '/' ? 'site-navigation--home' : ''}`} aria-label="Primary navigation">
      <Link href="/" className="site-header-brand" aria-label="Paul Cabiles, home">
        <span className="site-header-name">Paul Cabiles</span>
        <span className="site-header-signature">pawlystudios.</span>
      </Link>

      <ul className="site-navigation-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="site-navigation-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
