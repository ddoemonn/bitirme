'use client'

import { useState } from 'react'
import { BookingData } from '@/types/booking'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react'

const initialBookings: BookingData[] = [
  { id: 1, customerName: 'Ahmet Yılmaz', carInfo: 'Toyota Corolla - 34 ABC 123', startDate: '2023-07-01', endDate: '2023-07-05', status: 'Aktif', totalAmount: 1000 },
  { id: 2, customerName: 'Ayşe Demir', carInfo: 'Honda Civic - 34 XYZ 789', startDate: '2023-07-03', endDate: '2023-07-10', status: 'Aktif', totalAmount: 1400 },
  { id: 3, customerName: 'Mehmet Kaya', carInfo: 'BMW 3 Serisi - 34 DEF 456', startDate: '2023-06-28', endDate: '2023-07-02', status: 'Tamamlandı', totalAmount: 2000 },
  { id: 4, customerName: 'Zeynep Çelik', carInfo: 'Mercedes C-Class - 34 GHI 789', startDate: '2023-07-05', endDate: '2023-07-12', status: 'Aktif', totalAmount: 2800 },
  { id: 5, customerName: 'Ali Öztürk', carInfo: 'Volkswagen Passat - 34 JKL 012', startDate: '2023-07-02', endDate: '2023-07-04', status: 'Tamamlandı', totalAmount: 600 },
]

export function BookingList() {
  const [bookings, setBookings] = useState<BookingData[]>(initialBookings)

  const handleDelete = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-500'
      case 'Tamamlandı':
        return 'bg-blue-500'
      case 'İptal Edildi':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Müşteri</TableHead>
            <TableHead>Araç Bilgisi</TableHead>
            <TableHead>Başlangıç Tarihi</TableHead>
            <TableHead>Bitiş Tarihi</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Toplam Tutar</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.customerName}</TableCell>
              <TableCell>{booking.carInfo}</TableCell>
              <TableCell>{booking.startDate}</TableCell>
              <TableCell>{booking.endDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              </TableCell>
              <TableCell>{booking.totalAmount} ₺</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Menüyü aç</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(booking.id.toString())}
                    >
                      Kiralama ID'sini Kopyala
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Detayları Görüntüle
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(booking.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

