'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import LanyardErrorBoundary from './LanyardErrorBoundary.jsx'
import './LanyardBadge.css'

// WebGL/physics only ever run in the browser: the official Lanyard component
// is loaded client-side only so the server render (and hydration) never has
// to deal with @react-three/fiber's Canvas.
const Lanyard = dynamic(() => import('./Lanyard.jsx'), { ssr: false })

const FRONT_IMAGE = '/lanyard/badge-front.svg'
const BACK_IMAGE = '/lanyard/badge-back.svg'

function StaticBadge() {
  return (
    <div className="lanyard-static">
      <Image src={FRONT_IMAGE} alt="" width={320} height={450} className="lanyard-static-card" />
    </div>
  )
}

// Reduced-motion users get the same badge artwork with no physics/Canvas at
// all, so nothing here ever requires interacting with a swinging object to
// read the card. The real contact info around this component is plain HTML
// regardless of which branch renders.
export default function LanyardBadge() {
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const handleChange = (event) => setReducedMotion(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  if (reducedMotion) {
    return <StaticBadge />
  }

  return (
    <LanyardErrorBoundary fallback={<StaticBadge />}>
      <Lanyard
        position={[0, 0, 24]}
        gravity={[0, -40, 0]}
        frontImage={FRONT_IMAGE}
        backImage={BACK_IMAGE}
        imageFit="cover"
      />
    </LanyardErrorBoundary>
  )
}
