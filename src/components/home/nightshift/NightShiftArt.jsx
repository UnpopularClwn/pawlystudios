'use client'

import { useEffect, useRef } from 'react'
import { D, STATIC_T, MODES, collectRefs, drawScene } from './nightShiftScene.js'
import './NightShiftArt.css'

// The Night Shift hero illustration: a purely decorative SVG animation behind the hero copy.
//
// The scene (see nightShiftScene.js) is the approved v3 prototype. This component only owns the
// lifecycle: it picks the layout mode from the same breakpoints the hero CSS uses, runs ONE
// requestAnimationFrame loop while the hero is on screen and the tab is visible, and draws a single
// static frame for visitors who prefer reduced motion. Nothing here touches React state per frame.
const MQ_MOBILE = '(max-width: 640px)'
const MQ_TABLET = '(max-width: 1180px)'
const MQ_REDUCED = '(prefers-reduced-motion: reduce)'

export default function NightShiftArt() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const svg = root?.querySelector('svg')
    if (!root || !svg) return undefined

    const el = collectRefs(svg)
    const mobile = window.matchMedia(MQ_MOBILE)
    const tablet = window.matchMedia(MQ_TABLET)
    const reduced = window.matchMedia(MQ_REDUCED)

    let mode = 'desktop'
    let t = 0
    let last = 0
    let raf = 0
    let running = false
    let visible = true
    let failed = false

    const render = () => {
      if (failed) return
      try {
        drawScene(el, reduced.matches ? STATIC_T : t, mode)
        root.setAttribute('data-ready', 'true')
      } catch (error) {
        failed = true
        console.error(error)
      }
    }

    const tick = (ts) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (ts - (last || ts)) / 1000)
      last = ts
      t = (t + dt) % D
      render()
    }

    // Runs only while the hero is near the viewport, the tab is visible, and motion is allowed.
    const sync = () => {
      const shouldRun = visible && !document.hidden && !reduced.matches
      if (shouldRun && !running) {
        running = true
        last = 0
        raf = requestAnimationFrame(tick)
      } else if (!shouldRun && running) {
        running = false
        cancelAnimationFrame(raf)
      }
      if (!shouldRun) render()
    }

    const applyMode = () => {
      mode = mobile.matches ? 'mobile' : tablet.matches ? 'tablet' : 'desktop'
      svg.setAttribute('viewBox', MODES[mode].vb)
      svg.setAttribute('preserveAspectRatio', MODES[mode].par)
      root.setAttribute('data-mode', mode)
      render()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { rootMargin: '120px 0px' },
    )
    observer.observe(root)

    applyMode()
    sync()

    mobile.addEventListener('change', applyMode)
    tablet.addEventListener('change', applyMode)
    reduced.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      mobile.removeEventListener('change', applyMode)
      tablet.removeEventListener('change', applyMode)
      reduced.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <div className="nsh" ref={rootRef} aria-hidden="true">
      <svg className="nsh-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" focusable="false">
        <defs>
        <clipPath id="nsh-slotclip"><rect x="-900" y="-900" width="3400" height="1644"></rect></clipPath>
        <clipPath id="nsh-pclip"><path data-ny="pclipP" d="M0 0"></path></clipPath>
        <clipPath id="nsh-gl"><circle cx="908" cy="420" r="12.5"></circle></clipPath>
        <clipPath id="nsh-gr"><circle cx="946" cy="416" r="12.5"></circle></clipPath>
        </defs>
        <path d="M690 780C686 600 790 488 935 486C1080 484 1176 600 1170 780Z" fill="#24386B"></path>
        <g data-ny="shelves">
        <path d="M1172 598L1760 548L1760 742L1180 724Z" fill="#24386B"></path>
        <path d="M1206 614L1282 608L1280 656L1208 660ZM1302 606L1384 600L1382 648L1304 654ZM1406 598L1494 590L1492 640L1408 646ZM1518 588L1612 580L1610 632L1520 638ZM1636 578L1736 570L1734 624L1638 630ZM1210 676L1280 672L1280 712L1212 714ZM1304 670L1382 666L1382 708L1306 710ZM1408 664L1492 660L1492 704L1410 706ZM1520 658L1610 654L1610 700L1522 702Z" fill="#1A2A55"></path>
        </g>
        <g data-ny="body">
        <path d="M742 762C748 650 780 588 834 562C858 550 884 548 904 552C962 556 1014 598 1040 650C1054 680 1060 722 1062 762Z" fill="#0E1730"></path>
        <path d="M880 556C872 526 878 498 888 474L926 470C932 498 928 528 936 556Z" fill="#0E1730"></path>
        <g data-ny="head">
        <path d="M888 470C866 450 862 408 884 382C906 356 952 354 972 382C990 408 986 448 964 470C944 490 908 490 888 470Z" fill="#0E1730"></path>
        <path data-ny="tuft" d="M902 372C902 340 928 322 956 332C976 318 1004 330 998 354C986 348 974 352 970 364C952 352 926 356 910 380Z" fill="#0E1730"></path>
        <g data-ny="pupils"><circle cx="908" cy="420" r="4.6" fill="#FEEEA6"></circle><circle cx="946" cy="416" r="4.6" fill="#FEEEA6"></circle></g>
        <rect data-ny="lidL" x="893" y="406" width="30" height="5" fill="#0E1730" clipPath="url(#nsh-gl)"></rect>
        <rect data-ny="lidR" x="931" y="402" width="30" height="5" fill="#0E1730" clipPath="url(#nsh-gr)"></rect>
        <circle cx="908" cy="420" r="14" fill="none" stroke="#FEEEA6" strokeWidth="3.4"></circle>
        <circle cx="946" cy="416" r="14" fill="none" stroke="#FEEEA6" strokeWidth="3.4"></circle>
        <path d="M922 418L932 417M960 414L984 409" stroke="#FEEEA6" strokeWidth="3" strokeLinecap="round"></path>
        </g>
        </g>
        <path data-ny="gsh" d="M0 0" fill="#0E1730" opacity=".16"></path>
        <path data-ny="surf" d="M0 0" fill="#1F3060"></path>
        <path d="M420 750C700 745 960 741 1206 744" stroke="#0B132A" strokeWidth="20" strokeLinecap="round" fill="none"></path>
        <g clipPath="url(#nsh-slotclip)">
        <path data-ny="pg" d="M0 0" fill="#FEEEA6"></path>
        <g clipPath="url(#nsh-pclip)">
        <rect data-ny="band" x="-40" y="380" width="80" height="420" fill="#1B2A50" opacity=".1"></rect>
        <g data-ny="ct">
        <g data-ny="hd"><path d="M0 -40C80 -42 170 -39 250 -41L251 0C170 2 80 -1 0 1Z" fill="#1B2A50"></path></g>
        <g data-ny="l0"><path d="M0 0L226 -1" stroke="#1B2A50" strokeWidth="12" strokeLinecap="round"></path></g>
        <g data-ny="l1"><path d="M0 0L190 1" stroke="#1B2A50" strokeWidth="12" strokeLinecap="round"></path></g>
        <g data-ny="l2"><path d="M0 0L208 0" stroke="#1B2A50" strokeWidth="12" strokeLinecap="round"></path></g>
        <g data-ny="tl"><path d="M-120 -126C-40 -129 40 -125 120 -127L118 0C40 -2 -40 0 -120 2Z" fill="#1B2A50"></path><circle cx="70" cy="-94" r="17" fill="#FEEEA6"></circle><path d="M-120 2L-120 -26C-84 -56 -54 -66 -24 -40C6 -64 44 -74 118 -24L118 0C40 -2 -40 0 -120 2Z" fill="#0E1730"></path></g>
        <g data-ny="bt"><path d="M-64 -17C-64 -25 -56 -20 0 -20C56 -20 64 -23 64 -15L64 13C64 20 56 17 0 17C-56 17 -64 21 -64 13Z" fill="#1B2A50"></path><path d="M-30 -1L30 -2" stroke="#FEEEA6" strokeWidth="5" strokeLinecap="round"></path></g>
        </g>
        </g>
        <path data-ny="pge" d="M0 0" stroke="#1B2A50" strokeWidth="2.5" fill="none" opacity=".35"></path>
        </g>
        <path data-ny="front" d="M0 0" fill="#16234A"></path>
        <path data-ny="lip" d="M0 0" stroke="#2A3F73" strokeWidth="3.5" fill="none"></path>
        <path data-ny="st1" d="M0 0" stroke="#FEEEA6" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity=".6"></path>
        <path data-ny="st2" d="M0 0" stroke="#FEEEA6" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity=".6"></path>
        <g data-ny="cup">
        <path d="M28 -50C48 -50 48 -20 26 -18" stroke="#0E1730" strokeWidth="12" fill="none"></path>
        <path d="M28 -50C48 -50 48 -20 26 -18" stroke="#FFF8E6" strokeWidth="5" fill="none"></path>
        <path data-ny="cupLegs" d="M0 0" stroke="#D82C31" strokeWidth="3" strokeLinecap="round" fill="none"></path>
        <path d="M-30 -62C-26 -64 26 -65 30 -61L25 -6C24 0 20 1 16 1L-17 0C-22 0 -24 -3 -25 -7Z" fill="#FFF8E6" stroke="#0E1730" strokeWidth="3" strokeLinejoin="round"></path>
        <ellipse cx="0" cy="-61" rx="26" ry="4.5" fill="#0E1730"></ellipse>
        <circle data-ny="sp1" cx="0" cy="-66" r="4.5" fill="#FFF8E6"></circle>
        <circle data-ny="sp2" cx="0" cy="-66" r="3.2" fill="#FFF8E6"></circle>
        </g>
        <path data-ny="streak" d="M0 0" stroke="#D82C31" strokeWidth="8" strokeLinecap="round" fill="none" opacity=".45"></path>
        <g data-ny="bug"><path data-ny="bugLegs" d="M0 0" stroke="#D82C31" strokeWidth="3" strokeLinecap="round" fill="none"></path><path d="M0 0L0 36L9 28L15 42L22 39L16 25L28 25Z" fill="#D82C31" stroke="#0E1730" strokeWidth="2.6" strokeLinejoin="round"></path></g>
        <g data-ny="chip"><path d="M-64 -17C-64 -25 -56 -20 0 -20C56 -20 64 -23 64 -15L64 13C64 20 56 17 0 17C-56 17 -64 21 -64 13Z" fill="#1B2A50"></path><path d="M-30 -1L30 -2" stroke="#FEEEA6" strokeWidth="5" strokeLinecap="round"></path></g>
        <g data-ny="G-c"><path data-ny="G-a" d="M0 0" fill="#EE8A3A"></path><path data-ny="G-s" d="M0 0" fill="#0E1730" opacity=".2"></path><g data-ny="G-h"><path data-ny="G-th" d="M0 0C-6 -28 14 -44 32 -37C44 -30 40 -14 26 -4Z" fill="#EE8A3A" stroke="#0E1730" strokeWidth="3.6" vectorEffect="non-scaling-stroke"></path><path data-ny="G-f3" d="M0 -10C16 -14 40 -12 48 -2C53 7 43 13 29 11C15 10 6 11 0 9Z" fill="#EE8A3A" stroke="#0E1730" strokeWidth="3.6" vectorEffect="non-scaling-stroke"></path><path data-ny="G-f2" d="M0 -11C18 -13 42 -13 50 -3C54 6 45 12 30 11C17 10 6 10 0 9Z" fill="#EE8A3A" stroke="#0E1730" strokeWidth="3.6" vectorEffect="non-scaling-stroke"></path><path data-ny="G-f1" d="M0 -10C17 -13 41 -11 49 -1C52 7 44 12 30 12C16 10 6 10 0 10Z" fill="#EE8A3A" stroke="#0E1730" strokeWidth="3.6" vectorEffect="non-scaling-stroke"></path><path data-ny="G-f0" d="M0 -10C16 -13 40 -12 48 -2C52 6 44 12 30 11C16 10 6 10 0 9Z" fill="#EE8A3A" stroke="#0E1730" strokeWidth="3.6" vectorEffect="non-scaling-stroke"></path><path d="M-14 -32C8 -46 54 -42 72 -24C86 -8 84 16 70 30C50 46 8 44 -14 30Z" fill="#EE8A3A"></path><path d="M60 -26C66 -10 66 8 60 26M18 -8C30 2 42 5 54 3M6 14C14 22 26 26 38 26" stroke="#0E1730" strokeWidth="3.6" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke"></path></g></g>
      </svg>
    </div>
  )
}
