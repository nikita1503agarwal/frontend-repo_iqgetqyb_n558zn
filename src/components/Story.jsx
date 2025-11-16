import { motion } from 'framer-motion'

export default function Story() {
  const steps = [
    {
      title: 'The Future of Writing',
      text: 'A pencil that learns your style, syncs your thoughts, and glides like light.'
    },
    {
      title: 'Seamless Sync',
      text: 'Your notes flow to your devices instantly — offline or on the go.'
    },
    {
      title: 'Precision Craft',
      text: 'Engineered materials meet adaptive sensors for fluid control.'
    }
  ]

  return (
    <section id="story" className="py-24 sm:py-32 bg-gradient-to-b from-white to-zinc-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="mb-12"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-zinc-900">{s.title}</h3>
              <p className="mt-3 text-lg text-zinc-600">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
