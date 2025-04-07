"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ChevronDown, Download, FileText, Filter, MoreHorizontal, Search } from "lucide-react"

const rentalStatistics = [
  {
    id: 1,
    month: "Ocak",
    totalRentals: 95,
    avgDuration: 3.8,
    avgValue: 1150,
    completionRate: 96.2,
    cancellationRate: 3.8,
    utilization: 72,
  },
  {
    id: 2,
    month: "Şubat",
    totalRentals: 112,
    avgDuration: 4.1,
    avgValue: 1180,
    completionRate: 95.5,
    cancellationRate: 4.5,
    utilization: 75,
  },
  {
    id: 3,
    month: "Mart",
    totalRentals: 125,
    avgDuration: 4.3,
    avgValue: 1210,
    completionRate: 97.1,
    cancellationRate: 2.9,
    utilization: 78,
  },
  {
    id: 4,
    month: "Nisan",
    totalRentals: 106,
    avgDuration: 3.9,
    avgValue: 1190,
    completionRate: 96.8,
    cancellationRate: 3.2,
    utilization: 74,
  },
  {
    id: 5,
    month: "Mayıs",
    totalRentals: 136,
    avgDuration: 4.5,
    avgValue: 1230,
    completionRate: 97.5,
    cancellationRate: 2.5,
    utilization: 82,
  },
  {
    id: 6,
    month: "Haziran",
    totalRentals: 156,
    avgDuration: 4.8,
    avgValue: 1280,
    completionRate: 98.1,
    cancellationRate: 1.9,
    utilization: 85,
  },
  {
    id: 7,
    month: "Temmuz",
    totalRentals: 173,
    avgDuration: 5.2,
    avgValue: 1320,
    completionRate: 98.5,
    cancellationRate: 1.5,
    utilization: 88,
  },
  {
    id: 8,
    month: "Ağustos",
    totalRentals: 185,
    avgDuration: 5.5,
    avgValue: 1350,
    completionRate: 98.8,
    cancellationRate: 1.2,
    utilization: 92,
  },
  {
    id: 9,
    month: "Eylül",
    totalRentals: 164,
    avgDuration: 5.0,
    avgValue: 1300,
    completionRate: 98.2,
    cancellationRate: 1.8,
    utilization: 86,
  },
  {
    id: 10,
    month: "Ekim",
    totalRentals: 146,
    avgDuration: 4.6,
    avgValue: 1270,
    completionRate: 97.8,
    cancellationRate: 2.2,
    utilization: 83,
  },
  {
    id: 11,
    month: "Kasım",
    totalRentals: 128,
    avgDuration: 4.2,
    avgValue: 1240,
    completionRate: 97.0,
    cancellationRate: 3.0,
    utilization: 79,
  },
  {
    id: 12,
    month: "Aralık",
    totalRentals: 117,
    avgDuration: 4.0,
    avgValue: 1220,
    completionRate: 96.5,
    cancellationRate: 3.5,
    utilization: 76,
  },
]

export function RentalStatisticsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("month")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [view, setView] = useState<"all" | "quarter" | "half">("all")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getFilteredData = () => {
    let data = [...rentalStatistics]

    // Filter by view
    switch (view) {
      case "quarter":
        data = data.slice(0, 3) // First quarter (Jan-Mar)
        break
      case "half":
        data = data.slice(0, 6) // First half (Jan-Jun)
        break
    }

    // Filter by search term
    if (searchTerm) {
      data = data.filter((item) => item.month.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Sort data
    data.sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

    return data
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? (
      <ChevronDown className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Ay ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                Filtrele
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Görüntüleme Seçin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setView("all")}>Tüm Aylar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("quarter")}>İlk Çeyrek</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("half")}>İlk Yarı</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Download className="h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <FileText className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("month")}>
                <div className="flex items-center">
                  Ay
                  {getSortIcon("month")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("totalRentals")}>
                <div className="flex items-center justify-end">
                  Toplam Kiralama
                  {getSortIcon("totalRentals")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("avgDuration")}>
                <div className="flex items-center justify-end">
                  Ort. Süre (Gün)
                  {getSortIcon("avgDuration")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("avgValue")}>
                <div className="flex items-center justify-end">
                  Ort. Değer (₺)
                  {getSortIcon("avgValue")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("completionRate")}>
                <div className="flex items-center justify-end">
                  Tamamlanma (%)
                  {getSortIcon("completionRate")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("utilization")}>
                <div className="flex items-center justify-end">
                  Kullanım (%)
                  {getSortIcon("utilization")}
                </div>
              </TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredData().map((stat) => (
              <TableRow key={stat.id}>
                <TableCell className="font-medium">{stat.month}</TableCell>
                <TableCell className="text-right">{stat.totalRentals}</TableCell>
                <TableCell className="text-right">{stat.avgDuration.toFixed(1)}</TableCell>
                <TableCell className="text-right">{stat.avgValue} ₺</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${stat.completionRate}%` }}
                      ></div>
                    </div>
                    {stat.completionRate.toFixed(1)}%
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${stat.utilization}%` }}></div>
                    </div>
                    {stat.utilization}%
                  </div>
                </TableCell>
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
                      <DropdownMenuItem>Detayları Görüntüle</DropdownMenuItem>
                      <DropdownMenuItem>Rapor Oluştur</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Karşılaştır</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

