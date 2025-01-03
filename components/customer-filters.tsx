'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CustomerFilters() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
      <div className="flex-1 space-y-2">
        <label htmlFor="search" className="text-sm font-medium">
          Müşteri Ara
        </label>
        <Input
          id="search"
          placeholder="İsim, e-posta veya telefon ile ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button className="w-full md:w-auto">Filtrele</Button>
    </div>
  )
}

