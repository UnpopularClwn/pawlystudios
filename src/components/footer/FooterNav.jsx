import Link from 'next/link'

const FOOTER_NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'FAQ', href: '/#faq' },
]

export default function FooterNav() {
  return (
    <nav className="footer-nav" aria-label="Footer navigation">
      <ul className="footer-nav-list">
        {FOOTER_NAV_LINKS.map((link) => (
          <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
        ))}
      </ul>
    </nav>
  )
}
