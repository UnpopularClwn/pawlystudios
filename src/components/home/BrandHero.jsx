import Container from '../shared/Container.jsx'
import Button from '../shared/Button.jsx'
import MachineArt from './machine/MachineArt.jsx'
import './BrandHero.css'

// Opens the homepage. The decorative "Move" artwork (aria-hidden) is the hero's environment. Desktop:
// it fills the hero and all the copy sits in its quiet left zone. Tablet: it is a band, with the
// identity and headline over its quiet upper left and the rest of the copy right below. Phone: the art
// is a band above all the copy. The headline is one sentence split into three line spans so it can be
// revealed line by line; on phones the spans flow inline and wrap naturally.
const HEADLINE_LINES = ['I build modern websites', 'and landing pages', 'for businesses.']

export default function BrandHero() {
  return (
    <section className="brand-hero" aria-labelledby="brand-hero-heading">
      <MachineArt />
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
