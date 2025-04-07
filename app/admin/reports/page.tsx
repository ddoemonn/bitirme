import type { Metadata } from "next"
import { ReportDateFilter } from "@/components/reports/report-date-filter"
import { RevenueChart } from "@/components/reports/revenue-chart"
import { RentalCountChart } from "@/components/reports/rental-count-chart"
import { CustomerRegistrationChart } from "@/components/reports/customer-registration-chart"
import { MostRentedCarsChart } from "@/components/reports/most-rented-cars-chart"
import { RentalStatisticsTable } from "@/components/reports/rental-statistics-table"
import { RentalPerformanceTable } from "@/components/reports/rental-performance-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Raporlar | Admin Paneli",
  description: "Araç kiralama işletmesi için detaylı raporlar ve analizler",
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Raporlar</h1>
      </div>

      <ReportDateFilter />

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Gelir</TabsTrigger>
          <TabsTrigger value="rentals">Kiralamalar</TabsTrigger>
          <TabsTrigger value="customers">Müşteriler</TabsTrigger>
          <TabsTrigger value="cars">Araçlar</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gelir Grafiği</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <RevenueChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺152,345</div>
                <p className="text-xs text-muted-foreground">+20.1% geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Günlük Gelir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺4,942</div>
                <p className="text-xs text-muted-foreground">+12.5% geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Kiralama Değeri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺1,250</div>
                <p className="text-xs text-muted-foreground">+5.2% geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doluluk Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+8% geçen aya göre</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Kiralama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">+15.3% geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Kiralama Süresi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2 gün</div>
                <p className="text-xs text-muted-foreground">+0.5 gün geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">İptal Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8%</div>
                <p className="text-xs text-muted-foreground">-1.2% geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tekrar Eden Müşteriler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <p className="text-xs text-muted-foreground">+5% geçen aya göre</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aylık Kiralama Sayısı</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <RentalCountChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kiralama İstatistikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <RentalStatisticsTable />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kiralama Performansı</CardTitle>
            </CardHeader>
            <CardContent>
              <RentalPerformanceTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,842</div>
                <p className="text-xs text-muted-foreground">+124 geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yeni Müşteriler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+18% geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Müşteri Memnuniyeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">+0.2 geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Müşteri Değeri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺3,250</div>
                <p className="text-xs text-muted-foreground">+12% geçen aya göre</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Müşteri Kaydı Grafiği</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <CustomerRegistrationChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cars" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Araç</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">+5 geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bakım Maliyeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺12,450</div>
                <p className="text-xs text-muted-foreground">-8% geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Araç Yaşı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 yıl</div>
                <p className="text-xs text-muted-foreground">+0.2 geçen aya göre</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Araç Başı Gelir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺3,175</div>
                <p className="text-xs text-muted-foreground">+14% geçen aya göre</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>En Çok Kiralanan Araç Türleri</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <MostRentedCarsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

