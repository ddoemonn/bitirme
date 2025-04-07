import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Users, 
  Settings,
  FileBarChart,
} from 'lucide-react'

async function getUser() {
  return { role: 'admin' }
}

const navItems = [
  { href: "/admin", label: "Kontrol Paneli", icon: LayoutDashboard },
  { href: "/admin/cars", label: "Araçlar", icon: Car },
  { href: "/admin/bookings", label: "Kiralamalar", icon: Calendar },
  { href: "/admin/customers", label: "Müşteriler", icon: Users },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  { href: "/admin/reports", label: "Raportlar", icon: FileBarChart}
]

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()
  
  if (user.role !== 'admin') {
    redirect('/')
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

