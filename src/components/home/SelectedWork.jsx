import Image from 'next/image'
import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Button from '../shared/Button.jsx'
import Reveal from '../shared/Reveal.jsx'
import { setsail } from '../../data/setsail.js'
import './SelectedWork.css'

// SetSail as selected work: name, one line and the case study link, with one sanitized fragment
// from the real build. The homepage says "I built this"; /work/setsail explains why and how, so no
// counts, feature lists or architecture here. Copy and claim rules live in src/data/setsail.js.
const { selected } = setsail
const { proof } = setsail.case
const shot = proof.mobile

export default function SelectedWork() {
  return (
    <Section background="white" className="sw-section" aria-labelledby="sw-heading" id="work">
      <div className="sw-layout">
        <Reveal as="div" className="sw-copy" preset="content">
          <SectionEyebrow variant="expressive">{selected.eyebrow}</SectionEyebrow>
          <h2 className="sw-title" id="sw-heading">
            {setsail.name}
          </h2>
          <p className="sw-description">{selected.description}</p>
          <div className="sw-action">
            <Button href={setsail.href} arrow>
              {selected.cta}
            </Button>
          </div>
        </Reveal>

        <Reveal as="figure" className="sw-figure" preset="feature" y={24}>
          <div className="sw-panel">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 900px) calc(100vw - 48px), 560px"
            />
          </div>
          <figcaption>
            <span className="sw-figure-tag">{proof.tag}</span>
            <span>{proof.note}</span>
          </figcaption>
        </Reveal>
      </div>
    </Section>
  )
}
