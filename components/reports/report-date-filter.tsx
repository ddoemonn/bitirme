"use client"

import { useState } from "react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export function ReportDateFilter() {
  const [dateRange, setDateRange] = useState<"1m" | "3m" | "6m" | "1y" | "custom">("1m")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const handleDateRangeChange = (value: string) => {
    const today = new Date()
    let start: Date | undefined

    switch (value) {
      case "1m":
        start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        break
      case "3m":
        start = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
        break
      case "6m":
        start = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())
        break
      case "1y":
        start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
        break
      case "custom":
        // Keep current dates for custom
        break
      default:
        start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    }

    if (value !== "custom") {
      setStartDate(start)
      setEndDate(today)
    }

    setDateRange(value as any)
  }

  const applyFilter = () => {
    console.log("Applying filter with date range:", { dateRange, startDate, endDate })
    // Here you would typically fetch data based on the selected date range
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="w-full md:w-[200px] space-y-2">
            <label htmlFor="date-range" className="text-sm font-medium">
              Tarih Aralığı
            </label>
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger id="date-range">
                <SelectValue placeholder="Tarih aralığı seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Son 1 Ay</SelectItem>
                <SelectItem value="3m">Son 3 Ay</SelectItem>
                <SelectItem value="6m">Son 6 Ay</SelectItem>
                <SelectItem value="1y">Son 1 Yıl</SelectItem>
                <SelectItem value="custom">Özel Aralık</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {dateRange === "custom" && (
            <>
              <div className="grid gap-2">
                <label htmlFor="start-date" className="text-sm font-medium">
                  Başlangıç Tarihi
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="start-date"
                      variant={"outline"}
                      className={cn(
                        "w-full md:w-[200px] justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <label htmlFor="end-date" className="text-sm font-medium">
                  Bitiş Tarihi
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="end-date"
                      variant={"outline"}
                      className={cn(
                        "w-full md:w-[200px] justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}

          <Button className="w-full md:w-auto" onClick={applyFilter}>
            Uygula
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

