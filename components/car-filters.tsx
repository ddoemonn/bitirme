'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CarFilters() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
      <div className="flex-1 space-y-2">
        <label htmlFor="search" className="text-sm font-medium">
          Araç Ara
        </label>
        <Input
          id="search"
          placeholder="Marka, model veya plaka ile ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full md:w-[180px] space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Durum
        </label>
        <Select>
          <SelectTrigger id="status">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="available">Müsait</SelectItem>
            <SelectItem value="rented">Kiralık</SelectItem>
            <SelectItem value="maintenance">Bakımda</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-[180px] space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Kategori
        </label>
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="economy">Ekonomi</SelectItem>
            <SelectItem value="midsize">Orta Sınıf</SelectItem>
            <SelectItem value="luxury">Lüks</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full md:w-auto">Filtrele</Button>
    </div>
  )
}

