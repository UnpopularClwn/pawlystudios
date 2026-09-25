import HomeSequence from '../components/home/HomeSequence.jsx'
import WhatIBuild from '../components/home/WhatIBuild.jsx'
import ToolsSection from '../components/tools/ToolsSection.jsx'
import Experience from '../components/home/Experience.jsx'
import HowIWork from '../components/home/HowIWork.jsx'
import AboutPaul from '../components/home/AboutPaul.jsx'
import Faq from '../components/home/Faq.jsx'
import Footer from '../components/footer/Footer.jsx'

export default function HomePage() {
  return (
    <>
      <HomeSequence />
      <WhatIBuild />
      <ToolsSection withoutReveal />
      <Experience />
      <HowIWork />
      <AboutPaul />
      <Faq />
      <Footer withLanyard />
    </>
  )
}
