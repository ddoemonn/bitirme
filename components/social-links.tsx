import { Facebook, Instagram, Twitter } from 'lucide-react'

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a href="#" className="hover:text-blue-600 transition-colors">
        <Facebook className="w-6 h-6" />
      </a>
      <a href="#" className="hover:text-pink-600 transition-colors">
        <Instagram className="w-6 h-6" />
      </a>
      <a href="#" className="hover:text-blue-400 transition-colors">
        <Twitter className="w-6 h-6" />
      </a>
    </div>
  )
}

