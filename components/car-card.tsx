'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Fuel, Settings, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Car } from '@/lib/data'
import { useApp } from '@/lib/context'

interface CarCardProps {
  car: Car
  variant?: 'default' | 'compact'
}

export function CarCard({ car, variant = 'default' }: CarCardProps) {
  const { isFavorite, addFavorite, removeFavorite, isLoggedIn } = useApp()
  const favorite = isFavorite(car.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFavorite(car.id)
    } else {
      addFavorite(car.id)
    }
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="overflow-hidden rounded-xl bg-white shadow-lg border"
      >
        <Link href={`/cars/${car.id}`}>
          <div className="relative">
            <Image
              src={car.image}
              alt={car.name}
              width={400}
              height={200}
              className="h-40 w-full object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <button
              onClick={handleFavoriteClick}
              className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
            >
              <Heart
                className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <Badge className="absolute left-2 top-2" variant={car.condition === 'New' ? 'default' : 'secondary'}>
              {car.condition}
            </Badge>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{car.name}</h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">${car.pricePerDay}/day</span>
              <div className="flex items-center gap-1 text-sm text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span>{car.rating}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="overflow-hidden rounded-xl bg-white shadow-lg border"
    >
      <Link href={`/cars/${car.id}`}>
        <div className="relative">
          <Image
            src={car.image}
            alt={car.name}
            width={400}
            height={300}
            className="h-48 w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
          >
            <Heart
              className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          <Badge className="absolute left-3 top-3" variant={car.condition === 'New' ? 'default' : 'secondary'}>
            {car.condition}
          </Badge>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
              <p className="text-sm text-gray-500">{car.year} • {car.miles} Miles</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{car.rating}</span>
              <span className="text-xs text-gray-400">({car.reviews})</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{car.seats} Seats</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div>
              <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
              <span className="text-sm text-gray-500">/day</span>
            </div>
            <Button>View Details</Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
