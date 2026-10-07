import Image from 'next/image'
import Link from 'next/link'
import Container from '../../shared/Container.jsx'
import Button from '../../shared/Button.jsx'
import SwipeSchematic from './SwipeSchematic.jsx'
import ArchitectureDiagram from './ArchitectureDiagram.jsx'
import { setsail } from '../../../data/setsail.js'
import './SetSailCase.css'

// /work/setsail: the one canonical SetSail story. It is a case study about BUILDING SetSail, not
// a product demo. It uses concepts, diagrams and annotations only (no product screens), and each
// section has its own composition on purpose. All copy and claim rules live in src/data/setsail.js.
const { case: cs } = setsail
const { proof } = cs

function Proof({ shot, sizes, className = '', note = true }) {
  return (
    <figure className={`cs-proof ${className}`.trim()}>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} />
      <figcaption>
        <span className="cs-proof-tag">{proof.tag}</span>
        {note && <span className="cs-proof-note">{proof.note}</span>}
      </figcaption>
    </figure>
  )
}

// Abstract stage tracks: one filled node per stage, no labels, no product UI.
function StageTracks() {
  const onboarding = Array.from({ length: 8 })
  const recurring = Array.from({ length: 7 })
  return (
    <div
      className="cs-tracks"
      role="img"
      aria-label="Eight onboarding stages, then a seven-stage recurring cycle."
    >
      <div className="cs-track">
        <span className="cs-track-label">Onboarding</span>
        <span className="cs-track-line">
          {onboarding.map((_, index) => (
            <i key={index} data-done={index < 5 ? 'true' : undefined} data-now={index === 4 ? 'true' : undefined} />
          ))}
        </span>
        <span className="cs-track-count">8</span>
      </div>
      <div className="cs-track">
        <span className="cs-track-label">Ongoing cycle</span>
        <span className="cs-track-line cs-track-line--loop">
          {recurring.map((_, index) => (
            <i key={index} data-done={index < 3 ? 'true' : undefined} data-now={index === 2 ? 'true' : undefined} />
          ))}
        </span>
        <span className="cs-track-count">7</span>
      </div>
    </div>
  )
}

export default function SetSailCaseStudy() {
  return (
    <article className="cs">
      {/* ---------- Opening ---------- */}
      <header className="cs-hero">
        <Container>
          <Link className="cs-back" href="/#work">
            <span aria-hidden="true">←</span> Back to the homepage
          </Link>
          <h1 className="cs-title">{cs.title}</h1>
          <p className="cs-lead">{cs.lead}</p>
          <dl className="cs-meta">
            {cs.meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      {/* ---------- I noticed the friction ---------- */}
      <section className="cs-friction" aria-labelledby="cs-friction-heading">
        <Container>
          <div className="cs-friction-layout">
            <div className="cs-friction-lead">
              <h2 id="cs-friction-heading">{cs.friction.statement}</h2>
              <p>{cs.friction.body}</p>
            </div>
            <div className="cs-friction-log">
              <ul>
                {cs.friction.log.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="cs-friction-close">{cs.friction.close}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- One interaction changed the idea ---------- */}
      <section className="cs-decision" aria-labelledby="cs-decision-heading">
        <Container>
          <div className="cs-decision-head">
            <h2 id="cs-decision-heading">{cs.decision.heading}</h2>
            <p>{cs.decision.body}</p>
          </div>
          <SwipeSchematic notes={cs.decision.notes} />
        </Container>
      </section>

      {/* ---------- Approvals were only one part ---------- */}
      <section className="cs-grew" aria-labelledby="cs-grew-heading">
        <Container>
          <div className="cs-grew-head">
            <h2 id="cs-grew-heading">{cs.grew.heading}</h2>
            <p>{cs.grew.body}</p>
          </div>
          <Proof shot={proof.workflow} sizes="(max-width: 600px) 100vw, 560px" className="cs-proof--narrow" />
          <StageTracks />
          <div className="cs-proof-pair">
            <Proof shot={proof.stages} sizes="(max-width: 960px) 100vw, 640px" note={false} />
            <Proof shot={proof.mobile} sizes="(max-width: 960px) 80vw, 380px" className="cs-proof--mobile" />
          </div>
          <ol className="cs-grew-list">
            {cs.grew.notes.map((note) => (
              <li key={note.lead}>
                <h3>{note.lead}</h3>
                <p>{note.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------- Under the hood ---------- */}
      <section className="cs-hood" aria-labelledby="cs-hood-heading">
        <Container>
          <div className="cs-hood-layout">
            <div className="cs-hood-copy">
              <h2 id="cs-hood-heading">{cs.hood.heading}</h2>
              <p>{cs.hood.body}</p>
              <div className="cs-hood-notes">
                {cs.hood.notes.map((note, index) => (
                  <details key={note.title} open={index === 0}>
                    <summary>
                      <span className="cs-hood-title">{note.title}</span>
                      <span className="cs-hood-summary">{note.summary}</span>
                    </summary>
                    <p>{note.body}</p>
                  </details>
                ))}
              </div>
            </div>
            <ArchitectureDiagram label={cs.hood.diagram.label} nodes={cs.hood.diagram.nodes} />
          </div>
        </Container>
      </section>

      {/* ---------- How I built it ---------- */}
      <section className="cs-built" aria-labelledby="cs-built-heading">
        <Container>
          <h2 className="cs-built-heading" id="cs-built-heading">
            {cs.built.heading}
          </h2>
          <div className="cs-built-layout">
            <p className="cs-built-words" aria-hidden="true">
              {cs.built.words.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </p>
            <div className="cs-built-body">
              {cs.built.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Bridge back to the work I offer ---------- */}
      <section className="cs-bridge" aria-labelledby="cs-bridge-heading">
        <Container>
          <div className="cs-bridge-head">
            <h2 id="cs-bridge-heading">{cs.bridge.heading}</h2>
            <p>{cs.bridge.body}</p>
          </div>
          <ul className="cs-bridge-rows">
            {cs.bridge.rows.map((row) => (
              <li key={row.title}>
                <h3>{row.title}</h3>
                <p>{row.line}</p>
              </li>
            ))}
          </ul>
          <div className="cs-bridge-actions">
            <Button href="#contact" arrow>
              {cs.bridge.cta}
            </Button>
            <Link className="cs-bridge-link" href="/#what-i-build">
              {cs.bridge.secondary} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
