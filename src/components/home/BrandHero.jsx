import Container from '../shared/Container.jsx'
import Button from '../shared/Button.jsx'
import NightShiftArt from './nightshift/NightShiftArt.jsx'
import './BrandHero.css'

// Opens the homepage sequence. The Night Shift illustration (decorative, aria-hidden) fills the hero
// behind the copy: the lower hero belongs to the scene, the upper hero to the content. The headline
// is one sentence split into four line spans so the entrance can reveal each line through a mask on
// desktop; on small screens the spans simply flow inline and wrap naturally.
const HEADLINE_LINES = ['I build modern', 'websites and', 'landing pages', 'for businesses.']

export default function BrandHero() {
  return (
    <section className="brand-hero" aria-labelledby="brand-hero-heading">
      <NightShiftArt />
      <Container className="brand-hero-container">
        <div className="brand-hero-copy">
          <div className="brand-hero-lede">
            <p className="brand-hero-identity" data-hero="identity">
              Niño Paul Cabiles <span aria-hidden="true">·</span> AI-forward builder
            </p>
            <h1 className="brand-hero-headline" id="brand-hero-heading" data-hero="headline">
              {HEADLINE_LINES.map((line, index) => (
                <span key={line}>
                  <span className="brand-hero-line">
                    <span className="brand-hero-line-text" style={{ '--i': index }}>
                      {line}
                    </span>
                  </span>
                  {index < HEADLINE_LINES.length - 1 ? ' ' : null}
                </span>
              ))}
            </h1>
          </div>

          <div className="brand-hero-support">
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
          </div>
        </div>
      </Container>
    </section>
  )
}
