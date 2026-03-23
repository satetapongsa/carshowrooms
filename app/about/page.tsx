'use client'

import { motion } from 'framer-motion'
import { Award, Globe2, ShieldCheck, Users2, Building2, Truck, Leaf, Sparkles, Milestone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  const stats = [
    { label: 'Vehicles', value: '1,200+', icon: Truck },
    { label: 'Happy Clients', value: '45k+', icon: Users2 },
    { label: 'Global Offices', value: '25', icon: Globe2 },
    { label: 'Years Experience', value: '15+', icon: Milestone },
  ]

  const values = [
    { 
      title: 'Premium Quality', 
      description: 'We maintain our fleet with the highest standards of care and excellence.',
      icon: Award,
      color: 'blue'
    },
    { 
      title: 'Trusted Safety', 
      description: 'Your safety is our priority. Every vehicle undergoes a 150-point inspection.',
      icon: ShieldCheck,
      color: 'green'
    },
    { 
      title: 'Eco Friendly', 
      description: 'Moving towards a greener future with our growing electric and hybrid fleet.',
      icon: Leaf,
      color: 'emerald'
    },
    { 
      title: 'Innovation', 
      description: 'Seamless digital booking and AI-powered maintenance tracking.',
      icon: Sparkles,
      color: 'purple'
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
            alt="Corporate Building" 
            fill 
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
          <div className="container relative z-10 px-4 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 px-4 py-1 rounded-full mb-4">
                ESTABLISHED 2009
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
                Redefining the <br /> <span className="text-blue-600">Premium Journey</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                CarRental is more than just a fleet. We are the bridge between your destination and a world-class driving experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container px-4 -mt-20 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="border-none shadow-2xl hover:shadow-blue-100 hover:scale-105 transition-all duration-500 bg-white/90 backdrop-blur-md rounded-[2rem] overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                  <CardContent className="p-8 text-center relative z-10">
                    <stat.icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                    <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section className="container px-4 py-32 space-y-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-zvolskiy-1637859.jpg-vuLCql5iJC47driDbt7Ck5tXv7PDYt.jpeg"
                alt="Modern Garage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-gray-900 md:text-5xl tracking-tight">Our Story</h2>
                <div className="h-2 w-20 bg-blue-600 rounded-full" />
              </div>
              <div className="space-y-6 text-lg text-gray-500 leading-relaxed">
                <p>
                  Founded in Silicon Valley in 2009, CarRental began with a simple mission: to make premium vehicle access as seamless as possible. We realized that traditional rental experiences were clunky, outdated, and lacked the white-glove service that today's discerning travelers demand.
                </p>
                <p>
                  Over the last 15 years, we have expanded from a small boutique garage into a global network. We've embraced every technological advancement from electric propulsion to AI-driven maintenance, all while keeping our core value at the heart of everything: 
                  <span className="text-blue-600 font-black"> The Driver's Delight.</span>
                </p>
              </div>
              <div className="flex gap-4">
                <Button className="rounded-xl h-12 px-8 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100">
                  Join Our Team
                </Button>
                <Button variant="outline" className="rounded-xl h-12 px-8">
                  Investor Relations
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-32">
          <div className="container px-4">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl font-black text-gray-900 md:text-5xl tracking-tight">Our Values</h2>
              <p className="text-gray-500 max-w-xl mx-auto">The pillars that sustain our mission and guide our future.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-[2rem] overflow-hidden group">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${
                        value.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        value.color === 'green' ? 'bg-green-100 text-green-600' :
                        value.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <value.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence Section */}
        <section className="container px-4 py-32">
          <Card className="border-none shadow-2xl bg-blue-600 rounded-[3rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600" />
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute w-[800px] h-[800px] bg-blue-400 rounded-full opacity-10 blur-[100px] -right-40 -top-40" />
               <div className="absolute w-[800px] h-[800px] bg-blue-900 rounded-full opacity-20 blur-[100px] -left-40 -bottom-40" />
            </div>
            <CardContent className="relative z-10 p-12 lg:p-24 flex flex-col items-center text-center space-y-8">
              <Building2 className="h-20 w-20 text-blue-100/50" />
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-white md:text-6xl tracking-tight">Worldwide Reach</h2>
                <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
                  From New York to Tokyo, London to Sydney. We are present in over 15 countries and 250+ pickup locations. 
                </p>
              </div>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button className="rounded-2xl h-16 px-12 bg-white text-blue-600 hover:bg-blue-50 text-lg font-black shadow-2xl shadow-blue-900/20">
                  Global Locations
                </Button>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-blue-600 overflow-hidden shadow-lg">
                      <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="team" width={100} height={100} />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-blue-600 bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                    +250
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}

