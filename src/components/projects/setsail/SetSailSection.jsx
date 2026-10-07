import Section from '../../shared/Section.jsx'
import SectionEyebrow from '../../shared/SectionEyebrow.jsx'
import Button from '../../shared/Button.jsx'
import { setsail } from '../../../data/setsail.js'
import './SetSail.css'

// A short pointer to the canonical SetSail case study. No product imagery on purpose: the full
// story lives at /work/setsail (see src/data/setsail.js for the copy and claim rules).
export default function SetSailSection() {
  return (
    <Section background="white" className="setsail-section" aria-labelledby="setsail-heading" id="work">
      <div className="setsail-layout">
        <div className="setsail-copy">
          <SectionEyebrow>A build behind the websites</SectionEyebrow>
          <h2 className="setsail-heading" id="setsail-heading">
            {setsail.name}
          </h2>
          <p className="setsail-description">{setsail.case.lead}</p>
        </div>
        <div className="setsail-action">
          <Button href={setsail.href} arrow>
            {setsail.buildCta}
          </Button>
        </div>
      </div>
    </Section>
  )
}
