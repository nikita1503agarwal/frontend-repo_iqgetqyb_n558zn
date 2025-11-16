import { useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const COLORS = [
  { name: 'Graphite', hex: '#1f2937' },
  { name: 'Neon Blue', hex: '#2563eb' },
  { name: 'Aurora Green', hex: '#10b981' },
  { name: 'Solar Orange', hex: '#f97316' },
]

export default function Showcase() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const [color, setColor] = useState(COLORS[1])

  const glow = useMemo(() => ({
    boxShadow: `0 0 40px ${color.hex}66, 0 0 80px ${color.hex}44`
  }), [color])

  return (
    <section id="shop" className="relative py-20 sm:py-32 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fff,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900">Customize your NeoPencil</h2>
          <p className="mt-4 text-zinc-600">Choose colors, textures, and smart features like digital note sync, tilt sensing, and haptic feedback.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {COLORS.map(c => (
              <button key={c.name} onClick={() => setColor(c)}
                className={`px-4 py-2 rounded-full border transition ${c.name===color.name? 'border-zinc-900' : 'border-zinc-300 hover:border-zinc-400'}`}
                style={{ backgroundColor: `${c.hex}0a` }}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                  {c.name}
                </span>
              </button>
            ))}
          </div>

          <ul className="mt-6 space-y-2 text-zinc-700">
            <li>• Digital note sync</li>
            <li>• Tilt-sense precision</li>
            <li>• Haptic feedback</li>
          </ul>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="w-[260px] sm:w-[340px] md:w-[420px] h-[26px] rounded-full"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            style={{ background: `linear-gradient(90deg, #e5e7eb, ${color.hex}, #e5e7eb)` }}
          />
          <motion.div
            className="absolute w-[16px] h-[16px] rounded-full -right-3"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ backgroundColor: color.hex, ...glow }}
          />
        </div>
      </div>
    </section>
  )
}
