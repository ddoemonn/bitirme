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
  Store,
  Phone,
  Mail,
  MapPin,
  Clock,
  Edit,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { shopsService } from "@/lib/api"
import { Shop, CreateShopDto } from "@/lib/types"

const initialFormData: CreateShopDto = {
  name: "",
  address: "",
  phoneNumber: "",
  email: "",
  description: "",
  ownerId: 1, // Default owner ID (admin)
  isEnabled: true
}

export default function SettingsPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [formData, setFormData] = useState<CreateShopDto>(initialFormData)
  const [editingShopId, setEditingShopId] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load shops
  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true)
      try {
        const data = await shopsService.getAllShops()
        setShops(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching shops:', error)
        setError('Şubeler yüklenirken bir hata oluştu')
      } finally {
        setIsLoading(false)
      }
    }

    fetchShops()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (editingShopId) {
        // Update existing shop
        const shopToUpdate = shops.find(s => s.shopId === editingShopId)
        if (shopToUpdate) {
          await shopsService.updateShop(editingShopId, {
            ...shopToUpdate,
            name: formData.name,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            email: formData.email || "",
            description: formData.description || "",
            ownerId: formData.ownerId,
            isEnabled: formData.isEnabled
          })
        }
      } else {
        // Create new shop
        await shopsService.createShop(formData)
      }
      
      // Refresh shop list
      const updatedShops = await shopsService.getAllShops()
      setShops(updatedShops)
      setFormData(initialFormData)
      setEditingShopId(null)
      setIsOpen(false)
      setError(null)
    } catch (error) {
      console.error('Error saving shop:', error)
      setError('Şube kaydedilirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    // Use window.confirm for browser confirmation dialog
     
    if (!window.confirm('Bu şubeyi silmek istediğinize emin misiniz?')) {
      return
    }
    
    setIsLoading(true)
    try {
      await shopsService.deleteShop(id)
      // Update local state
      setShops(shops.filter(shop => shop.shopId !== id))
      setError(null)
    } catch (error) {
      console.error('Error deleting shop:', error)
      setError('Şube silinirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (shop: Shop) => {
    setFormData({
      name: shop.name,
      address: shop.address,
      phoneNumber: shop.phoneNumber,
      email: shop.email || "",
      description: shop.description || "",
      ownerId: shop.ownerId,
      isEnabled: shop.isEnabled
    })
    setEditingShopId(shop.shopId)
    setIsOpen(true)
  }

  // Format working hours for display
  const formatWorkingHours = (shop: Shop) => {
    if (!shop.workingHours || shop.workingHours.length === 0) {
      return "Çalışma saatleri belirtilmemiş"
    }

    interface TimeInfo {
      totalHours?: number;
      totalMinutes?: number;
    }

    const formatTime = (time: TimeInfo) => {
      if (!time) return "Belirtilmemiş"
      const hours = Math.floor(time.totalHours || 0)
      const minutes = Math.floor((time.totalMinutes || 0) % 60)
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    const today = new Date().getDay()
    // Convert Sunday from 0 to 6 for our enum
    const todayIndex = today === 0 ? 6 : today - 1
    
    const todayHours = shop.workingHours.find(wh => wh.dayOfWeek === todayIndex)
    if (!todayHours) {
      return "Bugün için çalışma saati bilgisi yok"
    }

    if (!todayHours.isOpen) {
      return "Bugün kapalı"
    }

    return `Bugün: ${formatTime(todayHours.openingTime)} - ${formatTime(todayHours.closingTime)}`
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Şube Yönetimi</h1>
          <p className="text-gray-500 mt-2">Şube bilgilerini ve çalışma saatlerini yönetin</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Yeni Şube Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingShopId ? 'Şube Düzenle' : 'Yeni Şube Ekle'}
                  </DialogTitle>
                  <DialogDescription>
                    Şube bilgilerini girerek {editingShopId ? 'düzenleyin' : 'yeni bir şube ekleyin'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Şube Adı</label>
                    <Input
                      name="name"
                      placeholder="Örn: Merkez Şube"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Adres</label>
                    <Input
                      name="address"
                      placeholder="Şube adresi"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Telefon</label>
                    <Input
                      name="phoneNumber"
                      placeholder="0212 123 4567"
                      value={formData.phoneNumber || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">E-posta</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="sube@firma.com"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Açıklama</label>
                    <textarea
                      name="description"
                      className="w-full rounded-md border p-2 min-h-20"
                      placeholder="Şube hakkında bilgiler..."
                      value={formData.description || ""}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isEnabled"
                      className="mr-2"
                      checked={formData.isEnabled}
                      onChange={(e) => 
                        setFormData(prev => ({ ...prev, isEnabled: e.target.checked }))
                      }
                    />
                    <label htmlFor="isEnabled" className="text-sm text-gray-600">
                      Şube aktif
                    </label>
                  </div>
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
                        setEditingShopId(null)
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Şube</CardTitle>
            <Store className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shops.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktif Şubeler</CardTitle>
            <Store className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shops.filter(s => s.isEnabled).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pasif Şubeler</CardTitle>
            <Store className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shops.filter(s => !s.isEnabled).length}</div>
          </CardContent>
        </Card>
      </div>

      {isLoading && shops.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Şubeler yükleniyor...</p>
        </div>
      ) : shops.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Henüz şube bulunmuyor</h3>
          <p className="text-gray-500 mt-2">
            Yeni şube eklemek için "Yeni Şube Ekle" butonunu kullanabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => (
            <div key={shop.shopId} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    <p className="text-sm text-gray-500">Şube ID: {shop.shopId}</p>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    shop.isEnabled 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  )}>
                    {shop.isEnabled ? "Aktif" : "Pasif"}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <span className="flex-1">{shop.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{shop.phoneNumber}</span>
                  </div>
                  {shop.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{shop.email}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formatWorkingHours(shop)}</span>
                  </div>
                </div>
                {shop.description && (
                  <div className="mt-3 text-sm text-gray-600 border-t pt-3">
                    {shop.description}
                  </div>
                )}
                <div className="mt-4 flex justify-end items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="p-0 w-8 h-8"
                    onClick={() => handleDelete(shop.shopId)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button 
                    size="sm"
                    className="p-0 w-8 h-8"
                    onClick={() => handleEdit(shop)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

