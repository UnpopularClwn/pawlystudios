import { Inter, Sofia_Sans_Extra_Condensed } from 'next/font/google'
import localFont from 'next/font/local'

// Three roles, three families (see --font-ui / --font-display / --font-expressive
// in styles/tokens.css):
//   UI          system stack (SF on Apple), Inter as the non-Apple webfont
//   DISPLAY     General Sans
//   EXPRESSIVE  Sofia Sans Extra Condensed

// Inter is only the fallback behind -apple-system / BlinkMacSystemFont. With
// preload off, Apple devices never download it: the browser only fetches a
// webfont it actually needs to render.
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

export const generalSans = localFont({
  src: [
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-general-sans',
  display: 'swap',
})

// Narrow, light, tracked uppercase for small labels and oversized numerals.
// Never used for paragraphs.
export const sofiaCondensed = Sofia_Sans_Extra_Condensed({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-sofia',
  display: 'swap',
})
