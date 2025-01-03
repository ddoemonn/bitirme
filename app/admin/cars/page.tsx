"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { 
  Plus, 
  Search, 
  Filter, 
  Car, 
  Fuel, 
  Settings2,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CarType {
  id: number
  name: string
  model: string
  status: "available" | "rented" | "maintenance"
  price: string
  image: string
  type: string
  fuel: string
}

const initialCars: CarType[] = [
  {
    id: 1,
    name: "BMW X5",
    model: "2023",
    status: "available",
    price: "₺1,500",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    type: "SUV",
    fuel: "Dizel"
  },
  // Add more initial cars if needed
]

interface FormData {
  name: string
  model: string
  year: string
  price: string
  type: string
  fuel: string
  image: string
}

const initialFormData: FormData = {
  name: "",
  model: "",
  year: "",
  price: "",
  type: "",
  fuel: "",
  image: ""
}

export default function CarsPage() {
  const [cars, setCars] = useState<CarType[]>(initialCars)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newCar: CarType = {
      id: cars.length + 1,
      name: formData.name,
      model: formData.year,
      status: "available",
      price: `₺${formData.price}`,
      image: formData.image || "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      type: formData.type,
      fuel: formData.fuel
    }

    setCars(prev => [...prev, newCar])
    setFormData(initialFormData)
    setIsOpen(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Araçlar</h1>
          <p className="text-gray-500 mt-2">Araç filonuzu buradan yönetin</p>
        </div>
        <div className="flex items-center gap-3">
          <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
            <DrawerTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Yeni Araç Ekle
              </Button>
            </DrawerTrigger>
            <DrawerContent direction="right">
              <form onSubmit={handleSubmit}>
                <DrawerHeader>
                  <DrawerTitle>Yeni Araç Ekle</DrawerTitle>
                  <DrawerDescription>
                    Araç bilgilerini girerek filonuza yeni bir araç ekleyin
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <Input
                    name="name"
                    placeholder="Araç Markası ve Modeli"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="model"
                    placeholder="Model Yılı"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="year"
                    placeholder="Üretim Yılı"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="price"
                    placeholder="Günlük Kiralama Ücreti"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="fuel"
                      className="rounded-md border p-2"
                      value={formData.fuel}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Yakıt Tipi Seçin</option>
                      <option value="Benzin">Benzin</option>
                      <option value="Dizel">Dizel</option>
                      <option value="Elektrik">Elektrik</option>
                      <option value="Hibrit">Hibrit</option>
                    </select>
                    <select
                      name="type"
                      className="rounded-md border p-2"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Araç Tipi Seçin</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Spor">Spor</option>
                    </select>
                  </div>
                  <Input
                    name="image"
                    type="url"
                    placeholder="Araç Fotoğrafı URL"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
                <DrawerFooter>
                  <Button type="submit">Kaydet</Button>
                  <DrawerClose asChild>
                    <Button variant="outline" type="button">İptal</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-10" placeholder="Araç ara..." />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" /> Filtrele
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Araç</CardTitle>
            <Car className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Kirada</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bakımda</CardTitle>
            <Settings2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      {/* Cars Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={car.image} 
                alt={car.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{car.name}</h3>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  car.status === "available" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                )}>
                  {car.status === "available" ? "Müsait" : "Kirada"}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Car className="h-4 w-4" />
                  <span>{car.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="h-4 w-4" />
                  <span>{car.fuel}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">{car.price} / gün</span>
                <Button variant="outline" size="sm">Detaylar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

