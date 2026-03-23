'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, User, Heart, ShoppingCart, LogOut, Settings, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from '@/lib/context'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Cars', href: '/cars' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, isLoggedIn, logout, favorites, cart } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CarRental
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.1 }}>
              <Link
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/bookings">
            <Button variant="ghost" size="icon" className="group">
              <CalendarDays className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </Button>
          </Link>
          
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative group">
              <Heart className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative group">
              <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-bold">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg ${
                    pathname === item.href 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <hr className="my-4" />
              
              <Link href="/bookings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-600 font-medium">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                My Bookings
              </Link>

              <Link href="/favorites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-600 font-medium font-medium">
                <Heart className="h-5 w-5 text-red-500" />
                Favorites ({favorites.length})
              </Link>
              
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-600 font-medium font-medium">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                Cart ({cart.length})
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
