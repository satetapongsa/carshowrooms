'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Car } from './data'

interface User {
  id: string
  email: string
  name: string
  phone: string
}

interface Booking {
  id: string
  carId: string
  car: Car
  userId: string
  startDate: Date
  endDate: Date
  totalPrice: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: Date
  pickupLocation: string
  dropoffLocation: string
  extras: string[]
}

interface CarListing {
  id: string
  userId: string
  brand: string
  model: string
  year: number
  price: number
  miles: string
  type: string
  fuel: string
  transmission: string
  description: string
  images: string[]
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  contact: {
    name: string
    email: string
    phone: string
  }
}

interface FavoriteItem {
  carId: string
  addedAt: Date
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>
  logout: () => void
  
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void
  cancelBooking: (bookingId: string) => void
  
  favorites: FavoriteItem[]
  addFavorite: (carId: string) => void
  removeFavorite: (carId: string) => void
  isFavorite: (carId: string) => boolean
  
  carListings: CarListing[]
  addCarListing: (listing: Omit<CarListing, 'id' | 'createdAt' | 'status'>) => void
  
  cart: { carId: string; days: number; startDate: Date; endDate: Date }[]
  addToCart: (carId: string, days: number, startDate: Date, endDate: Date) => void
  removeFromCart: (carId: string) => void
  clearCart: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Demo user credentials
const DEMO_USERS = [
  { id: '1', email: 'demo@example.com', password: 'demo123', name: 'John Doe', phone: '+1 234 567 890' }
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'guest',
    name: 'Guest User',
    email: 'guest@example.com',
    phone: '+0 000 000 000'
  })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [carListings, setCarListings] = useState<CarListing[]>([])
  const [cart, setCart] = useState<{ carId: string; days: number; startDate: Date; endDate: Date }[]>([])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (foundUser) {
      setUser({ id: foundUser.id, email: foundUser.email, name: foundUser.name, phone: foundUser.phone })
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string, phone: string): Promise<boolean> => {
    // Check if email already exists
    if (DEMO_USERS.find(u => u.email === email)) {
      return false
    }
    const newUser = { id: String(DEMO_USERS.length + 1), email, password, name, phone }
    DEMO_USERS.push(newUser)
    setUser({ id: newUser.id, email: newUser.email, name: newUser.name, phone: newUser.phone })
    return true
  }

  const logout = () => {
    setUser(null)
    setCart([])
  }

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      createdAt: new Date()
    }
    setBookings(prev => [...prev, newBooking])
  }

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    ))
  }

  const addFavorite = (carId: string) => {
    if (!favorites.find(f => f.carId === carId)) {
      setFavorites(prev => [...prev, { carId, addedAt: new Date() }])
    }
  }

  const removeFavorite = (carId: string) => {
    setFavorites(prev => prev.filter(f => f.carId !== carId))
  }

  const isFavorite = (carId: string) => {
    return favorites.some(f => f.carId === carId)
  }

  const addCarListing = (listing: Omit<CarListing, 'id' | 'createdAt' | 'status'>) => {
    const newListing: CarListing = {
      ...listing,
      id: `listing-${Date.now()}`,
      status: 'pending',
      createdAt: new Date()
    }
    setCarListings(prev => [...prev, newListing])
  }

  const addToCart = (carId: string, days: number, startDate: Date, endDate: Date) => {
    const existingIndex = cart.findIndex(item => item.carId === carId)
    if (existingIndex >= 0) {
      setCart(prev => prev.map((item, idx) => 
        idx === existingIndex ? { carId, days, startDate, endDate } : item
      ))
    } else {
      setCart(prev => [...prev, { carId, days, startDate, endDate }])
    }
  }

  const removeFromCart = (carId: string) => {
    setCart(prev => prev.filter(item => item.carId !== carId))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isLoggedIn: true,
      login: async () => true,
      register: async () => true,
      logout: () => {},
      bookings,
      addBooking,
      cancelBooking,
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      carListings,
      addCarListing,
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
