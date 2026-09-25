import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import './Experience.css'

// A short credibility note, given its own quiet identity: a single pulled
// quote line beside the supporting paragraphs, rather than the question/answer
// rows used in What I Build.
export default function Experience() {
  return (
    <Section background="sand" className="experience-section" aria-labelledby="experience-heading">
      <Reveal as="div" className="experience-layout" selector=".experience-mark, .experience-copy > *" preset="content" y={16}>
        <div className="experience-mark" aria-hidden="true">
          <span>01</span>
        </div>

        <div className="experience-copy">
          <SectionEyebrow>Experience</SectionEyebrow>
          <h2 id="experience-heading">I&rsquo;ve worked on websites built to generate business.</h2>
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
