import { contact } from '../../data/contact.js'
import Container from '../shared/Container.jsx'
import FooterNav from './FooterNav.jsx'
import LanyardBadge from '../lanyard/LanyardBadge.jsx'
import './Footer.css'

// The footer is the homepage's final contact/conversion point: a heading and
// dominant email link do the asking, WhatsApp and LinkedIn sit underneath as
// secondary channels, and the identity/nav/copyright row below stays close to
// a conventional footer. `withLanyard` is homepage-only: it adds the
// interactive React Bits Lanyard badge beside the copy without loading the
// WebGL/physics stack on every other route that reuses this same Footer.
export default function Footer({ withLanyard = false }) {
  const year = new Date().getFullYear()

  const contacts = (
    <div className="footer-contacts">
      {contact.email && (
        <a className="footer-contact-email" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      )}
      <div className="footer-contact-secondary">
        {contact.whatsapp && (
          <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
            Message me on WhatsApp
          </a>
        )}
        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noreferrer noopener">
            Niño Paul Cabiles
          </a>
        )}
      </div>
    </div>
  )

  return (
    <footer className="site-footer">
      <Container>
        {withLanyard ? (
          <div className="footer-cta footer-cta--lanyard" id="contact">
            <div className="footer-cta-copy">
              <h2 className="footer-cta-heading">Have a website in mind? Let&rsquo;s talk.</h2>
              <p className="footer-cta-lead">
                If you&rsquo;re starting a new website, rebuilding an existing one, or need a landing page for
                something specific, tell me what you have in mind.
              </p>
              {contacts}
            </div>

            <div className="footer-lanyard-stage" aria-hidden="true">
              <LanyardBadge />
            </div>
          </div>
        ) : (
          <div className="footer-cta" id="contact">
            <h2 className="footer-cta-heading">Have a website in mind? Let&rsquo;s talk.</h2>
            <p className="footer-cta-lead">
              If you&rsquo;re starting a new website, rebuilding an existing one, or need a landing page for
              something specific, tell me what you have in mind.
            </p>
            {contacts}
          </div>
        )}

        <div className="footer-main">
          <div className="footer-identity">
            <p className="footer-name">Niño Paul Cabiles</p>
            <p className="footer-signature">pawlystudios.</p>
          </div>
          <FooterNav />
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© {year} Niño Paul Cabiles &middot; pawlystudios.</p>
        </div>
      </Container>
    </footer>
  )
}
