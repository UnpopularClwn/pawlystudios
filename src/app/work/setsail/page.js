import SetSailCaseStudy from '../../../components/work/setsail/SetSailCaseStudy.jsx'
import Footer from '../../../components/footer/Footer.jsx'
import { canonicalFor, socialFor } from '../../../lib/seo-config.js'
import JsonLd from '../../../components/seo/JsonLd.jsx'

const fullTitle = 'SetSail Case Study | pawlystudios.'
const description =
  'A case study on designing and building SetSail, a client portal and agency workspace shaped around a real workflow problem.'

export const metadata = {
  title: 'SetSail Case Study',
  description,
  alternates: canonicalFor('/work/setsail'),
  ...socialFor({
    title: fullTitle,
    description,
    path: '/work/setsail',
  }),
}

export default function SetSailCasePage() {
  return (
    <>
      <JsonLd route="setsail" title={fullTitle} description={description} />
      <SetSailCaseStudy />
      <Footer />
    </>
  )
}
