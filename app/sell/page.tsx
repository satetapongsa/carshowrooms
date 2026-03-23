'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Upload, DollarSign, Camera, CheckCircle2, Info, ArrowRight, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { toast } from 'sonner'

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success('Your car listing has been submitted for review!')
      setIsSubmitting(false)
      setStep(4) // Success step
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-gray-900"
            >
              Sell Your Car <br /> <span className="text-blue-600">Instantly</span>
            </motion.h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Get the best price for your vehicle in 3 simple steps. Trusted by over 10,000 sellers worldwide.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-4 text-sm font-bold">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step === i ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-110' : 
                  step > i ? 'bg-green-500 text-white' : 'bg-white text-gray-300 border border-gray-100'
                }`}>
                  {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
                </div>
                {i < 3 && <div className={`w-12 h-0.5 rounded-full ${step > i ? 'bg-green-500' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-8 md:p-12">
                  <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-2xl font-black">Vehicle Details</CardTitle>
                    <CardDescription>Enter the basic information about your car.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Brand</label>
                        <Input placeholder="e.g. BMW" className="h-12 rounded-xl bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Model</label>
                        <Input placeholder="e.g. M4 Competition" className="h-12 rounded-xl bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Year</label>
                        <Input type="number" placeholder="2024" className="h-12 rounded-xl bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mileage (Miles)</label>
                        <Input type="number" placeholder="5000" className="h-12 rounded-xl bg-gray-50" />
                      </div>
                    </div>
                    <Button onClick={handleNext} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-black group">
                      Next Step
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-8 md:p-12">
                  <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-2xl font-black">Photos & Condition</CardTitle>
                    <CardDescription>Show off your car with high-quality images.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
                          <Camera className="h-8 w-8 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Add Photo</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
                      <Textarea placeholder="Describe your car's condition, features, and history..." className="min-h-[150px] rounded-3xl bg-gray-50 p-6" />
                    </div>
                    <div className="flex gap-4">
                      <Button variant="ghost" onClick={handleBack} className="h-14 rounded-2xl font-bold flex-1">Back</Button>
                      <Button onClick={handleNext} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-black flex-[2] group">
                        Next Step
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-8 md:p-12">
                  <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-2xl font-black">Finalize & Pricing</CardTitle>
                    <CardDescription>Set your price and submit your listing.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-8">
                    <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-blue-600 shadow-xl shadow-blue-50">
                        <DollarSign className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-900 leading-tight">Recommended Listing Price</p>
                        <p className="text-2xl font-black text-blue-600">$45,000 - $48,500</p>
                        <p className="text-xs text-blue-800 opacity-60 mt-1">Based on market data for similar vehicles.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Asking Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input type="number" placeholder="47000" className="pl-12 h-14 rounded-2xl bg-gray-50 text-xl font-bold" />
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <Info className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-orange-800 font-bold leading-normal uppercase tracking-tighter"> 
                          Your listing will be reviewed by our team manually to ensure high-quality standards. This process usually takes 2-4 business hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="ghost" onClick={handleBack} className="h-14 rounded-2xl font-bold flex-1">Back</Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-black flex-[2] group">
                        {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                        {!isSubmitting && <CheckCircle2 className="ml-2 h-5 w-5" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-20"
              >
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-2xl shadow-green-100">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-gray-900">Successfully Submitted!</h2>
                  <p className="text-gray-500 max-w-sm mx-auto">Your car is now in our system. We'll notify you once it's live on the marketplace.</p>
                </div>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                   <Link href="/bookings">
                    <Button className="w-full h-12 rounded-xl bg-gray-900">Manage Bookings</Button>
                   </Link>
                   <Link href="/">
                    <Button variant="ghost" className="w-full">Back to Home</Button>
                   </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Section */}
          <div className="grid md:grid-cols-3 gap-8 pt-12">
            {[
              { icon: ShieldCheck, title: 'Secure Transaction', desc: 'Every sale is protected by our global security protocol.' },
              { icon: Car, title: 'Verified Buyers', desc: 'Connect with serious, verified buyers in our network.' },
              { icon: DollarSign, title: 'Fair Market Value', desc: 'Get AI-driven pricing recommendations based on real data.' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
