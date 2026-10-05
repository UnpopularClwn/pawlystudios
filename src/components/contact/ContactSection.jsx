import Section from '../shared/Section.jsx'
import SectionEyebrow from '../shared/SectionEyebrow.jsx'
import Reveal from '../shared/Reveal.jsx'
import { contact } from '../../data/contact.js'
import './Contact.css'

// Direct-contact page: email first, WhatsApp and LinkedIn as secondary channels.
// The inquiry form (InquiryForm.jsx and its server action) is kept in the repo but
// is intentionally not rendered at launch.
export default function ContactSection() {
  return (
    <Section background="sand" className="contact-section" aria-label="Contact">
      <Reveal as="div" className="contact-intro" preset="content">
        <SectionEyebrow>Ready to talk?</SectionEyebrow>
        <h1 className="contact-heading">Have a project in mind? Tell me about it.</h1>
        <p className="contact-lead">
          Send me a few details about what you&rsquo;re looking to build. I&rsquo;ll take a look and we can
          figure out the right next step.
        </p>

        <div className="contact-methods">
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <p className="contact-also">You can also reach me here:</p>
          <ul className="contact-secondary">
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
                WhatsApp {contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn Niño Paul Cabiles
              </a>
            </li>
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
