import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import { homeProcess } from '../../data/homeProcess.js'
import './HowIWork.css'

// Three stages laid out side by side on desktop (collapsing to a single
// column on tablet/mobile), distinct from the five-service rows in What I
// Build and the six-step roadmap on /services/web-development.
export default function HowIWork() {
  return (
    <Section background="white" className="hiw-section" aria-labelledby="hiw-heading" id="how-i-work">
      <Reveal as="div" className="hiw-intro" preset="content">
        <SectionEyebrow>How I Work</SectionEyebrow>
        <h2 id="hiw-heading">From onboarding to launch.</h2>
      </Reveal>

      <Reveal as="ol" className="hiw-list" selector=":scope > .hiw-step" preset="content" y={16}>
        {homeProcess.map((step) => (
          <li className="hiw-step" key={step.number}>
            <span className="hiw-step-number">{step.number}</span>
            <div className="hiw-step-body">
              <h3 className="hiw-step-title">{step.title}</h3>
              {step.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}
