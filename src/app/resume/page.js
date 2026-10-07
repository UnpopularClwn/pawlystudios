import ResumePage from '../../components/resume/ResumePage.jsx'
import Footer from '../../components/footer/Footer.jsx'
import { canonicalFor, socialFor } from '../../lib/seo-config.js'
import JsonLd from '../../components/seo/JsonLd.jsx'
import { resume } from '../../data/resume.js'

const fullTitle = 'Resume | Niño Paul Cabiles · pawlystudios.'
const description = 'Professional experience, projects, and tools used by Niño Paul Cabiles.'

export const metadata = {
  title: { absolute: fullTitle },
  description,
  alternates: canonicalFor('/resume'),
  ...socialFor({
    title: fullTitle,
    description,
    path: '/resume',
  }),
}

export default function Resume() {
  return (
    <>
      <JsonLd route="resume" title={fullTitle} description={description} />
      <ResumePage />
      <Footer ctaHeading={resume.contact.heading} ctaLead={resume.contact.lead} />
    </>
  )
}
