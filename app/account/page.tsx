'use client'

import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Shield, Bell, CreditCard, ChevronRight, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useApp } from '@/lib/context'
import { toast } from 'sonner'

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, isLoggedIn } = useApp()

  if (!isLoggedIn) {
    router.push('/login?redirect=/account')
    return null
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-200">
                  {user?.name?.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-white shadow-lg" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">{user?.name}</h1>
                <p className="text-gray-500 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 h-12" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout from account
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Navigation Sidebar */}
            <div className="space-y-4">
              <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
                <CardContent className="p-4 space-y-1">
                  {[
                    { label: 'Personal Info', icon: User, active: true },
                    { label: 'Security', icon: Shield },
                    { label: 'Notifications', icon: Bell },
                    { label: 'Payments', icon: CreditCard },
                    { label: 'Settings', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                        item.active 
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-bold text-sm">{item.label}</span>
                      {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-blue-600 text-white rounded-[2rem] overflow-hidden p-8 space-y-4 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <h3 className="text-xl font-black leading-tight">Elite Member <br /> Status</h3>
                <p className="text-xs text-blue-100">You are 3 rentals away from Gold status!</p>
                <div className="w-full bg-blue-900/30 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[70%]" />
                </div>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 h-10 rounded-xl font-bold text-xs uppercase tracking-widest">
                  View Benefits
                </Button>
              </Card>
            </div>

            {/* Profile Content */}
            <div className="md:col-span-2 space-y-6">
              <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50">
                  <CardTitle className="text-xl font-black">Personal Information</CardTitle>
                  <CardDescription>View and edit your personal details used for bookings.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                      <Input defaultValue={user?.name} className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                      <Input defaultValue={user?.email} className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                      <Input defaultValue={user?.phone} className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Date of Birth</label>
                      <Input type="date" defaultValue="1990-01-01" className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input defaultValue="123 Luxury Dr, West Beverly Hills, CA" className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-100" />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button className="rounded-xl h-12 px-8 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 font-bold">
                      Save Changes
                    </Button>
                    <Button variant="ghost" className="rounded-xl h-12 px-8">
                      Discard
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="flex-1 space-y-1 text-center md:text-left">
                  <h4 className="font-black text-gray-900">Identity Verification</h4>
                  <p className="text-sm text-gray-500">Your driver's license is verified and active until 2028.</p>
                </div>
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100 px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                  Verified
                </Badge>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

