'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGsap, prefersReducedMotion } from '../../../lib/motion.js'

// A static diagram of the approval idea, with three annotations that appear one after another as
// the diagram scrolls into view. The motion has a job: it walks the reader through the three
// decisions in order. Everything is readable without it (reduced motion, or no JavaScript).
// Purely schematic: placeholder card outlines, no product UI.
export default function SwipeSchematic({ notes, className = '' }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return undefined
    registerGsap()

    // Already at or past the diagram (deep link, reload mid-page)? Leave it fully visible instead
    // of hiding it and waiting for a trigger that has already passed.
    if (root.getBoundingClientRect().top < window.innerHeight * 0.7) return undefined

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll('[data-note]')
      const ghosts = root.querySelectorAll('[data-ghost]')
      gsap.set(items, { opacity: 0, y: 10 })
      gsap.set(ghosts, { opacity: 0 })
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: 'top 70%', once: true } })
        .to(ghosts, { opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out' })
        .to(items, { opacity: 1, y: 0, duration: 0.45, stagger: 0.28, ease: 'power2.out' }, '<0.1')
    }, root)

    return () => ctx.revert()
  }, [])

  const left = notes.filter((note) => note.side === 'left')
  const right = notes.filter((note) => note.side === 'right')

  return (
    <div className={`cs-schematic ${className}`.trim()} ref={rootRef}>
      <ul className="cs-schematic-notes cs-schematic-notes--left">
        {left.map((note) => (
          <li data-note key={note.text}>
            {note.text}
          </li>
        ))}
      </ul>

      <div className="cs-schematic-figure" aria-hidden="true">
        <span className="cs-ghost cs-ghost--changes" data-ghost>
          <i />
          <i />
        </span>
        <span className="cs-ghost cs-ghost--approve" data-ghost>
          <i />
          <i />
        </span>
        <span className="cs-ghost cs-ghost--card">
          <em />
          <i />
          <i />
        </span>
        <span className="cs-arrow cs-arrow--left">←</span>
        <span className="cs-arrow cs-arrow--right">→</span>
      </div>

      <ul className="cs-schematic-notes cs-schematic-notes--right">
        {right.map((note) => (
          <li data-note key={note.text}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
