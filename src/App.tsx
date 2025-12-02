import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const sampleData = [
  { year: '2020', value: 200 },
  { year: '2021', value: 300 },
  { year: '2022', value: 450 },
  { year: '2023', value: 600 }
]

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800">
      <Nav />
      <main className="px-6 md:px-16 py-10">
        <Hero />
        <Features />
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-greenvault-dark mb-4 text-center">Storage Efficiency Over Years</h2>
          <div className="bg-white rounded-2xl shadow-md p-4 max-w-4xl mx-auto">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section id="calculator" className="mt-10">
          <StorageCalculator />
        </section>
      </main>

      <Contact />

      <footer className="text-center py-6 text-sm text-gray-600">
        © 2025 GreenVault
      </footer>
    </div>
  )
}

function Nav(): JSX.Element {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-greenvault-dark">GreenVault</div>
      <div className="space-x-6">
        <a href="#about" className="text-gray-700 hover:text-greenvault-dark">About</a>
        <a href="#calculator" className="text-gray-700 hover:text-greenvault-dark">Calculator</a>
        <a href="#contact" className="text-gray-700 hover:text-greenvault-dark">Contact</a>
      </div>
    </nav>
  )
}

function Hero(): JSX.Element {
  return (
    <section className="text-center py-12">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold text-greenvault-dark mb-4">
        Smart Storage for Sustainable Agriculture
      </motion.h1>
      <p className="max-w-2xl mx-auto text-gray-700">GreenVault helps farmers reduce post-harvest loss with climate-protected warehousing and digital tracking.</p>
      <motion.button whileHover={{ scale: 1.03 }} className="mt-6 bg-greenvault text-white px-6 py-3 rounded-full shadow">Learn More</motion.button>
    </section>
  )
}

function Features(): JSX.Element {
  const items = [
    { title: 'Climate-Controlled Storage', desc: 'Humidity & temperature regulated warehouses to minimize crop loss.' },
    { title: 'Digital Inventory Tracking', desc: 'RFID and barcode systems for traceability.' },
    { title: 'Commodity-Backed Finance', desc: 'Partnered financing options for farmers.' }
  ]
  return (
    <section id="about" className="grid md:grid-cols-3 gap-6">
      {items.map((it, idx) => (
        <motion.div key={idx} whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-semibold text-greenvault-dark mb-2">{it.title}</h3>
          <p className="text-gray-600">{it.desc}</p>
        </motion.div>
      ))}
    </section>
  )
}

function StorageCalculator(): JSX.Element {
  const [crop, setCrop] = useState<string>('')
  const [qty, setQty] = useState<string>('')
  const [months, setMonths] = useState<string>('')
  const [savings, setSavings] = useState<number | null>(null)

  const handleCalculate = () => {
    if (!crop || !qty || !months) return
    const q = Number(qty)
    const m = Number(months)
    const lossRate = crop === 'Wheat' ? 0.15 : crop === 'Paddy' ? 0.12 : 0.10
    const saved = q * lossRate * (m / 12)
    setSavings(saved)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold text-greenvault-dark mb-4 text-center">Crop Storage Savings Calculator</h3>
      <div className="space-y-3">
        <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full border p-2 rounded">
          <option value="">Select Crop</option>
          <option value="Wheat">Wheat</option>
          <option value="Paddy">Paddy</option>
          <option value="Maize">Maize</option>
        </select>
        <input value={qty} onChange={(e) => setQty(e.target.value)} type="number" placeholder="Quantity (tonnes)" className="w-full border p-2 rounded" />
        <input value={months} onChange={(e) => setMonths(e.target.value)} type="number" placeholder="Duration (months)" className="w-full border p-2 rounded" />
        <button onClick={handleCalculate} className="w-full bg-greenvault text-white py-2 rounded">Calculate</button>
        {savings !== null && <p className="mt-3 text-center text-green-700 font-semibold">Estimated loss prevented: ₹{savings.toFixed(2)} (units)</p>}
      </div>
    </div>
  )
}

function Contact(): JSX.Element {
  return (
    <section id="contact" className="mt-12 py-10 bg-green-50">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold text-greenvault-dark mb-3">Get in touch</h3>
        <p className="text-gray-700 mb-4">Interested in partnering? Drop a message.</p>
        <form action="https://formspree.io/f/your_form_id" method="POST" className="space-y-3">
          <input name="name" placeholder="Name" className="w-full border p-2 rounded" required />
          <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" required />
          <textarea name="message" placeholder="Message" className="w-full border p-2 rounded" required />
          <button type="submit" className="w-full bg-greenvault text-white py-2 rounded">Send</button>
        </form>
      </div>
    </section>
  )
}
