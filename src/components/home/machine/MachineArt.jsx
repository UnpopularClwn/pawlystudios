'use client'

import { useEffect, useRef } from 'react'
import { L, T_STATIC, viewFor, makePatterns, viewMatrix, drawScene } from './machineScene.js'
import './MachineArt.css'

// The hero artwork: "The Move", a decorative looping chess scene painted on one 2D canvas.
//
// The scene (machineScene.js) is the approved prototype. This component owns the lifecycle only:
// it sizes the canvas to its box (the hero on desktop, a band above the copy on smaller screens),
// runs ONE requestAnimationFrame loop while the art is near the viewport and the tab is visible,
// and paints a single deliberate poster frame for visitors who prefer reduced motion. Nothing here
// touches React state per frame, and there is no WebGL.
const MQ_MOBILE = '(max-width: 640px)'
const MQ_REDUCED = '(prefers-reduced-motion: reduce)'
const MOBILE_CANVAS_RATIO = 844 / 390 // the prototype's mobile frame is 390 x 844; the visible band is its top 58%
const MAX_DPR = 1.75

function makeGrainUrl() {
  const c = document.createElement('canvas')
  c.width = c.height = 160
  const x = c.getContext('2d')
  const d = x.createImageData(160, 160)
  for (let i = 0; i < d.data.length; i += 4) {
    const v = Math.random() * 255
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v
    d.data[i + 3] = 255
  }
  x.putImageData(d, 0, 0)
  return c.toDataURL()
}

export default function MachineArt() {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const grainRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const grain = grainRef.current
    const ctx = canvas?.getContext('2d')
    if (!root || !ctx) return undefined

    grain.style.backgroundImage = `url(${makeGrainUrl()})`
    const layer = document.createElement('canvas')
    const mobile = window.matchMedia(MQ_MOBILE)
    const reduced = window.matchMedia(MQ_REDUCED)

    let t = 0
    let last = 0
    let raf = 0
    let running = false
    let visible = true
    let failed = false
    let view = null
    let matrix = null
    let patterns = null

    const render = () => {
      if (failed || !view) return
      try {
        drawScene(ctx, layer, reduced.matches ? T_STATIC : t, view, matrix, patterns)
        root.setAttribute('data-ready', 'true')
      } catch (error) {
        failed = true
        console.error(error)
      }
    }

    const resize = () => {
      const rect = root.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const w = rect.width
      const h = mobile.matches ? w * MOBILE_CANVAS_RATIO : rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.style.height = mobile.matches ? `${h}px` : '100%'
      canvas.width = layer.width = Math.round(w * dpr)
      canvas.height = layer.height = Math.round(h * dpr)
      view = viewFor(w, h)
      const vm = viewMatrix(view.vb, w, h, dpr)
      matrix = vm.m
      patterns = makePatterns(vm.unitPx)
      render()
    }

    const tick = (ts) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (ts - (last || ts)) / 1000)
      last = ts
      t = (t + dt) % L
      render()
    }

    // Runs only while the art is near the viewport, the tab is visible, and motion is allowed.
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

    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(root)
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { rootMargin: '120px 0px' },
    )
    visibilityObserver.observe(root)

    resize()
    sync()

    mobile.addEventListener('change', resize)
    reduced.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)

    return () => {
      cancelAnimationFrame(raf)
      sizeObserver.disconnect()
      visibilityObserver.disconnect()
      mobile.removeEventListener('change', resize)
      reduced.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <div className="wm" ref={rootRef} aria-hidden="true">
      <canvas className="wm-canvas" ref={canvasRef} />
      <div className="wm-grain" ref={grainRef} />
    </div>
  )
}
