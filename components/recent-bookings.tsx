'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const recentBookings = [
  {
    id: 1,
    customer: 'Ahmet Y.',
    initials: 'AY',
    car: 'Toyota Corolla',
    date: '2 saat önce',
    amount: 250,
  },
  {
    id: 2,
    customer: 'Ayşe M.',
    initials: 'AM',
    car: 'Honda Civic',
    date: '5 saat önce',
    amount: 325,
  },
  {
    id: 3,
    customer: 'Mehmet R.',
    initials: 'MR',
    car: 'BMW 3 Serisi',
    date: '1 gün önce',
    amount: 450,
  },
]

export function RecentBookings() {
  return (
    <div className="space-y-8">
      {recentBookings.map((booking) => (
        <div key={booking.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{booking.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{booking.customer}</p>
            <p className="text-sm text-muted-foreground">
              {booking.car} - {booking.date}
            </p>
          </div>
          <div className="ml-auto font-medium">₺{booking.amount}</div>
        </div>
      ))}
    </div>
  )
}

