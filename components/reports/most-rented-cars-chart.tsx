"use client"

import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const carTypeData = [
  { name: "Ekonomi", value: 45 },
  { name: "Orta Sınıf", value: 30 },
  { name: "Lüks", value: 15 },
  { name: "SUV", value: 10 },
]

const carModelData = [
  { name: "Toyota Corolla", value: 120 },
  { name: "Honda Civic", value: 105 },
  { name: "Volkswagen Passat", value: 90 },
  { name: "BMW 3 Serisi", value: 75 },
  { name: "Mercedes C-Class", value: 70 },
  { name: "Audi A4", value: 65 },
  { name: "Ford Focus", value: 60 },
  { name: "Hyundai Tucson", value: 55 },
]

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"]

export function MostRentedCarsChart() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[400px]">
          <h3 className="text-lg font-medium mb-2">Araç Kategorisi Dağılımı</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={carTypeData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {carTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} kiralama`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[400px]">
          <h3 className="text-lg font-medium mb-2">En Çok Kiralanan Araçlar</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={carModelData}
              layout="vertical"
              margin={{
                top: 20,
                right: 30,
                left: 100,
                bottom: 5,
              }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value) => [`${value} kiralama`, "Kiralama Sayısı"]} />
              <Bar dataKey="value" name="Kiralama Sayısı">
                {carModelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="h-[300px]">
        <h3 className="text-lg font-medium mb-2">Araç Doluluk Oranları</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { name: "Ekonomi", doluluk: 85 },
              { name: "Orta Sınıf", doluluk: 75 },
              { name: "Lüks", doluluk: 60 },
              { name: "SUV", doluluk: 70 },
            ]}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, "Doluluk Oranı"]} />
            <Bar dataKey="doluluk" name="Doluluk Oranı" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

