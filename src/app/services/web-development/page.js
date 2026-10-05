import WebDevelopmentHero from '../../../components/services/web-development/WebDevelopmentHero.jsx'
import ServicesSection from '../../../components/services/ServicesSection.jsx'
import SetSailSection from '../../../components/projects/setsail/SetSailSection.jsx'
import ProcessSection from '../../../components/process/ProcessSection.jsx'
import MaintenanceSection from '../../../components/maintenance/MaintenanceSection.jsx'
import Footer from '../../../components/footer/Footer.jsx'
import { canonicalFor, socialFor } from '../../../lib/seo-config.js'

const description =
  'Business websites, website rebuilds, and landing pages built around what your business needs and what visitors need to understand.'

export const metadata = {
  title: 'Business Websites, Rebuilds & Landing Pages',
  description,
  alternates: canonicalFor('/services/web-development'),
  ...socialFor({
    title: 'Business Websites, Rebuilds & Landing Pages | pawlystudios.',
    description,
    path: '/services/web-development',
  }),
}

export default function WebDevelopmentPage() {
  return (
    <>
      <WebDevelopmentHero />
      <ServicesSection />
      <ProcessSection />
      <SetSailSection />
      <MaintenanceSection />
      <Footer />
    </>
  )
}
