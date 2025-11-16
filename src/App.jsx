import Hero from './components/Hero'
import Showcase from './components/Showcase'
import Story from './components/Story'
import ThreePencil from './components/ThreePencil'
import { useEffect, useState } from 'react'
import { apiGet, apiPost } from './lib/api'

export default function App() {
  const [products, setProducts] = useState([])
  const [userId] = useState('demo-user-1')

  useEffect(() => {
    // Seed a default product if none exists and then fetch
    (async () => {
      try {
        const list = await apiGet('/api/products')
        if (!list || list.length === 0) {
          await apiPost('/api/products', {
            slug: 'neo-pencil-pro',
            title: 'NeoPencil Pro',
            description: 'Futuristic next-gen pencil with digital sync, tilt sensing, and haptic feedback.',
            base_price: 129.0,
            images: [],
            in_stock: true,
            inventory: 250
          })
        }
        const refreshed = await apiGet('/api/products')
        setProducts(refreshed)
      } catch (e) {
        console.warn('Backend not ready yet:', e.message)
      }
    })()
  }, [])

  const addToCart = async (slug) => {
    try {
      await apiPost('/api/cart/add', { user_id: userId, product_slug: slug, quantity: 1 })
      alert('Added to cart!')
    } catch (e) {
      alert('Could not add to cart: ' + e.message)
    }
  }

  const checkout = async () => {
    try {
      const res = await apiPost('/api/checkout', { user_id: userId })
      alert('Order created: ' + res.order_id)
    } catch (e) {
      alert('Checkout failed: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-extrabold tracking-tight text-xl">NeoPencil</div>
          <nav className="text-sm text-zinc-600 flex items-center gap-6">
            <a href="#shop" className="hover:text-zinc-900">Shop</a>
            <a href="#story" className="hover:text-zinc-900">Story</a>
            <button onClick={checkout} className="px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">Checkout</button>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-6">
          <ThreePencil />
        </div>
        <Showcase />

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl sm:text-4xl font-bold">Featured</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.slug} className="group border border-zinc-200 rounded-2xl p-6 transition hover:shadow-xl bg-white">
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 group-hover:from-white group-hover:to-zinc-100 transition" />
                  <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-1 text-zinc-600 text-sm">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold">${'{'}p.base_price{'}'}</span>
                    <button onClick={() => addToCart(p.slug)} className="px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Story />

        <footer className="py-12 border-t border-zinc-200 text-center text-sm text-zinc-600">
          © {new Date().getFullYear()} NeoPencil. All rights reserved.
        </footer>
      </main>
    </div>
  )
}
