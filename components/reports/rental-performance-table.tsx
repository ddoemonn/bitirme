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
import { Badge } from "@/components/ui/badge"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Filter,
  Minus,
  MoreHorizontal,
  Search,
} from "lucide-react"

const rentalPerformanceData = [
  {
    id: 1,
    category: "Ekonomi",
    totalRentals: 763,
    growth: 15.3,
    avgDuration: 3.8,
    avgValue: 950,
    utilization: 85,
    mostPopularModel: "Toyota Corolla",
    status: "Yüksek Performans",
  },
  {
    id: 2,
    category: "Orta Sınıf",
    totalRentals: 542,
    growth: 12.7,
    avgDuration: 4.2,
    avgValue: 1250,
    utilization: 78,
    mostPopularModel: "Honda Civic",
    status: "Yüksek Performans",
  },
  {
    id: 3,
    category: "Lüks",
    totalRentals: 287,
    growth: 8.5,
    avgDuration: 5.1,
    avgValue: 2100,
    utilization: 65,
    mostPopularModel: "BMW 3 Serisi",
    status: "Normal Performans",
  },
  {
    id: 4,
    category: "SUV",
    totalRentals: 198,
    growth: 22.4,
    avgDuration: 4.7,
    avgValue: 1750,
    utilization: 72,
    mostPopularModel: "Hyundai Tucson",
    status: "Yüksek Performans",
  },
  {
    id: 5,
    category: "Minivan",
    totalRentals: 124,
    growth: -3.2,
    avgDuration: 6.2,
    avgValue: 1850,
    utilization: 58,
    mostPopularModel: "Volkswagen Transporter",
    status: "Düşük Performans",
  },
  {
    id: 6,
    category: "Elektrikli",
    totalRentals: 87,
    growth: 45.8,
    avgDuration: 3.5,
    avgValue: 1650,
    utilization: 62,
    mostPopularModel: "Tesla Model 3",
    status: "Yüksek Performans",
  },
]

export function RentalPerformanceTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("category")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getFilteredData = () => {
    let data = [...rentalPerformanceData]

    // Filter by search term
    if (searchTerm) {
      data = data.filter(
        (item) =>
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mostPopularModel.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter) {
      data = data.filter((item) => item.status === statusFilter)
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

  const getGrowthIndicator = (growth: number) => {
    if (growth > 15) {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <ArrowUp className="mr-1 h-3 w-3" />
          {growth.toFixed(1)}%
        </Badge>
      )
    } else if (growth > 0) {
      return (
        <Badge className="bg-emerald-500 hover:bg-emerald-600">
          <ArrowUp className="mr-1 h-3 w-3" />
          {growth.toFixed(1)}%
        </Badge>
      )
    } else if (growth < 0) {
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <ArrowDown className="mr-1 h-3 w-3" />
          {Math.abs(growth).toFixed(1)}%
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-gray-500 hover:bg-gray-600">
          <Minus className="mr-1 h-3 w-3" />
          0%
        </Badge>
      )
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Yüksek Performans":
        return <Badge className="bg-green-500">Yüksek Performans</Badge>
      case "Normal Performans":
        return <Badge className="bg-blue-500">Normal Performans</Badge>
      case "Düşük Performans":
        return <Badge className="bg-amber-500">Düşük Performans</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Kategori veya model ara..."
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
              <DropdownMenuLabel>Performans Durumu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>Tümü</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Yüksek Performans")}>
                Yüksek Performans
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Normal Performans")}>
                Normal Performans
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Düşük Performans")}>Düşük Performans</DropdownMenuItem>
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
              <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                <div className="flex items-center">
                  Araç Kategorisi
                  {getSortIcon("category")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("totalRentals")}>
                <div className="flex items-center justify-end">
                  Toplam Kiralama
                  {getSortIcon("totalRentals")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("growth")}>
                <div className="flex items-center justify-end">
                  Büyüme
                  {getSortIcon("growth")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("avgValue")}>
                <div className="flex items-center justify-end">
                  Ort. Değer
                  {getSortIcon("avgValue")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("utilization")}>
                <div className="flex items-center justify-end">
                  Kullanım
                  {getSortIcon("utilization")}
                </div>
              </TableHead>
              <TableHead>En Popüler Model</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredData().map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.category}</TableCell>
                <TableCell className="text-right">{data.totalRentals}</TableCell>
                <TableCell className="text-right">{getGrowthIndicator(data.growth)}</TableCell>
                <TableCell className="text-right">{data.avgValue} ₺</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${data.utilization}%` }}></div>
                    </div>
                    {data.utilization}%
                  </div>
                </TableCell>
                <TableCell>{data.mostPopularModel}</TableCell>
                <TableCell>{getStatusBadge(data.status)}</TableCell>
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Detayları Görüntüle
                      </DropdownMenuItem>
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

