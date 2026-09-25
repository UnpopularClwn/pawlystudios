'use client'

import useBrandHeroEntrance from '../../hooks/useBrandHeroEntrance.js'

export default function BrandHeroMotion({ className = '', children }) {
  const ref = useBrandHeroEntrance()
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
