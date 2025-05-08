"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Calendar,
  Car,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { rentalsService, customersService, carsService, shopsService } from "@/lib/api"
import { Rental, Customer, Car as CarType, Shop, RentalStatus, CreateRentalDto } from "@/lib/types"
import { useRouter } from "next/navigation"

const initialFormData: CreateRentalDto = {
  customerId: 0,
  carId: 0,
  shopId: 1, // Default shop ID
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
  totalPrice: 0,
  status: RentalStatus.Pending
}

export default function BookingsPage() {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [cars, setCars] = useState<CarType[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [formData, setFormData] = useState<CreateRentalDto>(initialFormData)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [rentalsData, customersData, carsData, shopsData] = await Promise.all([
          rentalsService.getAllRentals(),
          customersService.getAllCustomers(),
          carsService.getAllCars(),
          shopsService.getAllShops()
        ])
        
        setRentals(rentalsData)
        setCustomers(customersData)
        setCars(carsData)
        setShops(shopsData)
        setError(null)
      } catch (error) {
        console.error('Error loading data:', error)
        setError('Veriler yüklenirken bir hata oluştu')
        // Redirect to login if unauthorized
        if (error instanceof Error && error.message.includes('Not authenticated')) {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'customerId' || name === 'carId' || name === 'shopId' || name === 'totalPrice' || name === 'extraPrice'
        ? Number(value)
        : name === 'status' 
          ? Number(value) as RentalStatus
          : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await rentalsService.createRental(formData)
      // Refresh rental list
      const updatedRentals = await rentalsService.getAllRentals()
      setRentals(updatedRentals)
      setFormData(initialFormData)
      setIsOpen(false)
      setError(null)
    } catch (error) {
      console.error('Error creating rental:', error)
      setError('Kiralama oluşturulurken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const updateRentalStatus = async (id: number, status: RentalStatus) => {
    setIsLoading(true)
    try {
      await rentalsService.updateRentalStatus(id, status)
      // Update the local state without a full reload
      setRentals(prevRentals => 
        prevRentals.map(rental => 
          rental.rentalId === id ? { ...rental, status } : rental
        )
      )
      setError(null)
    } catch (error) {
      console.error('Error updating rental status:', error)
      setError('Kiralama durumu güncellenirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('tr-TR', options)
  }

  // Helper function to get customer name
  const getCustomerName = (customerId: number) => {
    const customer = customers.find(c => c.customerId === customerId)
    return customer ? `${customer.name} ${customer.surname}` : 'Bilinmeyen'
  }

  // Helper function to get car name
  const getCarName = (carId: number) => {
    const car = cars.find(c => c.carId === carId)
    return car ? `${car.brand} ${car.model}` : 'Bilinmeyen'
  }

  // Helper function for rental status badge
  const getStatusBadge = (status: RentalStatus) => {
    const styles = {
      [RentalStatus.Active]: "bg-green-100 text-green-700",
      [RentalStatus.Completed]: "bg-blue-100 text-blue-700",
      [RentalStatus.Cancelled]: "bg-red-100 text-red-700",
      [RentalStatus.Pending]: "bg-yellow-100 text-yellow-700"
    }

    const labels = {
      [RentalStatus.Active]: "Aktif",
      [RentalStatus.Completed]: "Tamamlandı",
      [RentalStatus.Cancelled]: "İptal Edildi",
      [RentalStatus.Pending]: "Beklemede"
    }

    return (
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", styles[status])}>
        {labels[status]}
      </span>
    )
  }

  // Calculate stats
  const stats = {
    total: rentals.length,
    active: rentals.filter(r => r.status === RentalStatus.Active).length,
    cancelled: rentals.filter(r => r.status === RentalStatus.Cancelled).length,
    pending: rentals.filter(r => r.status === RentalStatus.Pending).length
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kiralamalar</h1>
          <p className="text-gray-500 mt-2">Tüm kiralama işlemlerini buradan yönetin</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Yeni Kiralama
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Yeni Kiralama Oluştur</DialogTitle>
                  <DialogDescription>
                    Kiralama bilgilerini girerek yeni bir kayıt oluşturun
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <select 
                    name="customerId"
                    className="w-full rounded-md border p-2"
                    value={formData.customerId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Müşteri Seçin</option>
                    {customers.map(customer => (
                      <option key={customer.customerId} value={customer.customerId}>
                        {customer.name} {customer.surname}
                      </option>
                    ))}
                  </select>
                  <select 
                    name="carId"
                    className="w-full rounded-md border p-2"
                    value={formData.carId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Araç Seçin</option>
                    {cars
                      .filter(car => car.isAvailable)
                      .map(car => (
                        <option key={car.carId} value={car.carId}>
                          {car.brand} {car.model} - {car.licensePlate}
                        </option>
                      ))
                    }
                  </select>
                  <select 
                    name="shopId"
                    className="w-full rounded-md border p-2"
                    value={formData.shopId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Şube Seçin</option>
                    {shops.map(shop => (
                      <option key={shop.shopId} value={shop.shopId}>
                        {shop.name}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Başlangıç Tarihi</label>
                      <Input 
                        name="startDate" 
                        type="date" 
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Bitiş Tarihi</label>
                      <Input 
                        name="endDate" 
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Kiralama Ücreti</label>
                    <Input 
                      name="totalPrice" 
                      type="number" 
                      placeholder="Kiralama Ücreti"
                      value={formData.totalPrice}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Notlar</label>
                    <textarea 
                      name="notes"
                      placeholder="Notlar" 
                      className="w-full rounded-md border min-h-[100px] p-2 resize-none"
                      value={formData.notes || ''}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">İptal</Button>
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
          <Input className="pl-10" placeholder="Müşteri veya araç ara..." />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" /> Filtrele
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kiralama</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kiralama</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">İptal Edilen</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tüm Kiralamalar</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Kiralamalar yükleniyor...</p>
            </div>
          ) : rentals.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Henüz kiralama bulunmuyor</h3>
              <p className="text-gray-500 mt-2">Yeni bir kiralama oluşturmak için "Yeni Kiralama" butonunu kullanın.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Müşteri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Araç
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ücret
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rentals.map((rental) => (
                    <tr key={rental.rentalId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getCustomerName(rental.customerId)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                            <Car className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getCarName(rental.carId)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(rental.startDate)}</div>
                        <div className="text-sm text-gray-500">→ {formatDate(rental.endDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₺{rental.totalPrice.toLocaleString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(rental.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {rental.status === RentalStatus.Pending && (
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateRentalStatus(rental.rentalId, RentalStatus.Active)}
                            >
                              Aktif Et
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateRentalStatus(rental.rentalId, RentalStatus.Cancelled)}
                              className="text-red-600 hover:text-red-800"
                            >
                              İptal Et
                            </Button>
                          </div>
                        )}
                        {rental.status === RentalStatus.Active && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateRentalStatus(rental.rentalId, RentalStatus.Completed)}
                          >
                            Tamamla
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

