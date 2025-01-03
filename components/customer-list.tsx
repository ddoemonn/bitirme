'use client'

import { useState } from 'react'
import { CustomerData } from '@/types/customer'
import { Button } from '@/components/ui/button'
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

const initialCustomers: CustomerData[] = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '0532 123 4567', totalRentals: 5 },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '0533 234 5678', totalRentals: 12 },
  { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '0534 345 6789', totalRentals: 2 },
  { id: 4, name: 'Zeynep Çelik', email: 'zeynep@example.com', phone: '0535 456 7890', totalRentals: 20 },
  { id: 5, name: 'Ali Öztürk', email: 'ali@example.com', phone: '0536 567 8901', totalRentals: 8 },
]

export function CustomerList() {
  const [customers, setCustomers] = useState<CustomerData[]>(initialCustomers)

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>İsim</TableHead>
            <TableHead>E-posta</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Toplam Kiralama</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.totalRentals}</TableCell>
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
                      onClick={() => navigator.clipboard.writeText(customer.id.toString())}
                    >
                      Müşteri ID'sini Kopyala
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
                    <DropdownMenuItem onClick={() => handleDelete(customer.id)}>
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

