'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { useApp } from '@/lib/context'
import { toast } from 'sonner'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useApp()
  const redirect = searchParams.get('redirect') || '/'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const success = await login(email, password)
      if (success) {
        toast.success('Login successful!')
        router.push(redirect)
      } else {
        toast.error('Invalid email or password')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden rounded-3xl">
            <div className="h-2 bg-blue-600 w-full" />
            <CardHeader className="space-y-1 p-8 text-center">
              <CardTitle className="text-3xl font-black">Welcome Back</CardTitle>
              <CardDescription className="text-gray-500">
                Unlock your next adventure with CarRental
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Password</label>
                    <Link href="#" className="text-xs font-semibold text-blue-600 hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type={showPassword ? 'text' : 'password'} 
                      className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-100 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-gray-400 font-bold">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-11 rounded-xl border-gray-200 hover:bg-gray-50 flex gap-2">
                  <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">G</div>
                  Google
                </Button>
                <Button variant="outline" className="h-11 rounded-xl border-gray-200 hover:bg-gray-50 flex gap-2">
                  <Github className="h-5 w-5" />
                  GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0 flex justify-center border-t border-gray-50 bg-gray-50/50">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link href="/register" className="font-black text-blue-600 hover:underline">Sign up for free</Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center">
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200 inline-block">
              <p className="text-xs font-bold text-yellow-800">Demo Account</p>
              <p className="text-xs text-yellow-700 mt-1">Email: <span className="font-mono">demo@example.com</span></p>
              <p className="text-xs text-yellow-700">Password: <span className="font-mono">demo123</span></p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
