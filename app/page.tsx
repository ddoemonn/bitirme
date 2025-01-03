import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Shield, Clock, MapPin, Phone } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2560&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Premium Araç Kiralama Deneyimi
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Lüks ve konfor arayanlar için özel seçilmiş araç filomuzla, 
              her yolculuğunuzu unutulmaz kılıyoruz.
            </p>
            <div className="mt-10 flex gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Hemen Rezervasyon Yap <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-black" asChild>
                <Link href="/admin">
                  Yönetim Paneli
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Size en iyi hizmeti sunmak için çalışıyoruz
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "7/24 Destek",
                description: "Her zaman yanınızdayız. İhtiyacınız olduğunda bize ulaşabilirsiniz.",
                icon: Clock,
              },
              {
                title: "Güvenli Kiralama",
                description: "Tam sigorta kapsamı ve şeffaf sözleşmelerle güvendeyiz.",
                icon: Shield,
              },
              {
                title: "Hızlı Teslimat",
                description: "İstediğiniz yere araç teslimatı yapıyoruz.",
                icon: CheckCircle2,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group rounded-2xl border p-8 hover:border-yellow-500 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Popüler Araçlarımız</h2>
            <p className="mt-4 text-lg text-gray-600">
              En çok tercih edilen araçlarımızı keşfedin
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "BMW X5",
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
                price: "₺1,500",
                type: "SUV",
              },
              {
                name: "Mercedes C200",
                image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2070&auto=format&fit=crop",
                price: "₺1,200",
                type: "Sedan",
              },
              {
                name: "Audi A6",
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
                price: "₺1,300",
                type: "Sedan",
              },
            ].map((car, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{car.name}</h3>
                  <p className="text-gray-600 mt-2">{car.type}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold">{car.price} <span className="text-sm text-gray-600">/ gün</span></span>
                    <Button>Hemen Kirala</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold">İletişime Geçin</h2>
              <p className="mt-4 text-lg text-gray-600">
                Size en uygun aracı birlikte seçelim
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-yellow-500" />
                  <span>İstanbul, Türkiye</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-yellow-500" />
                  <span>+90 (555) 123 45 67</span>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg">
                  Bize Ulaşın <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192698.6296691816!2d28.871754966965562!3d41.005495797764536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1648226528092!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

