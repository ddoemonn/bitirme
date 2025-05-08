"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { 
  Plus, 
  Search, 
  Filter, 
  Car, 
  Fuel, 
  Settings2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { carsService } from "@/lib/api"
import { Car as CarType, CreateCarDto } from "@/lib/types"
import { useRouter } from "next/navigation"

const initialFormData: CreateCarDto = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  dailyPrice: 0,
  licensePlate: "",
  color: "",
  kilometer: 0,
  transmissionType: "",
  fuelType: "",
  shopId: 1, // Default shop ID
  isAvailable: true
}

export default function CarsPage() {
  const [cars, setCars] = useState<CarType[]>([])
  const [formData, setFormData] = useState<CreateCarDto>(initialFormData)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingCarId, setEditingCarId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true)
      try {
        const data = await carsService.getAllCars()
        setCars(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching cars:', error)
        setError('Araçlar yüklenirken bir hata oluştu')
        // Redirect to login if unauthorized
        if (error instanceof Error && error.message.includes('Not authenticated')) {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'dailyPrice' || name === 'kilometer' || name === 'shopId' 
        ? Number(value) 
        : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (editingCarId) {
        // For now, we're using the create endpoint since update is not directly available
        // In a real app, we'd have an update endpoint
        await carsService.createCar({
          ...formData,
          isAvailable: formData.isAvailable === undefined ? true : formData.isAvailable,
          isDeleted: false // Always set isDeleted to false for creating cars
        })
        // Then delete the old car
        await carsService.deleteCar(editingCarId)
      } else {
        await carsService.createCar({
          ...formData,
          isAvailable: formData.isAvailable === undefined ? true : formData.isAvailable,
          isDeleted: false // Always set isDeleted to false for creating cars
        })
      }
      // Refresh car list
      const updatedCars = await carsService.getAllCars()
      setCars(updatedCars)
      setFormData(initialFormData)
      setEditingCarId(null)
      setIsOpen(false)
      setError(null)
    } catch (error) {
      console.error('Error saving car:', error)
      setError('Araç kaydedilirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (car: CarType) => {
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      dailyPrice: car.dailyPrice,
      licensePlate: car.licensePlate,
      color: car.color || "",
      kilometer: car.kilometer,
      transmissionType: car.transmissionType || "",
      fuelType: car.fuelType || "",
      shopId: car.shopId,
      isAvailable: car.isAvailable
    })
    setEditingCarId(car.carId)
    setIsOpen(true)
  }

  const handleDelete = async (id: number) => {
     
    if (!window.confirm('Bu aracı silmek istediğinize emin misiniz?')) {
      return
    }
    
    setIsLoading(true)
    try {
      await carsService.deleteCar(id)
      // Refresh car list
      setCars(cars.filter(car => car.carId !== id))
      setError(null)
    } catch (error) {
      console.error('Error deleting car:', error)
      setError('Araç silinirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Araçlar</h1>
          <p className="text-gray-500 mt-2">Araç filonuzu buradan yönetin</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Yeni Araç Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingCarId ? 'Araç Düzenle' : 'Yeni Araç Ekle'}</DialogTitle>
                  <DialogDescription>
                    Araç bilgilerini {editingCarId ? 'güncelleyin' : 'girerek filonuza yeni bir araç ekleyin'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    name="brand"
                    placeholder="Araç Markası"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="model"
                    placeholder="Model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="year"
                    placeholder="Üretim Yılı"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="dailyPrice"
                    placeholder="Günlük Kiralama Ücreti"
                    type="number"
                    value={formData.dailyPrice}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="licensePlate"
                    placeholder="Plaka"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="kilometer"
                    placeholder="Kilometre"
                    type="number"
                    value={formData.kilometer}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="color"
                    placeholder="Renk"
                    value={formData.color || ""}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="fuelType"
                      className="rounded-md border p-2"
                      value={formData.fuelType || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Yakıt Tipi Seçin</option>
                      <option value="Benzin">Benzin</option>
                      <option value="Dizel">Dizel</option>
                      <option value="Elektrik">Elektrik</option>
                      <option value="Hibrit">Hibrit</option>
                    </select>
                    <select
                      name="transmissionType"
                      className="rounded-md border p-2"
                      value={formData.transmissionType || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Vites Tipi Seçin</option>
                      <option value="Manuel">Manuel</option>
                      <option value="Otomatik">Otomatik</option>
                      <option value="Yarı Otomatik">Yarı Otomatik</option>
                    </select>
                  </div>
                  <select
                    name="shopId"
                    className="w-full rounded-md border p-2"
                    value={formData.shopId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">Ana Şube</option>
                    {/* Additional shops would be dynamically loaded here */}
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                  <DialogClose asChild>
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={() => {
                        setFormData(initialFormData)
                        setEditingCarId(null)
                      }}
                    >
                      İptal
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-10" placeholder="Araç ara..." />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" /> Filtrele
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Araçlar yükleniyor...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Henüz araç bulunmuyor</h3>
          <p className="text-gray-500 mt-2">Yeni araç eklemek için "Yeni Araç Ekle" butonunu kullanabilirsiniz.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div key={car.carId} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
                    <p className="text-sm text-gray-500">{car.year} · {car.licensePlate}</p>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    car.isAvailable 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  )}>
                    {car.isAvailable ? "Müsait" : "Kirada"}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.fuelType && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      <Fuel className="mr-1 h-3 w-3" /> {car.fuelType}
                    </span>
                  )}
                  {car.transmissionType && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                      <Settings2 className="mr-1 h-3 w-3" /> {car.transmissionType}
                    </span>
                  )}
                  {car.kilometer && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {car.kilometer.toLocaleString()} km
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">₺{car.dailyPrice.toLocaleString('tr-TR')}<span className="text-sm text-gray-500 font-normal">/gün</span></div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(car.carId)}
                    >
                      Sil
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleEdit(car)}
                    >
                      Düzenle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

