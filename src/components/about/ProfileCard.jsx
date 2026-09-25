'use client'

import { memo, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProfileCardTilt } from '../../lib/profileCardTilt.js'
import './ProfileCard.css'

function ProfileCardComponent({
  avatarUrl,
  iconUrl = '',
  innerGradient = 'linear-gradient(145deg, var(--color-pine-soft), var(--color-pine))',
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(254, 238, 166, 0.35)',
  behindGlowSize = '56%',
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  name,
  title,
  handle,
  contactText,
  contactHref = '/contact',
  showUserInfo = true,
}) {
  const wrapperRef = useRef(null)
  const [tiltEnabled, setTiltEnabled] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopPointer = window.matchMedia('(min-width: 821px) and (hover: hover) and (pointer: fine)')
    const update = () => setTiltEnabled(enableTilt && !reducedMotion.matches && (enableMobileTilt || desktopPointer.matches))

    update()
    reducedMotion.addEventListener('change', update)
    desktopPointer.addEventListener('change', update)
    return () => {
      reducedMotion.removeEventListener('change', update)
      desktopPointer.removeEventListener('change', update)
    }
  }, [enableMobileTilt, enableTilt])

  function handlePointerMove(event) {
    if (!tiltEnabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const { rotateX, rotateY } = getProfileCardTilt(x, y)
    wrapperRef.current?.style.setProperty('--pc-rotate-x', `${rotateX.toFixed(2)}deg`)
    wrapperRef.current?.style.setProperty('--pc-rotate-y', `${rotateY.toFixed(2)}deg`)
    wrapperRef.current?.style.setProperty('--pc-pointer-x', `${(x * 100).toFixed(1)}%`)
    wrapperRef.current?.style.setProperty('--pc-pointer-y', `${(y * 100).toFixed(1)}%`)
  }

  function resetTilt() {
    wrapperRef.current?.style.setProperty('--pc-rotate-x', '0deg')
    wrapperRef.current?.style.setProperty('--pc-rotate-y', '0deg')
    wrapperRef.current?.style.setProperty('--pc-pointer-x', '50%')
    wrapperRef.current?.style.setProperty('--pc-pointer-y', '50%')
  }

  return (
    <article
      ref={wrapperRef}
      className={`profile-card-wrapper ${tiltEnabled ? 'profile-card-wrapper--tilt' : ''} ${className}`.trim()}
      style={{
        '--pc-inner-gradient': innerGradient,
        '--pc-glow-color': behindGlowColor,
        '--pc-glow-size': behindGlowSize,
      }}
      aria-label={`${name}, ${title}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {behindGlowEnabled && <div className="profile-card-glow" aria-hidden="true" />}
      <div className="profile-card">
        <div className="profile-card-surface" aria-hidden="true" />
        {iconUrl && (
          <span className="profile-card-logo-plate" aria-hidden="true">
            <Image className="profile-card-logo" src={iconUrl} alt="" width={64} height={64} sizes="36px" />
          </span>
        )}
        <div className="profile-card-details" aria-hidden="true">
          <p className="profile-card-name">{name}</p>
          <p>{title}</p>
        </div>
        <div className="profile-card-portrait">
          <Image
            src={avatarUrl}
            alt={`Portrait of ${name}`}
            fill
            sizes="(max-width: 768px) 280px, 310px"
            className="profile-card-avatar"
          />
        </div>
        <div className="profile-card-footer">
          {showUserInfo && <span aria-hidden="true">@{handle}</span>}
          <Link href={contactHref} className="profile-card-contact">
            {contactText}
          </Link>
        </div>
      </div>
    </article>
  )
}

export default memo(ProfileCardComponent)
