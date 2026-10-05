import HomeSequence from '../components/home/HomeSequence.jsx'
import WhatIBuild from '../components/home/WhatIBuild.jsx'
import ToolsSection from '../components/tools/ToolsSection.jsx'
import Experience from '../components/home/Experience.jsx'
import HowIWork from '../components/home/HowIWork.jsx'
import AboutPaul from '../components/home/AboutPaul.jsx'
import Faq from '../components/home/Faq.jsx'
import Footer from '../components/footer/Footer.jsx'
import { SITE_TITLE, canonicalFor, socialFor } from '../lib/seo-config.js'
import JsonLd from '../components/seo/JsonLd.jsx'

const description =
  'Niño Paul Cabiles builds business websites, website rebuilds, and landing pages through pawlystudios.'

export const metadata = {
  title: { absolute: SITE_TITLE },
  description,
  alternates: canonicalFor('/'),
  ...socialFor({
    title: SITE_TITLE,
    description,
    path: '/',
  }),
}

export default function HomePage() {
  return (
    <>
      <JsonLd route="home" title={SITE_TITLE} description={description} />
      <HomeSequence />
      <WhatIBuild />
      <ToolsSection withoutReveal eyebrowVariant="quiet" />
      <Experience />
      <HowIWork />
      <AboutPaul />
      <Faq />
      <Footer withLanyard />
    </>
  )
}
