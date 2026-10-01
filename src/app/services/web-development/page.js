import WebDevelopmentHero from '../../../components/services/web-development/WebDevelopmentHero.jsx'
import ServicesSection from '../../../components/services/ServicesSection.jsx'
import SetSailSection from '../../../components/projects/setsail/SetSailSection.jsx'
import ProcessSection from '../../../components/process/ProcessSection.jsx'
import MaintenanceSection from '../../../components/maintenance/MaintenanceSection.jsx'
import Footer from '../../../components/footer/Footer.jsx'

export const metadata = {
  title: 'Web Development',
  description:
    'Business websites, website rebuilds, and landing pages, planned, written, and built by pawlystudios. Ongoing support is available after launch.',
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
