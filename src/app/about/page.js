import AboutSection from '../../components/about/AboutSection.jsx'
import Footer from '../../components/footer/Footer.jsx'
import { canonicalFor, socialFor } from '../../lib/seo-config.js'

const description =
  'Learn about Niño Paul Cabiles, the person behind pawlystudios., and the experience that shaped how he approaches building websites for businesses.'

export const metadata = {
  title: 'About Niño Paul Cabiles',
  description,
  alternates: canonicalFor('/about'),
  ...socialFor({
    title: 'About Niño Paul Cabiles | pawlystudios.',
    description,
    path: '/about',
  }),
}

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <Footer />
    </>
  )
}
