import React, { useRef, useState, useEffect, Suspense } from 'react'
import Spline from '@splinetool/react-spline'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.warn('3D scene failed to load:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function ThreePencil() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    // If the browser does not support WebGL or reduced motion is preferred, disable 3D
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const canvasSupport = !!window.WebGLRenderingContext
    if (prefersReduced || !canvasSupport) setEnabled(false)
  }, [])

  const Fallback = (
    <div className="relative h-[320px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-40 h-2 rounded-full bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 animate-pulse mx-auto" />
          <p className="mt-4 text-sm text-zinc-500">Interactive preview unavailable. Showing static fallback.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
    </div>
  )

  if (!enabled) return Fallback

  return (
    <div className="relative h-[320px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden border border-zinc-200 bg-white/60 backdrop-blur">
      <ErrorBoundary fallback={Fallback}>
        <Suspense fallback={Fallback}>
          <Spline
            ref={ref}
            scene="https://prod.spline.design/9m8Qf7cR2rFZ2W5P/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </ErrorBoundary>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
    </div>
  )
}
