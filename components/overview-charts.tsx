"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts"

export function OverviewCharts() {
  const [bookingPeriod, setBookingPeriod] = useState<"daily" | "monthly" | "yearly">("daily")

  // Radar chart data for court performance
  const courtPerformanceData = [
    { metric: "Utilization", value: 85, fullMark: 100 },
    { metric: "Revenue", value: 92, fullMark: 100 },
    { metric: "Satisfaction", value: 78, fullMark: 100 },
    { metric: "Maintenance", value: 88, fullMark: 100 },
    { metric: "Booking Rate", value: 95, fullMark: 100 },
    { metric: "Peak Usage", value: 82, fullMark: 100 },
  ]

  // Age group pie chart data
  const ageGroupData = [
    { name: "18-25", value: 30, color: "#000000" },
    { name: "26-35", value: 35, color: "#D7ee34" },
    { name: "36-45", value: 20, color: "#666666" },
    { name: "46-55", value: 10, color: "#999999" },
    { name: "55+", value: 5, color: "#cccccc" },
  ]

  // Sports-wise booking data
  const sportsBookingData = [
    { sport: "Tennis", bookings: 298, percentage: 35, color: "#000000" },
    { sport: "Basketball", bookings: 234, percentage: 28, color: "#D7ee34" },
    { sport: "Badminton", bookings: 189, percentage: 22, color: "#666666" },
    { sport: "Squash", bookings: 125, percentage: 15, color: "#999999" },
  ]

  // Booking data based on selected period
  const bookingData = {
    daily: [
      { period: "Mon", bookings: 45, revenue: 2250 },
      { period: "Tue", bookings: 52, revenue: 2600 },
      { period: "Wed", bookings: 48, revenue: 2400 },
      { period: "Thu", bookings: 61, revenue: 3050 },
      { period: "Fri", bookings: 75, revenue: 3750 },
      { period: "Sat", bookings: 88, revenue: 4400 },
      { period: "Sun", bookings: 82, revenue: 4100 },
    ],
    monthly: [
      { period: "Jan", bookings: 1245, revenue: 62250 },
      { period: "Feb", bookings: 1356, revenue: 67800 },
      { period: "Mar", bookings: 1189, revenue: 59450 },
      { period: "Apr", bookings: 1467, revenue: 73350 },
      { period: "May", bookings: 1523, revenue: 76150 },
      { period: "Jun", bookings: 1678, revenue: 83900 },
      { period: "Jul", bookings: 1789, revenue: 89450 },
    ],
    yearly: [
      { period: "2020", bookings: 12450, revenue: 622500 },
      { period: "2021", bookings: 15670, revenue: 783500 },
      { period: "2022", bookings: 18920, revenue: 946000 },
      { period: "2023", bookings: 21340, revenue: 1067000 },
      { period: "2024", bookings: 24680, revenue: 1234000 },
    ],
  }

  // Rush hour data
  const rushHourData = [
    { time: "6AM", usage: 20 },
    { time: "8AM", usage: 45 },
    { time: "10AM", usage: 65 },
    { time: "12PM", usage: 80 },
    { time: "2PM", usage: 70 },
    { time: "4PM", usage: 85 },
    { time: "6PM", usage: 95 },
    { time: "8PM", usage: 90 },
    { time: "10PM", usage: 60 },
  ]

  // Court popularity data
  const courtPopularityData = [
    { court: "Tennis A", bookings: 156, revenue: 7800 },
    { court: "Tennis B", bookings: 142, revenue: 7100 },
    { court: "Basketball", bookings: 98, revenue: 7840 },
    { court: "Badminton A", bookings: 134, revenue: 4690 },
    { court: "Badminton B", bookings: 121, revenue: 4235 },
    { court: "Squash", bookings: 87, revenue: 4350 },
  ]

  const chartConfig = {
    utilization: {
      label: "Utilization",
      color: "#000000",
    },
    revenue: {
      label: "Revenue",
      color: "#D7ee34",
    },
    satisfaction: {
      label: "Satisfaction",
      color: "#666666",
    },
    maintenance: {
      label: "Maintenance",
      color: "#999999",
    },
    bookingRate: {
      label: "Booking Rate",
      color: "#333333",
    },
    peakUsage: {
      label: "Peak Usage",
      color: "#555555",
    },
  }

  return (
    <div className="space-y-6">
      {/* First Row - Court Performance and Member Age Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Radar Chart - Court Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Court Performance Metrics</CardTitle>
            <CardDescription>Overall performance across all courts</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={courtPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#000000"
                    fill="#D7ee34"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    dot={{ fill: "#000000", strokeWidth: 2, r: 4 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Age Groups */}
        <Card>
          <CardHeader>
            <CardTitle>Member Age Distribution</CardTitle>
            <CardDescription>Age groups of active members</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <Pie
                    data={ageGroupData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {ageGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Sports-wise Booking Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sports Popularity</CardTitle>
            <CardDescription>Which sports are played most frequently</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sportsBookingData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="sport" />
                  <YAxis />
                  <Bar dataKey="bookings" fill="#000000" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sports Distribution</CardTitle>
            <CardDescription>Percentage breakdown of sport bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <Pie
                    data={sportsBookingData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="bookings"
                    label={({ sport, percentage }) => `${sport} ${percentage}%`}
                  >
                    {sportsBookingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Third Row - Booking Trends with Period Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Booking Trends</CardTitle>
              <CardDescription>Bookings and revenue over time</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={bookingPeriod === "daily" ? "default" : "outline"}
                onClick={() => setBookingPeriod("daily")}
                className={bookingPeriod === "daily" ? "bg-black text-white" : ""}
              >
                Daily
              </Button>
              <Button
                size="sm"
                variant={bookingPeriod === "monthly" ? "default" : "outline"}
                onClick={() => setBookingPeriod("monthly")}
                className={bookingPeriod === "monthly" ? "bg-black text-white" : ""}
              >
                Monthly
              </Button>
              <Button
                size="sm"
                variant={bookingPeriod === "yearly" ? "default" : "outline"}
                onClick={() => setBookingPeriod("yearly")}
                className={bookingPeriod === "yearly" ? "bg-black text-white" : ""}
              >
                Yearly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData[bookingPeriod]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Bar yAxisId="left" dataKey="bookings" fill="#000000" name="Bookings" />
                <Bar yAxisId="right" dataKey="revenue" fill="#D7ee34" name="Revenue ($)" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Fourth Row - Rush Hour Analysis */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Rush Hour Analysis</CardTitle>
          <CardDescription>Court usage throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rushHourData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis dataKey="time" />
                <YAxis />
                <Area type="monotone" dataKey="usage" stroke="#000000" fill="#D7ee34" fillOpacity={0.3} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card> */}

      {/* Fifth Row - Court Popularity Chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Court Popularity & Revenue</CardTitle>
          <CardDescription>Performance comparison across different courts</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courtPopularityData}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="court" type="category" width={80} />
                <Bar dataKey="bookings" fill="#000000" name="Bookings" />
                <Bar dataKey="revenue" fill="#D7ee34" name="Revenue ($)" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card> */}
    </div>
  )
}
