import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from '@/components/overview'
import { RecentBookings } from '@/components/recent-bookings'
import { CarStats } from '@/components/car-stats'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Users, 
  Car, 
  Calendar,
  ArrowUpRight,
} from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kontrol Paneli</h1>
          <p className="text-gray-500 mt-2">Hoş geldiniz, tüm istatistikleri buradan takip edebilirsiniz.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <div className="rounded-full p-1.5 bg-green-50">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺152,318</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-xs font-medium text-green-500">%20.1</span>
              <span className="text-xs text-gray-500 ml-2">geçen aya göre</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kiralamalar</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium text-blue-500">+12</span>
              <span className="text-xs text-gray-500 ml-2">geçen haftaya göre</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Müşteriler</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,485</div>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium text-purple-500">+85</span>
              <span className="text-xs text-gray-500 ml-2">bu ay</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Araç Filosu</CardTitle>
            <Car className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium text-orange-500">3</span>
              <span className="text-xs text-gray-500 ml-2">bakımda</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Genel Bakış</CardTitle>
              <div className="flex items-center gap-4">
                <select className="text-sm border rounded-md px-2 py-1">
                  <option>Son 7 gün</option>
                  <option>Son 30 gün</option>
                  <option>Bu yıl</option>
                </select>
                <Button variant="outline" size="sm">
                  İndir
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Overview />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-blue-50">
                    <Car className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Yeni Kiralama</p>
                    <p className="text-xs text-gray-500">BMW X5 - Ahmet Yılmaz</p>
                  </div>
                  <span className="text-xs text-gray-500">5 dk önce</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Son Kiralamalar</CardTitle>
            <Button variant="ghost" size="sm">Tümünü Gör</Button>
          </CardHeader>
          <CardContent>
            <RecentBookings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Araç İstatistikleri</CardTitle>
            <Button variant="ghost" size="sm">Tümünü Gör</Button>
          </CardHeader>
          <CardContent>
            <CarStats />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

