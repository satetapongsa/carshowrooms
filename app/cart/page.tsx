'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, Calendar, MapPin, ArrowRight, CreditCard, ShieldCheck, Tag, Info } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useApp } from '@/lib/context'
import { getCarById } from '@/lib/data'
import { toast } from 'sonner'

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, clearCart, addBooking, isLoggedIn } = useApp()

  const cartItems = cart
    .map(item => ({
      ...item,
      car: getCarById(item.carId)
    }))
    .filter(item => item.car !== undefined)

  const subtotal = cartItems.reduce((acc, item) => acc + (item.car!.pricePerDay * item.days), 0)
  const tax = subtotal * 0.07
  const total = subtotal + tax

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    cartItems.forEach(item => {
      addBooking({
        carId: item.carId,
        car: item.car!,
        userId: '1', // Demo ID
        startDate: item.startDate,
        endDate: item.endDate,
        totalPrice: item.car!.pricePerDay * item.days,
        status: 'pending',
        pickupLocation: 'Main Showroom',
        dropoffLocation: 'Main Showroom',
        extras: []
      })
    })

    clearCart()
    toast.success('Bookings created successfully!')
    router.push('/bookings')
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 md:text-4xl flex items-center gap-3">
              Booking Cart
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </h1>
            <p className="text-gray-500 mt-2">Check your selections before finalizing your journey</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items - 2 columns */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length > 0 ? (
                <AnimatePresence mode='popLayout'>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.carId}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden border-none shadow-xl bg-white rounded-3xl group">
                        <CardContent className="p-0 flex flex-col sm:flex-row">
                          <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                            <Image src={item.car!.image} alt={item.car!.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 p-6 space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{item.car!.name}</h3>
                                <p className="text-sm text-gray-500">{item.car!.brand} • {item.car!.type}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                onClick={() => removeFromCart(item.carId)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</p>
                                <div className="flex items-center gap-2 text-sm font-bold">
                                  <Calendar className="h-4 w-4 text-blue-600" />
                                  {item.days} Days
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Per Day</p>
                                <div className="flex items-center gap-2 text-sm font-bold">
                                  <Tag className="h-4 w-4 text-green-600" />
                                  ${item.car!.pricePerDay.toLocaleString()}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-[10px] uppercase tracking-tighter bg-blue-50/50">Insurance Incl.</Badge>
                                <Badge variant="outline" className="text-[10px] uppercase tracking-tighter bg-green-50/50">Free Cancel</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Subtotal</p>
                                <p className="text-xl font-black text-blue-600">${(item.car!.pricePerDay * item.days).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <Card className="p-20 text-center space-y-6 border-dashed border-2 bg-white/50 rounded-[3rem]">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-12 w-12 text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">Ready to start your journey? Explore our premium selection of vehicles.</p>
                  </div>
                  <Link href="/cars">
                    <Button size="lg" className="rounded-2xl px-12 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100">
                      Explore Vehicles
                    </Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Summary - 1 column */}
            <div className="space-y-6">
              <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden sticky top-24">
                <div className="p-8 bg-gray-900 text-white space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Summary
                  </h3>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Booking Subtotal</span>
                      <span className="font-bold font-mono">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Taxes (7%)</span>
                      <span className="font-bold font-mono">${tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-800 mt-4 pt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">Est. Total Price</span>
                      <span className="text-2xl font-black text-blue-400 font-mono">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-2xl">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                      <p className="text-xs text-blue-900 font-bold leading-tight">
                        Secured Checkout with 256-bit encryption
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Promo Code</label>
                      <div className="flex gap-2">
                        <Input placeholder="Enter code" className="rounded-xl border-gray-100 bg-gray-50 h-11" />
                        <Button variant="outline" className="rounded-xl h-11">Apply</Button>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-2xl shadow-blue-100 group transition-all"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="pt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-500 leading-normal">
                        By checking out, you agree to our Terms of Service and Privacy Policy. Cancellation is free up to 24 hours before pickup.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 py-2 grayscale opacity-40">
                      <div className="w-8 h-8 rounded-md bg-gray-200" />
                      <div className="w-8 h-8 rounded-md bg-gray-200" />
                      <div className="w-8 h-8 rounded-md bg-gray-200" />
                      <div className="w-8 h-8 rounded-md bg-gray-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 p-6 rounded-[2rem] border-2 border-dashed border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-900">100% Secure</p>
                  <p className="text-[10px] text-gray-500">Encrypted transmission & payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

