'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// The site's one smooth-scroll instance.
//
// Wheel and trackpad input is interpolated by Lenis (lerp 0.12: a light, controlled weight). Everything
// else stays native: touch (syncTouch off), the keyboard, find-in-page, focus scrolling, the scrollbar
// and nested scrollers (allowNestedScroll). Visitors who prefer reduced motion never get a Lenis
// instance at all, so native scrolling and instant anchor jumps apply.
//
// Anchors: same-page hash links (/#work, #contact, ...) animate with lenis.scrollTo. Lenis subtracts the
// root's scroll-padding-top, which global.css derives from --header-height, so targets land at the real
// header edge with no second offset here. Direct loads and cross-page hashes are not intercepted: Next
// scrolls to those natively and Lenis follows the native position.
//
// One animation loop: the single requestAnimationFrame loop below drives Lenis and is paused while the
// document is hidden.
const LERP = 0.12
const MQ_REDUCED = '(prefers-reduced-motion: reduce)'

export default function SmoothScroll() {
  const pathname = usePathname()
  const lenisRef = useRef(null)

  // On a route change Next resets the scroll position natively. Lenis ignores native scroll events while
  // it is mid-animation, so drop any residual interpolated movement or the new page could drift.
  useLayoutEffect(() => {
    lenisRef.current?.reset()
  }, [pathname])

  useEffect(() => {
    const reduced = window.matchMedia(MQ_REDUCED)
    let lenis = null
    let raf = 0

    const frame = (time) => {
      raf = requestAnimationFrame(frame)
      lenis.raf(time)
    }
    const startLoop = () => {
      if (lenis && !raf && !document.hidden) raf = requestAnimationFrame(frame)
    }
    const stopLoop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onVisibility = () => (document.hidden ? stopLoop() : startLoop())

    // Browser Back/Forward restores the position natively; stop any animation first.
    const onPopState = () => lenis?.reset()

    const onClick = (event) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      // The skip link keeps its native behaviour so keyboard focus still moves to the main content.
      if (!link || link.classList.contains('skip-link') || link.hasAttribute('download')) return
      if (link.target && link.target !== '_self') return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.hash.length < 2) return
      if (url.pathname !== window.location.pathname || url.search !== window.location.search) return
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return

      event.preventDefault()
      event.stopPropagation()
      lenis.scrollTo(target)
      if (url.hash !== window.location.hash) {
        window.history.pushState(null, '', url.pathname + url.search + url.hash)
      }
    }

    const enable = () => {
      if (lenis) return
      lenis = new Lenis({
        lerp: LERP,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        autoRaf: false,
      })
      lenisRef.current = lenis
      document.addEventListener('click', onClick, true)
      document.addEventListener('visibilitychange', onVisibility)
      window.addEventListener('popstate', onPopState)
      startLoop()
    }

    const disable = () => {
      stopLoop()
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('popstate', onPopState)
      lenis?.destroy()
      lenis = null
      lenisRef.current = null
    }

    const sync = () => (reduced.matches ? disable() : enable())
    sync()
    reduced.addEventListener('change', sync)

    return () => {
      reduced.removeEventListener('change', sync)
      disable()
    }
  }, [])

  return null
}
