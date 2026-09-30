import Link from 'next/link'
import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import { whatIBuild } from '../../data/whatIBuild.js'
import './WhatIBuild.css'

// Question-led rows rather than floating cards: each offer opens with the
// visitor's own question, then answers it with the service name and copy.
export default function WhatIBuild() {
  return (
    <Section background="white" className="wib-section" aria-labelledby="wib-heading" id="what-i-build">
      <Reveal as="div" className="wib-intro" preset="content">
        <SectionEyebrow variant="expressive">{whatIBuild.eyebrow}</SectionEyebrow>
        <h2 id="wib-heading">{whatIBuild.heading}</h2>
      </Reveal>

      <Reveal as="ol" className="wib-list" selector=":scope > .wib-row" preset="content" y={16}>
        {whatIBuild.offers.map((offer, index) => (
          <li className="wib-row" key={offer.title}>
            <span className="wib-row-number">{String(index + 1).padStart(2, '0')}</span>
            <p className="wib-prompt">{offer.prompt}</p>
            <div className="wib-answer">
              <p className="wib-title">{offer.title}</p>
              <p className="wib-description">{offer.description}</p>
            </div>
          </li>
        ))}
      </Reveal>

      <div className="wib-cta">
        <Link href={whatIBuild.cta.href} className="wib-cta-link">
          {whatIBuild.cta.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
