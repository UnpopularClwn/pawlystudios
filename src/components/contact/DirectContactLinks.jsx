import { contact } from '../../data/contact.js'

// Plain email and WhatsApp links from the canonical contact data. Used in the
// Contact intro and inside the form's unavailable/error states.
export default function DirectContactLinks({ className = '' }) {
  return (
    <ul className={`direct-contact ${className}`.trim()}>
      <li>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      <li>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Message me on WhatsApp, ${contact.whatsappDisplay}`}
        >
          WhatsApp {contact.whatsappDisplay}
        </a>
      </li>
    </ul>
  )
}
