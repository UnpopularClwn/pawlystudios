import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Timing hierarchy: small interaction (hover/micro) lives in CSS via
// --duration-fast; these presets cover scroll-triggered Reveal entrances.
export const MOTION = {
  default: { duration: 0.5, ease: 'power2.out', stagger: 0.08 },
  content: { duration: 0.6, ease: 'power2.out', stagger: 0.08 },
  feature: { duration: 0.85, ease: 'power3.out', stagger: 0.12 },
  slow: { duration: 0.7, ease: 'power1.out', stagger: 0.12 },
}

export { gsap }
