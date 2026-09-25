import Container from '../shared/Container.jsx'
import Button from '../shared/Button.jsx'
import BrandHeroMotion from './BrandHeroMotion.jsx'
import './BrandHero.css'

// Opens the homepage sequence. The hero carries identity only; the SetSail
// stage that follows owns the product imagery and lifts its laptop up across
// this section's bottom edge (see HomeSequence).
export default function BrandHero() {
  return (
    <section className="brand-hero" aria-labelledby="brand-hero-heading">
      <Container>
        <BrandHeroMotion className="brand-hero-copy">
          <p className="brand-hero-identity" data-hero="identity">
            Niño Paul Cabiles <span aria-hidden="true">·</span> AI-forward builder
          </p>
          <h1 className="brand-hero-headline" id="brand-hero-heading" data-hero="headline">
            I build modern websites and landing pages for businesses.
          </h1>
          <p className="brand-hero-lead" data-hero="body1">
            Maybe you need your first website. Maybe your current one feels outdated, doesn&rsquo;t show your work
            well, or no longer represents what your business has become.
          </p>
          <p className="brand-hero-lead" data-hero="body2">
            I build websites that make your business easy to understand, your work easy to find, and what you offer
            clear to the people visiting.
          </p>
          <div className="brand-hero-actions" data-hero="actions">
            <Button href="#contact" arrow>
              Have something you need to solve?
            </Button>
          </div>
        </BrandHeroMotion>
      </Container>
    </section>
  )
}
