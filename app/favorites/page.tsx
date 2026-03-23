'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Grid, Search, ArrowRight, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CarCard } from '@/components/car-card'
import { useApp } from '@/lib/context'
import { getCarById } from '@/lib/data'
import { toast } from 'sonner'

export default function FavoritesPage() {
  const router = useRouter()
  const { favorites, removeFavorite } = useApp()

  const favoriteCars = favorites
    .map(f => getCarById(f.carId))
    .filter(car => car !== undefined)

  const clearAllFavorites = () => {
    favorites.forEach(f => removeFavorite(f.carId))
    toast.success('All favorites cleared')
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 md:text-4xl flex items-center gap-3">
                My Favorites
                <Heart className="h-8 w-8 text-red-500 fill-red-500" />
              </h1>
              <p className="text-gray-500 mt-2">Discover your collection of most desired vehicles</p>
            </div>
            {favoriteCars.length > 0 && (
              <Button 
                variant="outline" 
                className="rounded-xl gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
                onClick={clearAllFavorites}
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>

          {favoriteCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode='popLayout'>
                {favoriteCars.map((car) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card className="p-20 text-center space-y-8 border-dashed border-2 bg-white/50 rounded-[3rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -ml-32 -mb-32" />
              
              <div className="relative space-y-6">
                <div className="mx-auto w-24 h-24 bg-white shadow-2xl rounded-full flex items-center justify-center">
                  <Heart className="h-12 w-12 text-red-500" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-gray-900">Your heart is empty</h2>
                  <p className="text-gray-500 max-w-sm mx-auto text-lg">Save the cars that catch your eye and find them here easily when you're ready to book.</p>
                </div>
                <div className="pt-4">
                  <Link href="/cars">
                    <Button size="lg" className="rounded-2xl px-12 bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-100 h-14 text-lg font-black group transition-all">
                      Browse Full Collection
                      <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* Recently Viewed or Suggestions (Optional) */}
          {favoriteCars.length > 0 && (
            <div className="pt-20 border-t border-gray-100">
              <h3 className="text-2xl font-black flex items-center gap-3 mb-8">
                <Grid className="h-6 w-6 text-blue-600" />
                Explore Similar Options
              </h3>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-xl font-bold">Haven't found the perfect match?</p>
                    <p className="text-gray-500">Try our advanced search to filter by engine, seats, or specific features.</p>
                  </div>
                  <Link href="/cars">
                    <Button variant="outline" size="lg" className="rounded-xl h-14 px-8 border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50 text-blue-600 transition-all">
                      <Search className="mr-2 h-5 w-5" />
                      Advanced Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
