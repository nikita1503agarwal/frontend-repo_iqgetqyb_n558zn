import Spline from '@splinetool/react-spline'
import { useRef } from 'react'

export default function ThreePencil() {
  const ref = useRef(null)
  return (
    <div className="relative h-[320px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden border border-zinc-200 bg-white/60 backdrop-blur">
      {/* Using a lightweight hosted Spline scene to simulate 3D interaction */}
      <Spline
        ref={ref}
        scene="https://prod.spline.design/9m8Qf7cR2rFZ2W5P/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
    </div>
  )
}
