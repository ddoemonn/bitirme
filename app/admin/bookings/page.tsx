"use client"

import { useState } from "react"
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

interface BookingType {
  id: number
  customerName: string
  carName: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "cancelled" | "pending"
  price: string
}

const initialBookings: BookingType[] = [
  {
    id: 1,
    customerName: "Ahmet Yılmaz",
    carName: "BMW X5",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    status: "active",
    price: "₺7,500"
  },
  // Add more bookings...
]

export default function BookingsPage() {
  const [bookings] = useState<BookingType[]>(initialBookings)
  const [isOpen, setIsOpen] = useState(false)

  const getStatusBadge = (status: BookingType["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700"
    }

    const labels = {
      active: "Aktif",
      completed: "Tamamlandı",
      cancelled: "İptal Edildi",
      pending: "Beklemede"
    }

    return (
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", styles[status])}>
        {labels[status]}
      </span>
    )
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
              <form onSubmit={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>Yeni Kiralama Oluştur</DialogTitle>
                  <DialogDescription>
                    Kiralama bilgilerini girerek yeni bir kayıt oluşturun
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <select className="w-full rounded-md border p-2">
                    <option value="">Müşteri Seçin</option>
                    <option>Ahmet Yılmaz</option>
                    <option>Ayşe Demir</option>
                    <option>Mehmet Kaya</option>
                    <option>Zeynep Çelik</option>
                    <option>Ali Öztürk</option>
                  </select>
                  <select className="w-full rounded-md border p-2">
                    <option value="">Araç Seçin</option>
                    <option>BMW X5 - Siyah - 34 ABC 123</option>
                    <option>Mercedes C200 - Gri - 34 XYZ 789</option>
                    <option>Audi A6 - Beyaz - 34 DEF 456</option>
                    <option>Volkswagen Passat - Mavi - 34 GHI 789</option>
                    <option>Toyota Corolla - Kırmızı - 34 JKL 012</option>
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" placeholder="Başlangıç Tarihi" required />
                    <Input type="date" placeholder="Bitiş Tarihi" required />
                  </div>
                  <Input placeholder="Kiralama Ücreti" type="number" required />
                  <textarea 
                    placeholder="Notlar" 
                    className="w-full rounded-md border min-h-[100px] p-2 resize-none"
                  ></textarea>
                </div>
                <DialogFooter>
                  <Button type="submit">Kaydet</Button>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">İptal</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
            <div className="text-2xl font-bold">1,248</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kiralama</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">İptal Edilen</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tüm Kiralamalar</CardTitle>
        </CardHeader>
        <CardContent>
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
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ücret
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{booking.carName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {new Date(booking.startDate).toLocaleDateString('tr-TR')} - 
                          {new Date(booking.endDate).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm">Detaylar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

