'use client'

import { useState, use, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  CalendarDays, 
  Car, 
  CheckCircle2, 
  Fuel, 
  Info, 
  MapPin, 
  Settings, 
  Share2, 
  ShieldCheck, 
  Star, 
  Timer, 
  Users, 
  Zap,
  Heart
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { cars, getCarById } from '@/lib/data'
import { useApp } from '@/lib/context'
import { toast } from 'sonner'

export default function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { isFavorite, addFavorite, removeFavorite, addBooking, isLoggedIn } = useApp()
  
  const car = useMemo(() => getCarById(id), [id])
  const [activeImage, setActiveImage] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  if (!car) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Car not found</h1>
        <Link href="/cars" className="mt-4 text-blue-600 hover:underline">
          Return to directory
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(car.id)
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(car.id)
      toast.success('Removed from favorites')
    } else {
      addFavorite(car.id)
      toast.success('Added to favorites')
    }
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      toast.error('Please select start and end dates')
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    addBooking({
      carId: car.id,
      car: car,
      userId: '1', // Demo ID
      startDate: start,
      endDate: end,
      totalPrice: diffDays * car.pricePerDay,
      status: 'pending',
      pickupLocation: 'Main Showroom',
      dropoffLocation: 'Main Showroom',
      extras: []
    })

    toast.success('Booking request sent successfully!')
    router.push('/bookings')
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Link href="/cars" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Info - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Component */}
            <div className="space-y-4">
              <motion.div 
                layoutId={`car-image-${car.id}`}
                className="relative aspect-video overflow-hidden rounded-3xl bg-gray-100 shadow-2xl"
              >
                <Image 
                  src={car.images[activeImage]} 
                  alt={car.name} 
                  fill 
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-4 top-4 rounded-full bg-white/80 backdrop-blur-md"
                  onClick={handleFavoriteClick}
                >
                  <Heart className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
                <Badge className="absolute left-4 top-4 text-sm px-3 py-1" variant={car.condition === 'New' ? 'default' : 'secondary'}>
                  {car.condition}
                </Badge>
              </motion.div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {car.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-video overflow-hidden rounded-xl border-4 transition-all ${
                      activeImage === idx ? 'border-blue-600 shadow-lg' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <Image src={img} alt={`${car.name} thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Tabs */}
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">{car.name}</h1>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{car.rating}</span>
                      <span>({car.reviews} Reviews)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Main Showroom
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Fuel Type', value: car.fuel, icon: Fuel },
                  { label: 'Transmission', value: car.transmission, icon: Settings },
                  { label: 'Seats', value: `${car.seats} Seats`, icon: Users },
                  { label: 'Acceleration', value: car.specs.acceleration, icon: Timer },
                ].map((spec) => (
                  <div key={spec.label} className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                    <spec.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-xs text-gray-400">{spec.label}</span>
                    <span className="text-sm font-bold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 mb-6">
                  <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-8 py-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">Overview</TabsTrigger>
                  <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent px-8 py-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">Specifications</TabsTrigger>
                  <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent px-8 py-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">Features</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p className="text-lg leading-relaxed">{car.description}</p>
                    <p className="mt-4">This masterfully crafted vehicle represents the pinnacle of automotive engineering. From the moment you step inside the meticulously appointed cabin, you'll experience a level of detail that is simply unparalleled in its class.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="specs" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                    {[
                      { label: 'Engine', value: car.specs.engine },
                      { label: 'Horsepower', value: `${car.specs.horsepower} HP` },
                      { label: 'Top Speed', value: car.specs.topSpeed },
                      { label: 'Acceleration', value: car.specs.acceleration },
                      { label: 'Body Style', value: car.type },
                      { label: 'Production Year', value: car.year },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between border-b border-gray-50 py-2">
                        <span className="text-gray-500">{s.label}</span>
                        <span className="font-bold text-gray-900">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {car.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-green-50/50 border border-green-100">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                        <span className="text-sm font-medium text-green-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar Booking Form */}
          <div className="space-y-6">
            <Card className="sticky top-24 border-none shadow-2xl bg-white overflow-hidden rounded-3xl">
              <div className="bg-blue-600 p-8 text-white">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">${car.pricePerDay}</span>
                  <span className="text-blue-100 italic">per day</span>
                </div>
                <p className="mt-2 text-sm text-blue-100 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  Free cancellation & Insurance included
                </p>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Pickup Date</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                          type="date" 
                          className="w-full rounded-xl border-gray-200 pl-10 h-11 text-sm focus:border-blue-600 focus:ring-blue-600"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Return Date</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                          type="date" 
                          className="w-full rounded-xl border-gray-200 pl-10 h-11 text-sm focus:border-blue-600 focus:ring-blue-600"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="font-bold">$0</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span className="font-bold">$0</span>
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 flex items-center justify-between">
                      <span className="font-bold">Total Price</span>
                       <span className="text-xl font-black text-blue-600">
                        {startDate && endDate 
                          ? `$${(Math.ceil(Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) * car.pricePerDay).toLocaleString()}`
                          : '$0'
                        }
                      </span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 h-12 rounded-xl text-lg font-bold">
                    Book Now
                  </Button>
                  
                  <p className="text-center text-xs text-gray-400">
                    No payment required until pickup
                  </p>
                </form>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white p-6 rounded-3xl">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-blue-600" />
                Special Offers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  Unlimited mileage for rentals over 5 days
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  Second driver added at no extra cost
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  Premium 24/7 roadside assistance
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
