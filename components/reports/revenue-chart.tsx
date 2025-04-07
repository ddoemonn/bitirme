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

const data = [
  { name: "Oca", gelir: 23000, gider: 18000, kar: 5000 },
  { name: "Şub", gelir: 32000, gider: 22000, kar: 10000 },
  { name: "Mar", gelir: 41000, gider: 25000, kar: 16000 },
  { name: "Nis", gelir: 38000, gider: 24000, kar: 14000 },
  { name: "May", gelir: 45000, gider: 28000, kar: 17000 },
  { name: "Haz", gelir: 52000, gider: 30000, kar: 22000 },
  { name: "Tem", gelir: 58000, gider: 32000, kar: 26000 },
  { name: "Ağu", gelir: 61000, gider: 35000, kar: 26000 },
  { name: "Eyl", gelir: 55000, gider: 33000, kar: 22000 },
  { name: "Eki", gelir: 48000, gider: 30000, kar: 18000 },
  { name: "Kas", gelir: 43000, gider: 28000, kar: 15000 },
  { name: "Ara", gelir: 39000, gider: 26000, kar: 13000 },
]

export function RevenueChart() {
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
            <YAxis tickFormatter={(value) => `₺${value / 1000}K`} />
            <Tooltip formatter={(value) => [`₺${value}`, ""]} />
            <Legend />
            <Line type="monotone" dataKey="gelir" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} name="Gelir" />
            <Line type="monotone" dataKey="gider" stroke="#ef4444" strokeWidth={2} name="Gider" />
            <Line type="monotone" dataKey="kar" stroke="#10b981" strokeWidth={2} name="Kar" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-2">Gelir/Gider Dağılımı</h3>
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
              <YAxis tickFormatter={(value) => `₺${value / 1000}K`} />
              <Tooltip formatter={(value) => [`₺${value}`, ""]} />
              <Legend />
              <Bar dataKey="gelir" name="Gelir" fill="#4f46e5" />
              <Bar dataKey="gider" name="Gider" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-2">Kar Trendi</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
              <YAxis tickFormatter={(value) => `₺${value / 1000}K`} />
              <Tooltip formatter={(value) => [`₺${value}`, ""]} />
              <Area type="monotone" dataKey="kar" name="Kar" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

