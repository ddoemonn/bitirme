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
  Mail,
  Phone,
  User,
  MapPin,
  FileText,
  Edit,
  Trash2
} from "lucide-react"
import { customersService, rentalsService } from "@/lib/api"
import { Customer, CreateCustomerDto, Rental } from "@/lib/types"
import { useRouter } from "next/navigation"

const initialFormData: CreateCustomerDto = {
  name: "",
  surname: "",
  phone: "",
  address: "",
  email: "",
  governmentNo: "",
  drivingLicenseNo: ""
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [customerRentals, setCustomerRentals] = useState<{[key: number]: Rental[]}>({})
  const [formData, setFormData] = useState<CreateCustomerDto>(initialFormData)
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Load customers
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true)
      try {
        const data = await customersService.getAllCustomers()
        setCustomers(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching customers:', error)
        setError('Müşteriler yüklenirken bir hata oluştu')
        // Redirect to login if unauthorized
        if (error instanceof Error && error.message.includes('Not authenticated')) {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (editingCustomerId) {
        // Update existing customer
        const customer = customers.find(c => c.customerId === editingCustomerId)
        if (customer) {
          await customersService.updateCustomer(editingCustomerId, {
            ...formData,
            isDeleted: customer.isDeleted // Keep existing isDeleted value
          })
        }
      } else {
        // Create new customer
        await customersService.createCustomer({
          ...formData,
          isDeleted: false // New customers are not deleted
        })
      }
      
      // Refresh customer list
      const updatedCustomers = await customersService.getAllCustomers()
      setCustomers(updatedCustomers)
      setFormData(initialFormData)
      setEditingCustomerId(null)
      setIsOpen(false)
      setError(null)
    } catch (error) {
      console.error('Error saving customer:', error)
      setError('Müşteri kaydedilirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
     
    if (!window.confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      return
    }
    
    setIsLoading(true)
    try {
      await customersService.deleteCustomer(id)
      // Update local state
      setCustomers(customers.filter(customer => customer.customerId !== id))
      setError(null)
    } catch (error) {
      console.error('Error deleting customer:', error)
      setError('Müşteri silinirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (customer: Customer) => {
    setFormData({
      name: customer.name,
      surname: customer.surname,
      phone: customer.phone,
      address: customer.address,
      email: customer.email,
      governmentNo: customer.governmentNo,
      drivingLicenseNo: customer.drivingLicenseNo
    })
    setEditingCustomerId(customer.customerId)
    setIsOpen(true)
  }

  const loadCustomerRentals = async (customerId: number) => {
    // Skip if we already loaded this customer's rentals
    if (customerRentals[customerId]) return
    
    try {
      const rentals = await rentalsService.getRentalsByCustomer(customerId)
      setCustomerRentals(prev => ({
        ...prev,
        [customerId]: rentals
      }))
    } catch (error) {
      console.error(`Error loading rentals for customer ${customerId}:`, error)
    }
  }

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.name} ${customer.surname}`.toLowerCase()
    const email = customer.email.toLowerCase()
    const phone = customer.phone
    const searchLower = searchTerm.toLowerCase()
    
    return fullName.includes(searchLower) || 
           email.includes(searchLower) || 
           phone.includes(searchLower)
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Müşteriler</h1>
          <p className="text-gray-500 mt-2">Müşteri bilgilerini buradan yönetin</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Yeni Müşteri Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingCustomerId ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
                  </DialogTitle>
                  <DialogDescription>
                    Müşteri bilgilerini girerek {editingCustomerId ? 'düzenleyin' : 'sisteme ekleyin'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Ad</label>
                      <Input
                        name="name"
                        placeholder="Ad"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Soyad</label>
                      <Input
                        name="surname"
                        placeholder="Soyad"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">E-posta</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="ornek@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Telefon</label>
                    <Input
                      name="phone"
                      placeholder="0555 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Adres</label>
                    <Input
                      name="address"
                      placeholder="Adres"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">TC Kimlik No</label>
                      <Input
                        name="governmentNo"
                        placeholder="12345678901"
                        value={formData.governmentNo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Ehliyet No</label>
                      <Input
                        name="drivingLicenseNo"
                        placeholder="AB1234567"
                        value={formData.drivingLicenseNo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" type="button" onClick={() => {
                      setFormData(initialFormData)
                      setEditingCustomerId(null)
                    }}>
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
          <Input 
            className="pl-10" 
            placeholder="Müşteri ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" /> Filtrele
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <User className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktif Müşteriler</CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => !c.isDeleted).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Yeni Müşteriler (Bu Ay)</CardTitle>
            <User className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => {
                const createdDate = c.createdAt ? new Date(c.createdAt) : null
                if (!createdDate) return false
                
                const now = new Date()
                return createdDate.getMonth() === now.getMonth() && 
                       createdDate.getFullYear() === now.getFullYear()
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading && customers.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Müşteriler yükleniyor...</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            {searchTerm ? 'Aranan kriterlere uygun müşteri bulunamadı' : 'Henüz müşteri bulunmuyor'}
          </h3>
          <p className="text-gray-500 mt-2">
            {searchTerm ? 'Farklı bir arama terimi deneyin' : 'Yeni müşteri eklemek için "Yeni Müşteri Ekle" butonunu kullanabilirsiniz.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.customerId} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{customer.name} {customer.surname}</h3>
                    <p className="text-sm text-gray-500">Müşteri ID: {customer.customerId}</p>
                  </div>
                  {customer.isDeleted && (
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Pasif
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <span className="flex-1">{customer.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    <span>TC: {customer.governmentNo}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Ehliyet: {customer.drivingLicenseNo}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadCustomerRentals(customer.customerId)}
                  >
                    Kiralama Geçmişi ({customerRentals[customer.customerId]?.length || "..."})
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-0 w-8 h-8"
                      onClick={() => handleDelete(customer.customerId)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button 
                      size="sm"
                      className="p-0 w-8 h-8"
                      onClick={() => handleEdit(customer)}
                    >
                      <Edit className="h-4 w-4" />
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

