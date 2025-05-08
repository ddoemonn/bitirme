import { MapPin, Clock, Phone } from 'lucide-react'

export function ShopInfo() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
      <h3 className="font-bold text-xl">Contact Information</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <p>123 Car Street, City, Country</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-gray-600" />
          <p>+1 234 567 8900</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          Working Hours
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Monday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tuesday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Wednesday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Thursday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Friday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Saturday:</span>
            <span>10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sunday:</span>
            <span className="text-gray-500">Closed</span>
          </div>
        </div>
      </div>

    </div>
  )
}

