'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, HOME_MOTION } from '../lib/motion.js'

// One short entrance for the identity and its supporting copy. The server
// render is complete; transforms and opacity are applied only while this runs.
export default function useBrandHeroEntrance() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion() || window.matchMedia('(max-width: 640px)').matches) return undefined

    const pick = (key) => root.querySelector(`[data-hero="${key}"]`)
    const identity = [pick('identity'), pick('headline')]
    const supporting = [pick('body1'), pick('body2'), pick('actions')]

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: HOME_MOTION.ease } })
        .fromTo(identity, { opacity: 0.85, y: HOME_MOTION.distance }, {
          opacity: 1, y: 0, duration: HOME_MOTION.duration, stagger: HOME_MOTION.stagger,
          clearProps: 'transform,opacity',
        }, 0)
        .fromTo(supporting, { opacity: 0.88, y: HOME_MOTION.distance }, {
          opacity: 1, y: 0, duration: HOME_MOTION.duration, stagger: HOME_MOTION.stagger,
          clearProps: 'transform,opacity',
        }, 0.12)
    }, root)

    return () => ctx.revert()
  }, [])

  return rootRef
}
