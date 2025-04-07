"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const monthlyData = [
  { name: "Oca", yeni: 28, tekrar: 45, toplam: 73 },
  { name: "Şub", yeni: 32, tekrar: 48, toplam: 80 },
  { name: "Mar", yeni: 35, tekrar: 52, toplam: 87 },
  { name: "Nis", yeni: 30, tekrar: 50, toplam: 80 },
  { name: "May", yeni: 38, tekrar: 55, toplam: 93 },
  { name: "Haz", yeni: 42, tekrar: 60, toplam: 102 },
  { name: "Tem", yeni: 48, tekrar: 65, toplam: 113 },
  { name: "Ağu", yeni: 52, tekrar: 70, toplam: 122 },
  { name: "Eyl", yeni: 45, tekrar: 68, toplam: 113 },
  { name: "Eki", yeni: 40, tekrar: 62, toplam: 102 },
  { name: "Kas", yeni: 35, tekrar: 58, toplam: 93 },
  { name: "Ara", yeni: 32, tekrar: 55, toplam: 87 },
]

const customerSourceData = [
  { name: "Web Sitesi", value: 45 },
  { name: "Mobil Uygulama", value: 25 },
  { name: "Referans", value: 15 },
  { name: "Sosyal Medya", value: 10 },
  { name: "Diğer", value: 5 },
]

export function CustomerRegistrationChart() {
  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="yeni" stackId="1" stroke="#4f46e5" fill="#4f46e5" name="Yeni Müşteriler" />
            <Area
              type="monotone"
              dataKey="tekrar"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              name="Tekrar Eden Müşteriler"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-2">Müşteri Kaynakları</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={customerSourceData}
              layout="vertical"
              margin={{
                top: 20,
                right: 30,
                left: 80,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" name="Müşteri Sayısı" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-2">Aylık Müşteri Büyümesi</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="toplam" stroke="#f59e0b" strokeWidth={2} name="Toplam Müşteri" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

