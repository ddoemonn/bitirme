'use client'

import { useState } from 'react'
import { CarData } from '@/types/car'
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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

const initialCars: CarData[] = [
  { id: 1, brand: 'Toyota', model: 'Corolla', year: 2022, plate: '34 ABC 123', status: 'Müsait', category: 'Ekonomi' },
  { id: 2, brand: 'Honda', model: 'Civic', year: 2021, plate: '34 XYZ 789', status: 'Kiralık', category: 'Ekonomi' },
  { id: 3, brand: 'BMW', model: '3 Serisi', year: 2023, plate: '34 DEF 456', status: 'Bakımda', category: 'Lüks' },
  { id: 4, brand: 'Mercedes', model: 'C-Class', year: 2022, plate: '34 GHI 789', status: 'Müsait', category: 'Lüks' },
  { id: 5, brand: 'Volkswagen', model: 'Passat', year: 2021, plate: '34 JKL 012', status: 'Kiralık', category: 'Orta Sınıf' },
]

export function CarList() {
  const [cars, setCars] = useState<CarData[]>(initialCars)

  const handleDelete = (id: number) => {
    setCars(cars.filter(car => car.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Marka</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Yıl</TableHead>
            <TableHead>Plaka</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell className="font-medium">{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.plate}</TableCell>
              <TableCell>{car.status}</TableCell>
              <TableCell>{car.category}</TableCell>
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
                      onClick={() => navigator.clipboard.writeText(car.id.toString())}
                    >
                      Araç ID&apos;sini Kopyala
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(car.id)}>
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

