'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Users, 
  Settings,
  FileBarChart,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: "/admin", label: "Kontrol Paneli", icon: LayoutDashboard },
  { href: "/admin/cars", label: "Araçlar", icon: Car },
  { href: "/admin/bookings", label: "Kiralamalar", icon: Calendar },
  { href: "/admin/customers", label: "Müşteriler", icon: Users },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  { href: "/admin/reports", label: "Raportlar", icon: FileBarChart}
]

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    // In a real app, this would verify a token or session
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-yellow-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-16 items-center border-b bg-white px-4 shadow-sm">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/admin" 
              className="font-semibold text-lg text-gray-900"
            >
              Yönetim Paneli
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Yönetici</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        <aside className="w-64 border-r bg-white min-h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:text-gray-900 hover:bg-gray-100"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

