'use client'

import { Component } from 'react'

// The Lanyard is an enhancement layered over ordinary contact HTML. If WebGL
// or the physics/model load ever fails, this falls back to the same static
// badge image the reduced-motion path uses, instead of breaking the footer.
export default class LanyardErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Lanyard failed to load; showing the static badge instead.', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
