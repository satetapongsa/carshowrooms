'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Car, Zap, Truck, Search, CarFront, CarTaxiFront, Factory, DollarSign, ShieldCheck, Headphones } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CarCard } from '@/components/car-card'
import { carImages, brandLogos, cars, vehicleTypes, brands } from '@/lib/data'

const vehicleTypeIcons = [
  { name: 'SUV', icon: CarFront },
  { name: 'Sedan', icon: Car },
  { name: 'Hatchback', icon: CarTaxiFront },
  { name: 'Coupe', icon: Car },
  { name: 'Hybrid', icon: Zap },
  { name: 'Convertible', icon: Car },
  { name: 'Van', icon: Factory },
  { name: 'Truck', icon: Truck },
  { name: 'Electric', icon: Zap },
]

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const [searchCondition, setSearchCondition] = useState('all')
  const [searchBrand, setSearchBrand] = useState('All')
  const [searchType, setSearchType] = useState('All')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const carouselControls = useAnimation()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const sequence = async () => {
      await carouselControls.start({
        x: [0, -2000],
        transition: { duration: 20, ease: 'linear' },
      })
      carouselControls.set({ x: 0 })
      sequence()
    }
    sequence()
  }, [carouselControls])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchCondition !== 'all') params.set('condition', searchCondition)
    if (searchBrand !== 'All') params.set('brand', searchBrand)
    if (searchType !== 'All') params.set('type', searchType)
    router.push(`/cars?${params.toString()}`)
  }

  const filteredCars = activeTab === 'all' 
    ? cars.slice(0, 4) 
    : cars.filter(car => car.type.toLowerCase() === activeTab).slice(0, 4)

  const bestSellers = cars.filter(car => car.rating >= 4.7).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden pt-16">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={carImages.showroom}
            alt="Luxury Car Showroom"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            className="opacity-50"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/20 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="mb-6 text-4xl font-bold md:text-6xl text-balance">Find Your Dream Car</h1>
            <p className="mb-8 text-xl md:text-2xl">Discover the perfect vehicle for your lifestyle</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl"
          >
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Select value={searchCondition} onValueChange={setSearchCondition}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cars</SelectItem>
                      <SelectItem value="new">New Cars</SelectItem>
                      <SelectItem value="used">Used Cars</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={searchBrand} onValueChange={setSearchBrand}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      {vehicleTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full sm:w-auto" size="lg" onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Search Cars
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <motion.div
          style={{ y }}
          className="absolute bottom-0 left-0 right-0 z-10 text-center text-white pb-8"
        >
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white"
            onClick={() => scrollToSection('cars')}
          >
            Explore Our Collection
          </Button>
        </motion.div>
      </section>

      {/* Feature Icons Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We offer competitive prices on our 100,000+ vehicle inventory.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted & Secure</h3>
              <p className="text-gray-600">Our secure transaction process ensures your peace of mind.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our team is always here to help with any questions or concerns.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Browse by Type */}
      <section id="cars" className="py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl px-4"
        >
          <h2 className="mb-12 text-center text-3xl font-bold">Browse by Type</h2>
          <div className="grid grid-cols-3 gap-8 md:grid-cols-5 lg:grid-cols-9">
            {vehicleTypeIcons.map((type) => (
              <Link key={type.name} href={`/cars?type=${type.name}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex cursor-pointer flex-col items-center gap-2"
                >
                  <div className="rounded-full bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
                    <type.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">{type.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Brand Logo Carousel */}
      <section className="overflow-hidden py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Trusted Brands</h2>
          <motion.div
            className="flex"
            animate={carouselControls}
          >
            {[...brandLogos, ...brandLogos].map((brand, index) => (
              <Link key={`${brand.name}-${index}`} href={`/cars?brand=${brand.name}`}>
                <motion.div
                  className="mx-8 flex w-40 flex-shrink-0 items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    width={100} 
                    height={100}
                    className="object-contain h-16 w-auto"
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl bg-blue-50 p-8"
          >
            <h3 className="mb-4 text-2xl font-bold">Are You Looking For a Car?</h3>
            <p className="mb-6 text-gray-600">We are committed to providing our customers with exceptional service.</p>
            <Link href="/cars">
              <Button>Browse Cars</Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl bg-pink-50 p-8"
          >
            <h3 className="mb-4 text-2xl font-bold">Do You Want to Sell a Car?</h3>
            <p className="mb-6 text-gray-600">We are committed to providing our customers with exceptional service.</p>
            <Link href="/sell">
              <Button variant="outline">List Your Car</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Most Searched Cars */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">The Most Searched Cars</h2>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {['All', 'Sedan', 'SUV', 'Coupe', 'Electric'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab.toLowerCase() ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/cars">
              <Button variant="outline" size="lg">View All Cars</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-8 md:grid-cols-2"
          >
            <div>
              <h2 className="mb-6 text-3xl font-bold">About Us</h2>
              <p className="mb-4 text-gray-600">
                At CarRental, we&apos;re passionate about providing you with the best car rental experience possible. With years of industry expertise and a commitment to customer satisfaction, we&apos;ve become a trusted name in the automotive rental market.
              </p>
              <p className="mb-4 text-gray-600">
                Our extensive fleet of vehicles caters to all your needs, whether you&apos;re looking for a compact car for a city trip or a luxurious SUV for a family vacation. We pride ourselves on our transparent pricing, flexible rental options, and exceptional customer service.
              </p>
              <Link href="/about">
                <Button>Learn More</Button>
              </Link>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-xl"
            >
              <Image
                src={carImages.polestar}
                alt="Luxury Showroom"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="best-sellers" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Best Sellers</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {bestSellers.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Special Financing Offers', description: 'Our stress-free finance department can find financial solutions to save you money.' },
              { title: 'Trusted Car Dealership', description: 'We have been in business for over 20 years and have built a reputation for excellence.' },
              { title: 'Transparent Pricing', description: 'No hidden fees or surprises. What you see is what you pay.' },
              { title: 'Expert Car Service', description: 'Our certified technicians are here to keep your car running smoothly.' },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Subscribe to Our Newsletter</h2>
          <p className="mb-8 text-blue-100">Stay updated with the latest cars and offers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg flex-1 max-w-md"
            />
            <Button variant="secondary" size="lg">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
