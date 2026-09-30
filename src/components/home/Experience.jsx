import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import './Experience.css'

// A short credibility note with its own composition: the number, label and
// statement sit on the left, the supporting paragraphs on the right, rather
// than the row/column patterns used in What I Build and How I Work.
export default function Experience() {
  return (
    <Section background="sand" className="experience-section" aria-labelledby="experience-heading">
      <Reveal as="div" className="experience-layout" selector=".experience-head > *, .experience-body > *" preset="content" y={16}>
        <div className="experience-head">
          <div className="experience-mark" aria-hidden="true">
            <span>01</span>
          </div>
          <SectionEyebrow variant="quiet">Experience</SectionEyebrow>
          <h2 id="experience-heading">I&rsquo;ve worked on websites built to generate business.</h2>
        </div>

        <div className="experience-body">
          <p>
            Before pawlystudios., I worked with a digital marketing agency focused on websites and SEO for real
            estate investors.
          </p>
          <p>
            The work went beyond getting a website online. We built websites around lead generation, worked to
            improve their visibility on Google, and helped real estate investors establish a stronger presence in
            their local markets.
          </p>
          <p>
            That experience shaped how I think about websites today. A business website should look good, but it
            should also make the business easy to find, easy to understand, and easy to contact.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
