'use client'

import { useId, useState } from 'react'
import Section from '../shared/Section.jsx'
import { faq, faqIntro } from '../../data/faq.js'
import './Faq.css'

function FaqAnswer({ text }) {
  return text.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)
}

function FaqItem({ item, isOpen, onToggle }) {
  const baseId = useId()
  const buttonId = `${baseId}-question`
  const panelId = `${baseId}-answer`

  return (
    <div className="faq-item">
      <h3 className="faq-item-heading">
        <button
          type="button"
          id={buttonId}
          className="faq-question"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span className="faq-icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="faq-answer-wrap"
        data-open={isOpen}
      >
        <div className="faq-answer">
          <FaqAnswer text={item.answer} />
        </div>
      </div>
    </div>
  )
}

// Accessible accordion, no library: real buttons with aria-expanded /
// aria-controls, a heading/button/region structure per the standard
// disclosure pattern, and a CSS-only expand transition that the site's
// global prefers-reduced-motion rule already neutralizes.
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <Section background="pine" className="faq-section" aria-labelledby="faq-heading" id="faq">
      <div className="faq-layout">
        <div className="faq-intro">
          <h2 id="faq-heading">{faqIntro.heading}</h2>
          <p>{faqIntro.lead}</p>
        </div>

        <div className="faq-list">
          {faq.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
