import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-zinc-900 to-zinc-600 bg-clip-text text-transparent"
      >
        NeoPencil
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-4 text-lg sm:text-2xl text-zinc-600 max-w-2xl"
      >
        The future of writing: smart, sleek, and endlessly customizable.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-8 flex gap-4"
      >
        <a href="#shop" className="px-6 py-3 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition">Shop Now</a>
        <a href="#story" className="px-6 py-3 rounded-full border border-zinc-300 hover:bg-white/60 transition">Learn More</a>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-transparent" />
      </div>
    </section>
  )
}
