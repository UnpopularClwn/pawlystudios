import BrandHero from './BrandHero.jsx'
import SetSailStage from './SetSailStage.jsx'
import './HomeSequence.css'

// Hero, then the SetSail Featured Build. They no longer share a device hand-off: SetSail has its
// own stage (see SetSailStage.jsx).
export default function HomeSequence() {
  return (
    <div className="home-sequence">
      <BrandHero />
      <SetSailStage />
    </div>
  )
}
