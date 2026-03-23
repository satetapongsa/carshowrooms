'use client'

import { motion } from 'framer-motion'
import { Calendar, Car, MapPin, Clock, CreditCard, ChevronRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useApp } from '@/lib/context'

export default function BookingsPage() {
  const router = useRouter()
  const { bookings } = useApp()

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 md:text-4xl">My Bookings</h1>
            <p className="text-gray-500 mt-2">Manage your vehicle reservations and history</p>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Car Image Preview */}
                        <div className="relative w-full md:w-64 h-48 md:h-auto">
                          <Image 
                            src={booking.car.image} 
                            alt={booking.car.name} 
                            fill 
                            className="object-cover"
                          />
                          <Badge className="absolute left-4 top-4 shadow-lg" variant={
                            booking.status === 'confirmed' ? 'default' : 
                            booking.status === 'pending' ? 'secondary' : 
                            booking.status === 'cancelled' ? 'destructive' : 'outline'
                          }>
                            {booking.status}
                          </Badge>
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 p-6 md:p-8 space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">{booking.car.name}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <Car className="h-3 w-3" />
                                {booking.car.brand} • {booking.car.transmission}
                              </p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Paid</p>
                              <p className="text-2xl font-black text-blue-600">${booking.totalPrice.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Pickup</p>
                              <div className="flex items-center gap-2 text-sm font-bold">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                {booking.startDate.toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <MapPin className="h-3 w-3" />
                                {booking.pickupLocation}
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Return</p>
                              <div className="flex items-center gap-2 text-sm font-bold">
                                <Calendar className="h-4 w-4 text-orange-600" />
                                {booking.endDate.toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <MapPin className="h-3 w-3" />
                                {booking.dropoffLocation}
                              </div>
                            </div>

                            <div className="sm:col-span-2 lg:col-span-1 space-y-1">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Booking ID</p>
                              <div className="font-mono text-xs p-2 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between">
                                {booking.id}
                                <Clock className="h-3 w-3 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-500">Payment via Credit Card (**** 4242)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 gap-1">
                                Need Help?
                              </Button>
                              <Link href={`/cars/${booking.carId}`}>
                                <Button variant="outline" size="sm" className="rounded-xl gap-2">
                                  View Vehicle
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center space-y-6 border-dashed border-2 bg-white/50 rounded-3xl">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">No Bookings Yet</h2>
                <p className="text-gray-500 max-w-sm mx-auto">Your journey begins here. Explore our collection and start your first adventure.</p>
              </div>
              <Link href="/cars">
                <Button size="lg" className="rounded-xl px-12 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100">
                  Browse Cars
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
