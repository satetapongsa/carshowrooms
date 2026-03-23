'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe2, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success('Your message has been sent. We will get back to you shortly.')
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset()
    }, 1500)
  }

  const contactInfo = [
    { 
      label: 'Email', 
      value: 'hello@carrental.com', 
      icon: Mail,
      sub: '24/7 Response time'
    },
    { 
      label: 'Phone', 
      value: '+1 (123) 456-7890', 
      icon: Phone,
      sub: 'Mon-Fri 9:00AM-9:00PM'
    },
    { 
      label: 'Main HQ', 
      value: '123 Auto Avenue, Silicon Valley, CA 90000', 
      icon: MapPin,
      sub: 'Global Center'
    },
  ]

  const socials = [
    { icon: Twitter, color: 'blue' },
    { icon: Facebook, color: 'blue' },
    { icon: Instagram, color: 'pink' },
    { icon: Linkedin, color: 'blue' },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          
          {/* Contact Information - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-none">
                Get in <br /> <span className="text-blue-600">Touch</span>
              </h1>
              <p className="text-lg text-gray-500 max-w-sm">
                Have questions about our fleet or services? Reach out to our dedicated support team worldwide.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-none shadow-xl bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-500">
                    <CardContent className="p-6 flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-xl shadow-blue-50">
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{info.label}</p>
                        <p className="text-sm font-bold text-gray-900">{info.value}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{info.sub}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 space-y-6">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Global Support Center</p>
              <div className="flex gap-4">
                {socials.map((social, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', damping: 10 }}
                  >
                    <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-2 border-gray-100 shadow-xl shadow-gray-100 bg-white">
                      <social.icon className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-none shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] bg-white rounded-[3rem] overflow-hidden p-8 md:p-12">
                <CardContent className="p-0 space-y-8">
                  <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-gray-900">Send us a message</h2>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        We typically respond within 2 hours
                      </p>
                    </div>
                    <div className="flex justify-end -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                          <Image src={`https://i.pravatar.cc/100?img=${i+40}`} alt="support" width={100} height={100} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="John Doe" 
                            className="pl-10 h-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-blue-600 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="relative">
                          <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            type="email"
                            placeholder="john@example.com" 
                            className="pl-10 h-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-blue-600 transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Topic</label>
                      <select className="w-full h-12 rounded-2xl border-gray-100 bg-gray-50 px-4 text-sm focus:bg-white focus:ring-blue-600 transition-all outline-none">
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Booking Issues</option>
                        <option>Fleet Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Your Message</label>
                      <Textarea 
                        placeholder="Tell us everything..." 
                        className="min-h-[150px] rounded-[2rem] border-gray-100 bg-gray-50 font-medium p-6 focus:bg-white focus:ring-blue-600 transition-all"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-2xl shadow-blue-100 transition-all active:scale-95"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send className="ml-2 h-5 w-5" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Global Map Placeholder Section */}
        <section className="mt-32">
          <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
             <div className="h-[400px] w-full relative bg-blue-50">
               <div className="absolute inset-0 grayscale contrast-125 opacity-30">
                 <Image src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" alt="map" fill className="object-cover" priority />
               </div>
               <div className="absolute inset-0 flex items-center justify-center flex-col space-y-4">
                 <div className="p-6 bg-white shadow-2xl rounded-3xl text-center space-y-2 relative border border-blue-100">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-t border-l border-blue-100" />
                    <p className="text-xl font-black text-gray-900">Main Office</p>
                    <p className="text-gray-500 text-sm">Open until 9:00 PM</p>
                    <Button variant="link" className="text-blue-600 p-0 h-auto font-black text-xs uppercase tracking-widest">Get Directions</Button>
                 </div>
                 <div className="w-4 h-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.8)] animate-pulse" />
               </div>
             </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
