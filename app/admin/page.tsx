"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Car,
  DollarSign,
  Store,
  Users,
  Calendar,
  Zap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { rentalsService, customersService, carsService, shopsService } from "@/lib/api"
import { RentalStatus } from "@/lib/types"

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalRentals: 0,
    activeRentals: 0,
    totalCustomers: 0,
    totalShops: 0,
    totalRevenue: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Fetch all the necessary data in parallel
        const [cars, rentals, customers, shops] = await Promise.all([
          carsService.getAllCars(),
          rentalsService.getAllRentals(),
          customersService.getAllCustomers(),
          shopsService.getAllShops()
        ])

        // Calculate total revenue from all rentals
        const totalRevenue = rentals.reduce((sum, rental) => sum + rental.totalPrice, 0)
        
        // Calculate active rentals (those that are currently ongoing)
        const activeRentals = rentals.filter(rental => 
          rental.status === RentalStatus.Active || 
          rental.status === RentalStatus.Reserved
        ).length

        setStats({
          totalCars: cars.length,
          availableCars: cars.filter(car => car.isAvailable).length,
          totalRentals: rentals.length,
          activeRentals,
          totalCustomers: customers.length,
          totalShops: shops.length,
          totalRevenue
        })

        setError(null)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Dashboard verileri yüklenirken bir hata oluştu')
        
        // Redirect to login if unauthorized
        if (error instanceof Error && error.message.includes('Not authenticated')) {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-2">Araç Kiralama Sistemi genel durumu</p>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Dashboard yükleniyor...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Toplam Araç</CardTitle>
                <Car className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCars}</div>
                <p className="text-xs text-gray-500">
                  {stats.availableCars} araç kiralanabilir durumda
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Toplam Kiralama</CardTitle>
                <Calendar className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRentals}</div>
                <p className="text-xs text-gray-500">
                  {stats.activeRentals} aktif kiralama
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Toplam Şube</CardTitle>
                <Store className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalShops}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Toplam Gelir</CardTitle>
                <CardDescription>
                  Tüm zamanlar için toplam kiralama geliri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-500 mr-3" />
                  <div className="text-3xl font-bold">₺{stats.totalRevenue.toLocaleString('tr-TR')}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hızlı Erişim</CardTitle>
                <CardDescription>
                  Sık kullanılan sayfalara hızlıca erişin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/admin/bookings">
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                    Yeni Kiralama Oluştur
                  </Button>
                </Link>
                <Link href="/admin/cars">
                  <Button variant="outline" className="w-full justify-start">
                    <Car className="mr-2 h-4 w-4 text-blue-500" />
                    Araç Yönetimi
                  </Button>
                </Link>
                <Link href="/admin/customers">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4 text-indigo-500" />
                    Müşteri Yönetimi
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Store className="mr-2 h-4 w-4 text-green-500" />
                    Şube Yönetimi
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

