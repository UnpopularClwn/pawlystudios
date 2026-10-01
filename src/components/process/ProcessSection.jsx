import Section from '../shared/Section.jsx'
import Reveal from '../shared/Reveal.jsx'
import ProcessStep from './ProcessStep.jsx'
import RoadmapProgressLine from './RoadmapProgressLine.jsx'
import { process } from '../../data/process.js'
import './Process.css'

export default function ProcessSection() {
  return (
    <Section background="sand" className="process-section" aria-label="How it works" id="process">
      <Reveal as="div" className="process-intro" preset="content">
        <h2 className="process-heading">From the first conversation to a website you own.</h2>
        <p className="process-lead">
          Three stages from planning through launch, so you know what I&rsquo;m working on, what I need from
          you, and what happens next.
        </p>
      </Reveal>

      <div className="roadmap">
        <div className="roadmap-track-wrap">
          <RoadmapProgressLine />
          <ol className="roadmap-list">
            {process.map((step) => (
              <ProcessStep key={step.number} step={step} />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
