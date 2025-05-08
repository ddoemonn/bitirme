'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Car } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // For demo purposes, we're using a hardcoded check
    // In a real app, you'd verify credentials with a backend
    if (username === 'admin' && password === 'password') {
      // Simulate backend delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Set login status in localStorage
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/admin')
    } else {
      setError('Geçersiz kullanıcı adı veya şifre')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-yellow-500 rounded-full mb-4">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Premium Araç Kiralama</h1>
          <p className="text-gray-500 mt-2">Yönetim paneline giriş yapın</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Giriş Yap</CardTitle>
            <CardDescription>
              Yönetici bilgilerinizle giriş yaparak sistemi yönetin
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input 
                  id="username"
                  placeholder="admin" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
              <div className="mt-4 text-center text-sm">
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                  Ana sayfaya dön
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
} 