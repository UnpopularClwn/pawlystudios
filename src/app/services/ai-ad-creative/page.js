import AiAdCreativeHero from '../../../components/services/ai-ad-creative/AiAdCreativeHero.jsx'
import CreativeTypes from '../../../components/services/ai-ad-creative/CreativeTypes.jsx'
import OrganicToPaidSection from '../../../components/services/ai-ad-creative/OrganicToPaidSection.jsx'
import CreativeStrategySection from '../../../components/services/ai-ad-creative/CreativeStrategySection.jsx'
import CreativePipeline from '../../../components/services/ai-ad-creative/CreativePipeline.jsx'
import AudienceSection from '../../../components/services/ai-ad-creative/AudienceSection.jsx'
import WorkingTogether from '../../../components/services/ai-ad-creative/WorkingTogether.jsx'
import SelectedCreative from '../../../components/services/ai-ad-creative/SelectedCreative.jsx'
import AiAdCreativeCta from '../../../components/services/ai-ad-creative/AiAdCreativeCta.jsx'
import Footer from '../../../components/footer/Footer.jsx'

export const metadata = {
  title: 'AI Ad Creative',
  description:
    'Fully AI-generated advertising creative for e-commerce brands and service businesses, from concept through post-production.',
  // Parked work: stays out of search even if SITE_IS_LAUNCHED flips.
  robots: { index: false, follow: false },
}

export default function AiAdCreativePage() {
  return (
    <>
      <AiAdCreativeHero />
      <SelectedCreative />
      <CreativeTypes />
      <OrganicToPaidSection />
      <CreativeStrategySection />
      <CreativePipeline />
      <AudienceSection />
      <WorkingTogether />
      <AiAdCreativeCta />
      <Footer />
    </>
  )
}
