import Container from '../shared/Container.jsx'
import Button from '../shared/Button.jsx'
import './BrandHero.css'

// Opens the homepage: identity, headline, supporting copy and one CTA on the brand color. Static, with
// no artwork and no entrance animation.
export default function BrandHero() {
  return (
    <section className="brand-hero" aria-labelledby="brand-hero-heading">
      <Container className="brand-hero-container">
        <div className="brand-hero-copy">
          <p className="brand-hero-identity">Niño Paul Cabiles</p>
          <h1 className="brand-hero-headline" id="brand-hero-heading">
            I build modern websites and landing pages for businesses.
          </h1>
          <p className="brand-hero-lead">
            Maybe you need your first website. Maybe your current one feels outdated, doesn&rsquo;t show your work
            well, or no longer represents what your business has become.
          </p>
          <p className="brand-hero-lead">
            I build websites that make your business easy to understand, your work easy to find, and what you offer
            clear to the people visiting.
          </p>
          <div className="brand-hero-actions">
            <Button href="#contact" arrow>
              Have something you need to solve?
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
