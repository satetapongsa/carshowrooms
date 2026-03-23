'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, Grid, List as ListIcon, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CarCard } from '@/components/car-card'
import { cars, vehicleTypes, brands } from '@/lib/data'

export default function CarsPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Filter States
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All')
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All')
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || 'all')
  const [priceRange, setPriceRange] = useState([0, 500000])
  
  useEffect(() => {
    const brand = searchParams.get('brand')
    const type = searchParams.get('type')
    const condition = searchParams.get('condition')
    if (brand) setSelectedBrand(brand)
    if (type) setSelectedType(type)
    if (condition) setSelectedCondition(condition)
  }, [searchParams])

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) || 
                           car.model.toLowerCase().includes(search.toLowerCase())
      const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand
      const matchesType = selectedType === 'All' || car.type === selectedType
      const matchesCondition = selectedCondition === 'all' || car.condition.toLowerCase() === selectedCondition
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1]
      
      return matchesSearch && matchesBrand && matchesType && matchesCondition && matchesPrice
    })
  }, [search, selectedBrand, selectedType, selectedCondition, priceRange])

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Our Car Collection</h1>
            <p className="text-gray-500">Discover over {cars.length} premium vehicles available today</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 md:hidden"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters - Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <Card className="sticky top-24 border-none shadow-xl bg-white/80 backdrop-blur-md">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Keyword..." 
                      className="pl-9" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Brand</h3>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Brands</SelectItem>
                      {brands.filter(b => b !== 'All').map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Vehicle Type</h3>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      {vehicleTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Condition</h3>
                  <div className="space-y-2">
                    {['all', 'new', 'used'].map((c) => (
                      <div key={c} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`condition-${c}`} 
                          checked={selectedCondition === c}
                          onCheckedChange={() => setSelectedCondition(c)}
                        />
                        <label 
                          htmlFor={`condition-${c}`} 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                        >
                          {c}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Price Range</h3>
                    <span className="text-xs font-medium text-blue-600">${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
                  </div>
                  <Slider 
                    defaultValue={[0, 500000]} 
                    max={500000} 
                    step={1000} 
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-6"
                  />
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    setSearch('')
                    setSelectedBrand('All')
                    setSelectedType('All')
                    setSelectedCondition('all')
                    setPriceRange([0, 500000])
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {filteredCars.length > 0 ? (
              <div className={viewMode === 'grid' ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-6"}>
                <AnimatePresence mode='popLayout'>
                  {filteredCars.map((car) => (
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
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-blue-600"
                  onClick={() => {
                    setSearch('')
                    setSelectedBrand('All')
                    setSelectedType('All')
                    setSelectedCondition('all')
                    setPriceRange([0, 500000])
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[300px] bg-white p-6 shadow-2xl overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Duplicate Filter Content for Mobile */}
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Keyword..." 
                      className="pl-9" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Brand</h3>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Brands</SelectItem>
                      {brands.filter(b => b !== 'All').map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Vehicle Type</h3>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      {vehicleTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Condition</h3>
                  <div className="space-y-2">
                    {['all', 'new', 'used'].map((c) => (
                      <div key={c} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-condition-${c}`} 
                          checked={selectedCondition === c}
                          onCheckedChange={() => setSelectedCondition(c)}
                        />
                        <label 
                          htmlFor={`mobile-condition-${c}`} 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                        >
                          {c}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Price Range</h3>
                    <span className="text-xs font-medium text-blue-600">${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
                  </div>
                  <Slider 
                    defaultValue={[0, 500000]} 
                    max={500000} 
                    step={1000} 
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>

                <Button 
                  className="w-full mt-8"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Show Results ({filteredCars.length})
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
