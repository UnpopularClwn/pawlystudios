import ContactSection from '../../components/contact/ContactSection.jsx'
import Footer from '../../components/footer/Footer.jsx'
import { canonicalFor, socialFor } from '../../lib/seo-config.js'
import JsonLd from '../../components/seo/JsonLd.jsx'

const fullTitle = 'Contact | pawlystudios.'
const description =
  'Get in touch with Niño Paul Cabiles about a business website, website rebuild, or landing page.'

export const metadata = {
  title: 'Contact',
  description,
  alternates: canonicalFor('/contact'),
  ...socialFor({
    title: fullTitle,
    description,
    path: '/contact',
  }),
}

export default function ContactPage() {
  return (
    <>
      <JsonLd route="contact" title={fullTitle} description={description} />
      <ContactSection />
      <Footer showCtaCopy={false} />
    </>
  )
}
