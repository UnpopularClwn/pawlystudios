import ContactSection from '../../components/contact/ContactSection.jsx'
import Footer from '../../components/footer/Footer.jsx'
import { canonicalFor, socialFor } from '../../lib/seo-config.js'

const description =
  'Get in touch with Niño Paul Cabiles about a business website, website rebuild, or landing page.'

export const metadata = {
  title: 'Contact',
  description,
  alternates: canonicalFor('/contact'),
  ...socialFor({
    title: 'Contact | pawlystudios.',
    description,
    path: '/contact',
  }),
}

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <Footer showCtaCopy={false} />
    </>
  )
}
