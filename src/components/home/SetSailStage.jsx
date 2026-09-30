'use client'

import { useState } from 'react'
import Container from '../shared/Container.jsx'
import Button from '../shared/Button.jsx'
import ApprovalIdea from './ApprovalIdea.jsx'
import { setsail } from '../../data/setsail.js'
import './SetSailStage.css'

// Homepage entry to the SetSail case study.
//
// This section demonstrates ONE product decision (approve right, ask for changes left) with a
// purpose-built generic card, then says plainly that it was only part of the project and points
// to /work/setsail. It contains no product screens or mockups on purpose. All copy lives in
// src/data/setsail.js. The whole story reads without JavaScript or motion; the card is an
// enhancement.
const { home } = setsail

export default function SetSailStage() {
  const [decided, setDecided] = useState(false)

  return (
    <section className="ss" id="work" aria-labelledby="setsail-heading">
      <Container>
        <div className="ss-top">
          <div className="ss-copy">
            <h2 className="ss-title" id="setsail-heading">
              {setsail.name}
            </h2>
            {home.hook.map((line) => (
              <p className="ss-hook" key={line}>
                {line}
              </p>
            ))}
            <p className="ss-prompt">
              <span className="ss-prompt-arrow" aria-hidden="true">
                →
              </span>
              Try the idea.
            </p>
          </div>

          <div className="ss-play">
            <ApprovalIdea onDecision={() => setDecided(true)} />
          </div>
        </div>

        <div className="ss-bridge" data-decided={decided}>
          <h3 className="ss-bridge-heading">
            <span className="ss-bridge-mark">{home.bridge.heading}</span>
          </h3>
          <p className="ss-bridge-body">{home.bridge.body}</p>
        </div>

        <ul className="ss-evidence">
          {home.evidence.map((item) => (
            <li className="ss-evidence-item" key={item.label}>
              <p className="ss-evidence-figure">
                <span className="ss-evidence-value">{item.figure}</span>
                <span className="ss-evidence-label">{item.label}</span>
              </p>
              <p className="ss-evidence-note">{item.note}</p>
            </li>
          ))}
        </ul>

        <div className="ss-cta">
          <Button href={setsail.href} arrow>
            {home.cta}
          </Button>
          {/* Decorative hand-drawn arrow: leads the eye from the evidence row to the button. */}
          <svg className="ss-scribble" viewBox="0 0 150 70" fill="none" aria-hidden="true" focusable="false">
            <path d="M144 6 C126 3 104 8 88 22 C77 32 74 44 60 48 C48 52 34 46 20 38" />
            <path d="M19 38 C25 33 29 27 31 20" />
            <path d="M19 38 C27 40 34 45 38 52" />
          </svg>
        </div>
      </Container>
    </section>
  )
}
