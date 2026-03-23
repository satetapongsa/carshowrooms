'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { Car, Zap, Truck, Search, Menu, CarFront, CarTaxiFront, Factory, DollarSign, ShieldCheck, Headphones } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const carImages = {
  lamborghini: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-lynxexotics-3802510.jpg-zWCJEcmVKByRkAyQ6bqKs37jZAckM1.jpeg",
  mustang: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-avinashpatel-544542.jpg-HTyybgdx0RjHY8JxIYpO5HEhPtYDdS.jpeg",
  mercedes: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-mikebirdy-112460.jpg-z9HvdhPN3QAoRWxG9YmpzYzo6RbeZ8.jpeg",
  audi: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-38637.jpg-tABvWWL2hQzILHt2lO1RZCdc1v4ekd.jpeg",
  alfa: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-zvolskiy-1637859.jpg-vuLCql5iJC47driDbt7Ck5tXv7PDYt.jpeg",
  rangeRover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-mikebirdy-116675.jpg-b0seStk8jyR5zNVSyi34lHtOvpAFL2.jpeg",
  audiS5: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-mikebirdy-244206.jpg-lFUGaUZeUBCl93t4SAd63Sr6vrLeJ3.jpeg",
  showroom: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2).jpg-wxUtGqYn6kVzxYuYkB26fgSJ2Zvlf2.jpeg",
  polestar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chemisch%20best%C3%A4ndige,%20reinigungsf%C3%A4hige%20Ausstellung%20f%C3%BCr%20Polestars%20mittels%20eines%20Polyurethanbelags.jpg-CKQaBisKe3tB43rlXhbdn7HvE1wd2n.jpeg",
  posters: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Super%20Car%20Posters%20For%20Men,Racing%20Car%20Wall%20Art,Sports%20Car%20Posters%20For%20Boys%20Room,Car%20Prints%20Pictures%20For%20Walls%20Aesthetic(Unframe,6PCS,8x12inch).jpg-6RYjxYfH8qyP2MwBJtedAQGE2LdqZP.jpeg",
  ferrari: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-removebg-preview-valOApnub8YGhPD65iAuZsJ3V4sDMT.png",
  tesla: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-removebg-preview%20(1)-MX6nbK8HzUrEQandupjp6oPllMuBy1.png",
  amgGT: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-removebg-preview%20(3)-gcOLl22Qg7IA6LhwkctkpVnfTww4Wh.png"
}

const brandLogos = [
  { 
    name: 'Audi', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Audi_Quattro_Car_Audi_R8_Audi_Q7_PNG_-_Free_Download-removebg-preview-g3KRSyp0eXP5hfs0KKKpHNf0MvAukS.png'
  },
  { 
    name: 'Ford Mustang', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4a0e0edd2e3df9c13aa0e51ab6233a19-removebg-preview-removebg-preview%20(1)-vblTW2D2XqLoxG4TPx6Ap73a3HbiUU.png'
  },
  { 
    name: 'Hyundai', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-removebg-preview%20(2)-Qh0NengWLhRZ60p2sUNFsnbpUAOAJi.png'
  },
  { 
    name: 'Tesla', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f22aa390c97c15c2a0ed44f25ab3325b-removebg-preview-removebg-preview-JgVU2wiNd2gVTDn8aCjRfaE8XQ99sI.png'
  },
  { 
    name: 'Volkswagen', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-removebg-preview-V7yan9MjIp11uMTSfgIpbk4tflsafP.png'
  },
  { 
    name: 'Land Rover', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2014_Land_Rover_Range_Rover_Sport_Rover_Company_Logo_Car_PNG_-_Free_Download-removebg-preview-ECqjj5mXGQ7roPWfxkjsahwRNC0t1p.png'
  },
  { 
    name: 'Porsche', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Porsche_918_Spyder_Car_Logo_Porsche_911_PNG_-_Free_Download-removebg-preview-yegpKLiXDt8OdhAycAu39RtcdnweN4.png'
  },
  { 
    name: 'Ford', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-removebg-preview%20(1)-qSLvr4Q9JQSOfccOjBRW9LkaCsTbAh.png'
  },
  { 
    name: 'Mercedes-Benz', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Benz_Car_Vehicle_Bmw_Mercedes-benz_Mercedes_Logo_Clipart_-_Mercedes_Benz_Logo_Transparent_-_Png_Download___4164848__-_PinClipart-removebg-preview-kahUBRbyonUcm3o5bCCWjiPmQjZPyu.png'
  },
  { 
    name: 'BMW', 
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BMW_logo_PNG-removebg-preview-PSDUnzGelpjkESadmHzBfuiks1UvYE.png'
  }
]

