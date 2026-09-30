'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion.js'
import { setsail } from '../../data/setsail.js'
import './ApprovalIdea.css'

// One product decision, isolated: a generic content card you can push right to approve or left
// to ask for changes. It is a purpose-built portfolio visualization with invented content. It is
// deliberately NOT a piece of the SetSail interface, and it has no queue, counters, feedback form
// or any other connected behavior.
//
// Interaction model
// - Pointer/touch drag with resistance past the threshold and a small, controlled rotation.
// - Release past the threshold commits and the card leaves; otherwise it springs back.
// - The card is focusable: ArrowRight approves, ArrowLeft requests changes.
// - Two real buttons do the same thing, so the gesture is never required.
// - touch-action is pan-y, so vertical page scrolling always wins on touch.
// - Under reduced motion there is no throw, spring, or rotation. Dragging still works, and
//   decisions are applied instantly.
const { idea } = setsail.home

export default function ApprovalIdea({ onDecision }) {
  const stageRef = useRef(null)
  const cardRef = useRef(null)
  const proxy = useRef({ x: 0 })
  const drag = useRef({ active: false, startX: 0, pointerId: null })
  const busy = useRef(false)
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState(idea.instruction)

  const threshold = () => Math.min(120, (stageRef.current?.offsetWidth ?? 420) * 0.24)

  // Single paint path: card position, rotation, and the pull strength of each drop zone.
  const paint = useCallback((x) => {
    const card = cardRef.current
    const stage = stageRef.current
    if (!card || !stage) return
    const T = threshold()
    const rotation = prefersReducedMotion() ? 0 : (x / (T * 2.4)) * 9
    gsap.set(card, { x, rotation })
    const pull = Math.min(Math.abs(x) / T, 1).toFixed(3)
    stage.style.setProperty('--pull-right', x > 0 ? pull : '0')
    stage.style.setProperty('--pull-left', x < 0 ? pull : '0')
  }, [])

  useEffect(() => {
    const card = cardRef.current
    const state = proxy.current
    return () => gsap.killTweensOf([card, state])
  }, [])

  const springBack = useCallback(() => {
    gsap.killTweensOf(proxy.current)
    if (prefersReducedMotion()) {
      proxy.current.x = 0
      paint(0)
      return
    }
    gsap.to(proxy.current, {
      x: 0,
      duration: 0.55,
      ease: 'back.out(1.7)',
      onUpdate: () => paint(proxy.current.x),
    })
  }, [paint])

  const commit = useCallback(
    (direction) => {
      if (busy.current || result) return
      busy.current = true
      const sign = direction === 'approve' ? 1 : -1
      const finish = () => {
        setResult(direction)
        setStatus(idea.after[direction])
        busy.current = false
        onDecision?.(direction)
      }

      gsap.killTweensOf([cardRef.current, proxy.current])
      if (prefersReducedMotion()) {
        paint(sign * threshold())
        gsap.set(cardRef.current, { opacity: 0 })
        finish()
        return
      }
      const fly = (stageRef.current?.offsetWidth ?? 420) * 0.85
      gsap.to(proxy.current, {
        x: sign * fly,
        duration: 0.45,
        ease: 'power2.in',
        onUpdate: () => paint(proxy.current.x),
      })
      gsap.to(cardRef.current, { opacity: 0, duration: 0.3, delay: 0.15, onComplete: finish })
    },
    [onDecision, paint, result],
  )

  function reset() {
    setResult(null)
    setStatus(idea.resetStatus)
    busy.current = false
    proxy.current.x = 0
    paint(0)
    if (prefersReducedMotion()) {
      gsap.set(cardRef.current, { opacity: 1, y: 0 })
    } else {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'y' },
      )
    }
    cardRef.current?.focus({ preventScroll: true })
  }

  // Resistance: 1:1 up to the threshold, then a stiffening pull so the card feels held.
  function resist(dx) {
    const T = threshold()
    const abs = Math.abs(dx)
    if (abs <= T) return dx
    return Math.sign(dx) * (T + (abs - T) * 0.32)
  }

  function onPointerDown(event) {
    if (busy.current || result) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    gsap.killTweensOf(proxy.current)
    drag.current = { active: true, startX: event.clientX - proxy.current.x, pointerId: event.pointerId }
    event.currentTarget.setPointerCapture(event.pointerId)
    stageRef.current?.setAttribute('data-dragging', 'true')
  }

  function onPointerMove(event) {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return
    proxy.current.x = resist(event.clientX - drag.current.startX)
    paint(proxy.current.x)
  }

  function endDrag(event, cancelled = false) {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return
    drag.current.active = false
    stageRef.current?.removeAttribute('data-dragging')
    const x = proxy.current.x
    if (!cancelled && Math.abs(x) >= threshold()) {
      commit(x > 0 ? 'approve' : 'changes')
    } else {
      springBack()
    }
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      commit('approve')
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      commit('changes')
    }
  }

  return (
    <div className="idea" ref={stageRef} data-result={result ?? 'none'}>
      <div className="idea-stage">
        <div className="idea-zone idea-zone--left" aria-hidden="true">
          <span className="idea-zone-arrow">←</span>
          <span className="idea-zone-label">{idea.changes}</span>
        </div>
        <div className="idea-zone idea-zone--right" aria-hidden="true">
          <span className="idea-zone-arrow">→</span>
          <span className="idea-zone-label">{idea.approve}</span>
        </div>

        <div className="idea-card-wrap">
          <div
            className="idea-card"
            ref={cardRef}
            role="group"
            aria-label="Sample content card. Use the left and right arrow keys, or the buttons below."
            aria-hidden={result ? 'true' : undefined}
            tabIndex={result ? -1 : 0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => endDrag(event)}
            onPointerCancel={(event) => endDrag(event, true)}
            onLostPointerCapture={(event) => endDrag(event, true)}
            onKeyDown={onKeyDown}
          >
            <div className="idea-card-art" aria-hidden="true">
              <span className="idea-art-sun" />
              <span className="idea-art-loaf idea-art-loaf--a" />
              <span className="idea-art-loaf idea-art-loaf--b" />
            </div>
            <div className="idea-card-body">
              <span className="idea-card-tag">{idea.card.tag}</span>
              <p className="idea-card-title">{idea.card.title}</p>
              <p className="idea-card-note">{idea.card.note}</p>
            </div>
            <span className="idea-stamp idea-stamp--approve" aria-hidden="true">
              {idea.approve}
            </span>
            <span className="idea-stamp idea-stamp--changes" aria-hidden="true">
              {idea.changes}
            </span>
          </div>

          {result && (
            <div className="idea-result" data-result={result}>
              <span className="idea-result-mark" aria-hidden="true">
                {result === 'approve' ? '✓' : '↺'}
              </span>
              <button type="button" className="idea-again" onClick={reset}>
                {idea.reset}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="idea-actions">
        <button type="button" className="idea-btn idea-btn--changes" onClick={() => commit('changes')} disabled={Boolean(result)}>
          {idea.changes}
        </button>
        <button type="button" className="idea-btn idea-btn--approve" onClick={() => commit('approve')} disabled={Boolean(result)}>
          {idea.approve}
        </button>
      </div>

      <p className="idea-status" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  )
}
