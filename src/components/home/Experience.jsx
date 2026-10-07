import Link from 'next/link'
import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import { experience } from '../../data/experience.js'
import './Experience.css'

// The professional background behind the work: a short introduction, a brief "how I got here",
// then a ruled row of numbers from past remote roles. The numbers are set as type, not cards, and
// the context line sits directly above them so they are never read as pawlystudios. client counts.
// Copy lives in src/data/experience.js.
const { numbers } = experience

export default function Experience() {
  return (
    <Section background="sand" className="experience-section" aria-labelledby="experience-heading">
      <Reveal
        as="div"
        className="experience-layout"
        selector=".experience-head > *, .experience-story > *"
        preset="content"
        y={16}
      >
        <div className="experience-head">
          <SectionEyebrow variant="expressive">{experience.eyebrow}</SectionEyebrow>
          <h2 id="experience-heading">{experience.heading}</h2>
          {experience.intro.map((paragraph) => (
            <p className="experience-intro" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="experience-story">
          <p className="experience-story-label">{experience.story.label}</p>
          {experience.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <div className="experience-numbers">
        <p className="experience-numbers-context" id="experience-numbers-context">
          {numbers.context}
        </p>
        <Reveal
          as="ul"
          className="experience-numbers-list"
          selector=":scope > li"
          preset="content"
          y={12}
          aria-describedby="experience-numbers-context"
        >
          {numbers.items.map((item) => (
            <li className="experience-number" key={item.label}>
              <span className="experience-number-value">
                {item.spoken ? (
                  <>
                    <span aria-hidden="true">{item.value}</span>
                    <span className="visually-hidden">{item.spoken}</span>
                  </>
                ) : (
                  item.value
                )}
              </span>{' '}
              <span className="experience-number-label">{item.label}</span>
            </li>
          ))}
        </Reveal>
        <Link className="experience-resume-link" href="/resume">
          View résumé <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
