'use client'

import { useEffect } from 'react'

// Smooth scrolling is switched on only after hydration. Until then the browser's own fragment scroll
// (a direct load of /#contact) lands instantly instead of gliding down the page from the top. After
// that, in-page anchor clicks use the CSS `scroll-behavior: smooth` in global.css. No scroll or
// wheel handling happens here, so native wheel, trackpad and touch scrolling are untouched.
export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.setAttribute('data-smooth-scroll', 'on')
  }, [])

  return null
}