const vehicleTypes = [
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

export default function Component() {
  const [activeTab, setActiveTab] = useState('in-stock')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const isInView = useInView(heroRef)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CarRental
          </Link>
          <div className="hidden space-x-6 md:flex">
            {['Home', 'Cars', 'Best Sellers', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-600"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.toLowerCase().replace(' ', '-'))
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <Sheet>
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
              <div className="mt-4 flex flex-col space-y-4">
                {['Home', 'Cars', 'Best Sellers', 'About', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 hover:text-blue-600"
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.toLowerCase().replace(' ', '-'))
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden pt-16">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={carImages.showroom}
            alt="Luxury Car Showroom"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-50"
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
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">Find Your Dream Car</h1>
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
                  <Select>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Used Cars" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="used">Used Cars</SelectItem>
                      <SelectItem value="new">New Cars</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Any Makes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="ford">Ford</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Any Models" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="camry">Camry</SelectItem>
                      <SelectItem value="civic">Civic</SelectItem>
                      <SelectItem value="f150">F-150</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full sm:w-auto" size="lg">
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
            {vehicleTypes.map((type) => (
              <motion.div
                key={type.name}
                whileHover={{ scale: 1.05 }}
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                <div className="rounded-full bg-white p-4 shadow-md">
                  <type.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium">{type.name}</span>
              </motion.div>
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
              <motion.div
                key={`${brand.name}-${index}`}
                className="mx-8 flex w-40 flex-shrink-0 items-center justify-center"
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
            <Button>Get Started</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl bg-pink-50 p-8"
          >
            <h3 className="mb-4 text-2xl font-bold">Do You Want to Sell a Car?</h3>
            <p className="mb-6 text-gray-600">We are committed to providing our customers with exceptional service.</p>
            <Button variant="outline">Get Started</Button>
          </motion.div>
        </div>
      </section>

      {/* Most Searched Cars */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">The Most Searched Cars</h2>
          <div className="mb-8 flex justify-center gap-4">
            {['In Stock', 'Sedan', 'SUV', 'Convertible'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab.toLowerCase().replace(' ', '-') ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Lamborghini Huracán', price: 250000, miles: '1k', image: carImages.lamborghini },
              { name: 'Ford Mustang GT', price: 45000, miles: '15k', image: carImages.mustang },
              { name: 'Mercedes-AMG GT', price: 150000, miles: '5k', image: carImages.mercedes },
              { name: 'Audi A1 Sport', price: 35000, miles: '12k', image: carImages.audi },
            ].map((car) => (
              <motion.div
                key={car.name}
                whileHover={{ y: -10 }}
                className="overflow-hidden rounded-xl bg-white shadow-lg"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{car.name}</h3>
                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                    <span>{car.miles} Miles</span>
                    <span>Petrol</span>
                    <span>Automatic</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${car.price.toLocaleString()}</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </motion.div>
            ))}
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
                At CarRental, we're passionate about providing you with the best car rental experience possible. With years of industry expertise and a commitment to customer satisfaction, we've become a trusted name in the automotive rental market.
              </p>
              <p className="mb-4 text-gray-600">
                Our extensive fleet of vehicles caters to all your needs, whether you're looking for a compact car for a city trip or a luxurious SUV for a family vacation. We pride ourselves on our transparent pricing, flexible rental options, and exceptional customer service.
              </p>
              <Button>Learn More</Button>
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
            {[
              { name: 'Alfa Romeo Giulia', description: 'Perfect for business trips and special occasions.', image: carImages.alfa },
              { name: 'Range Rover Evoque', description: 'Spacious and comfortable for family adventures.', image: carImages.rangeRover },
              { name: 'Audi S5 Sportback', description: 'Performance and luxury in perfect harmony.', image: carImages.audiS5 },
            ].map((car, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-xl bg-white p-6 shadow-lg"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={300}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />
                <h3 className="mb-2 text-xl font-bold">{car.name}</h3>
                <p className="mb-4 text-gray-600">{car.description}</p>
                <Button variant="outline" className="w-full">Book Now</Button>
              </motion.div>
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
              { title: 'Special Financing Offers', icon: '💰' },
              { title: 'Trusted Car Dealership', icon: '💎' },
              { title: 'Transparent Pricing', icon: '🏷️' },
              { title: 'Expert Car Service', icon: '🚗' },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">
                  Our stress-free finance department can find financial solutions to save you money.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Cars */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Latest Cars</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-xl bg-white p-6 shadow-lg"
            >
              <Image
                src={carImages.posters}
                alt="Luxury Car Collection"
                width={400}
                height={300}
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
              <h3 className="mb-2 text-xl font-bold">Premium Collection</h3>
              <p className="mb-4 text-gray-600">Explore our collection of luxury vehicles from top brands.</p>
              <Button variant="outline" className="w-full">View Collection</Button>
            </motion.div>
            {[
              { name: 'Ferrari F8 Tributo', description: 'Experience Italian excellence and performance.', image: carImages.ferrari },
              { name: 'Tesla Model 3', description: 'The future of electric mobility.', image: carImages.tesla },
            ].map((car, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-xl bg-white p-6 shadow-lg"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={300}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />
                <h3 className="mb-2 text-xl font-bold">{car.name}</h3>
                <p className="mb-4 text-gray-600">{car.description}</p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">About CarRental</h3>
              <p className="text-sm text-gray-400">We offer a wide range of vehicles for all your driving needs. We have the perfect car to meet your needs.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Services</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Working Hours</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Mon - Fri: 9:00AM - 9:00PM</li>
                <li>Sat: 9:00AM - 7:00PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>123 Car Street, Auto City, CA 90000</li>
                <li>Email: info@carrental.com</li>
                <li>Phone: +1 123 456 7890</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2023 CarRental. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}