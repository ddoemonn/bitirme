import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AdminNav() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-bold text-gray-800">
          Premium Araç Kiralama
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

