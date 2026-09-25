import BrandHero from './BrandHero.jsx'
import SetSailStage from './SetSailStage.jsx'
import './HomeSequence.css'

// Hero -> SetSail read as one authored sequence: the stage lifts its laptop
// across the hero's bottom edge, and both sections size from the same
// custom properties (see HomeSequence.css).
export default function HomeSequence() {
  return (
    <div className="home-sequence">
      <BrandHero />
      <SetSailStage />
    </div>
  )
}
