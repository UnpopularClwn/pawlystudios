import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import InquiryForm from './InquiryForm.jsx'
import './Contact.css'

export default function ContactSection() {
  return (
    <Section background="sand" className="contact-section" aria-label="Contact" id="contact">
      <div className="contact-grid">
        <Reveal as="div" className="contact-intro" preset="content">
          <SectionEyebrow>Ready to talk?</SectionEyebrow>
          <h1 className="contact-heading">Have a project in mind? Tell me about it.</h1>
          <p className="contact-lead">
            Send me a few details about what you&rsquo;re looking to build. I&rsquo;ll take a look and we can
            figure out the right next step.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="contact-form-surface"
          preset="feature"
          y={20}
          fromScale={0.99}
          selector=".field-group, .form-actions"
        >
          <InquiryForm />
        </Reveal>
      </div>
    </Section>
  )
}
