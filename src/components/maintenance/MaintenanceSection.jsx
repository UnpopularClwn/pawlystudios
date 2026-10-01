import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import Button from '../shared/Button.jsx'
import { maintenance } from '../../data/maintenance.js'
import './Maintenance.css'

export default function MaintenanceSection() {
  const { offer } = maintenance

  return (
    <Section
      background="sand"
      className="maintenance-section"
      aria-labelledby="maintenance-heading"
      id="maintenance"
    >
      <Reveal
        as="div"
        className="maintenance-panel"
        selector=".maintenance-intro, .maintenance-offer, .maintenance-ownership"
        preset="content"
        y={16}
      >
        <div className="maintenance-intro">
          <SectionEyebrow>{maintenance.eyebrow}</SectionEyebrow>
          <h2 className="maintenance-heading" id="maintenance-heading">
            {maintenance.heading}
          </h2>
          <p className="maintenance-lead">{maintenance.lead}</p>
        </div>

        <article className="maintenance-offer">
          <div className="maintenance-offer-heading">
            <h3>{offer.name}</h3>
          </div>

          <ul className="maintenance-features">
            {offer.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <Button href="/contact" variant="primary" className="maintenance-cta">
            {offer.ctaLabel}
          </Button>
        </article>

        <p className="maintenance-ownership">{maintenance.ownership}</p>
      </Reveal>
    </Section>
  )
}
