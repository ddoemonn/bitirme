"use client"

import {
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

const data = [
  { name: "Oca", ekonomi: 45, orta: 32, luks: 18, toplam: 95 },
  { name: "Şub", ekonomi: 52, orta: 38, luks: 22, toplam: 112 },
  { name: "Mar", ekonomi: 58, orta: 42, luks: 25, toplam: 125 },
  { name: "Nis", ekonomi: 50, orta: 36, luks: 20, toplam: 106 },
  { name: "May", ekonomi: 63, orta: 45, luks: 28, toplam: 136 },
  { name: "Haz", ekonomi: 72, orta: 52, luks: 32, toplam: 156 },
  { name: "Tem", ekonomi: 80, orta: 58, luks: 35, toplam: 173 },
  { name: "Ağu", ekonomi: 85, orta: 62, luks: 38, toplam: 185 },
  { name: "Eyl", ekonomi: 75, orta: 55, luks: 34, toplam: 164 },
  { name: "Eki", ekonomi: 68, orta: 48, luks: 30, toplam: 146 },
  { name: "Kas", ekonomi: 60, orta: 42, luks: 26, toplam: 128 },
  { name: "Ara", ekonomi: 55, orta: 38, luks: 24, toplam: 117 },
]

export function RentalCountChart() {
  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
            <Line
              type="monotone"
              dataKey="toplam"
              stroke="#4f46e5"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Toplam Kiralama"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[300px]">
        <h3 className="text-lg font-medium mb-2">Araç Kategorisine Göre Kiralama</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
            <Bar dataKey="ekonomi" name="Ekonomi" fill="#10b981" />
            <Bar dataKey="orta" name="Orta Sınıf" fill="#f59e0b" />
            <Bar dataKey="luks" name="Lüks" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

