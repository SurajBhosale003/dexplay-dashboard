"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadialBarChart,
  RadialBar,
  Legend,
  Treemap,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Clock, Target } from "lucide-react"

export function AdvancedAnalytics() {
  // Revenue vs Bookings correlation data
  const revenueBookingData = [
    { month: "Jan", revenue: 12000, bookings: 145, efficiency: 82.8 },
    { month: "Feb", revenue: 15000, bookings: 178, efficiency: 84.3 },
    { month: "Mar", revenue: 11000, bookings: 132, efficiency: 83.3 },
    { month: "Apr", revenue: 18000, bookings: 210, efficiency: 85.7 },
    { month: "May", revenue: 16000, bookings: 195, efficiency: 82.1 },
    { month: "Jun", revenue: 20000, bookings: 235, efficiency: 85.1 },
    { month: "Jul", revenue: 22000, bookings: 258, efficiency: 85.3 },
  ]

  // Customer satisfaction scatter plot
  const satisfactionData = [
    { satisfaction: 4.8, retention: 92, bookings: 45, court: "Tennis A" },
    { satisfaction: 4.6, retention: 88, bookings: 38, court: "Tennis B" },
    { satisfaction: 4.9, retention: 95, bookings: 52, court: "Basketball" },
    { satisfaction: 4.4, retention: 82, bookings: 28, court: "Badminton A" },
    { satisfaction: 4.7, retention: 90, bookings: 35, court: "Badminton B" },
    { satisfaction: 4.3, retention: 78, bookings: 22, court: "Squash" },
  ]

  // Peak hours radial data
  const peakHoursData = [
    { hour: "6-8 AM", usage: 25, fill: "#000000" },
    { hour: "8-10 AM", usage: 45, fill: "#333333" },
    { hour: "10-12 PM", usage: 65, fill: "#666666" },
    { hour: "12-2 PM", usage: 80, fill: "#999999" },
    { hour: "2-4 PM", usage: 70, fill: "#D7ee34" },
    { hour: "4-6 PM", usage: 85, fill: "#B8D62F" },
    { hour: "6-8 PM", usage: 95, fill: "#9BC53D" },
    { hour: "8-10 PM", usage: 75, fill: "#7FB069" },
  ]

  // Court utilization treemap
  const courtTreemapData = [
    {
      name: "Tennis Courts",
      children: [
        { name: "Tennis A", size: 156, revenue: 7800 },
        { name: "Tennis B", size: 142, revenue: 7100 },
      ],
    },
    {
      name: "Indoor Courts",
      children: [
        { name: "Basketball", size: 98, revenue: 7840 },
        { name: "Badminton A", size: 134, revenue: 4690 },
        { name: "Badminton B", size: 121, revenue: 4235 },
        { name: "Squash", size: 87, revenue: 4350 },
      ],
    },
  ]

  // Performance metrics
  const performanceMetrics = [
    {
      title: "Revenue Growth",
      value: "+23.5%",
      change: "+4.2%",
      icon: TrendingUp,
      color: "text-green-600",
      trend: "up",
    },
    {
      title: "Customer Retention",
      value: "87.3%",
      change: "+2.1%",
      icon: Users,
      color: "text-blue-600",
      trend: "up",
    },
    {
      title: "Avg. Session Time",
      value: "1.8 hrs",
      change: "-0.2 hrs",
      icon: Clock,
      color: "text-orange-600",
      trend: "down",
    },
    {
      title: "Booking Conversion",
      value: "94.2%",
      change: "+1.8%",
      icon: Target,
      color: "text-purple-600",
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue vs Bookings Correlation */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Booking Correlation</CardTitle>
            <CardDescription>Monthly revenue trends with booking efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueBookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#000000" name="Revenue ($)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#D7ee34"
                    strokeWidth={3}
                    name="Efficiency %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Satisfaction Scatter */}
        <Card>
          <CardHeader>
            <CardTitle>Satisfaction vs Retention</CardTitle>
            <CardDescription>Court performance correlation analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="satisfaction" domain={[4.0, 5.0]} name="Satisfaction" />
                  <YAxis type="number" dataKey="retention" domain={[70, 100]} name="Retention %" />
                  <ChartTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded shadow">
                            <p className="font-medium">{data.court}</p>
                            <p>Satisfaction: {data.satisfaction}</p>
                            <p>Retention: {data.retention}%</p>
                            <p>Bookings: {data.bookings}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Scatter name="Courts" data={satisfactionData} fill="#D7ee34" />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Peak Hours Radial Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Distribution</CardTitle>
            <CardDescription>Usage intensity throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={peakHoursData}>
                  <RadialBar dataKey="usage" cornerRadius={10} fill="#D7ee34" />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Court Utilization Treemap */}
        <Card>
          <CardHeader>
            <CardTitle>Court Utilization Map</CardTitle>
            <CardDescription>Visual representation of court usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap data={courtTreemapData} dataKey="size" aspectRatio={4 / 3} stroke="#fff" fill="#D7ee34" />
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Live Court Status</CardTitle>
            <CardDescription>Real-time court availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { court: "Tennis A", status: "occupied", time: "45 min remaining", progress: 75 },
              { court: "Basketball", status: "available", time: "Ready now", progress: 0 },
              { court: "Badminton A", status: "maintenance", time: "30 min", progress: 60 },
              { court: "Tennis B", status: "occupied", time: "15 min remaining", progress: 90 },
            ].map((court, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{court.court}</span>
                  <Badge
                    className={
                      court.status === "available"
                        ? "bg-green-100 text-green-800"
                        : court.status === "occupied"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                    }
                  >
                    {court.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{court.time}</div>
                {court.progress > 0 && <Progress value={court.progress} className="h-2" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Highlights</CardTitle>
            <CardDescription>Key metrics for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Revenue</span>
              <span className="font-bold text-green-600">$1,245</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Bookings Made</span>
              <span className="font-bold">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Peak Hour</span>
              <span className="font-bold">6-8 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Utilization Rate</span>
              <span className="font-bold text-blue-600">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>New Members</span>
              <span className="font-bold text-purple-600">5</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full bg-black text-white hover:bg-gray-800">Emergency Court Close</Button>
            <Button className="w-full bg-transparent" variant="outline">
              Send Maintenance Alert
            </Button>
            <Button className="w-full text-white hover:opacity-90" style={{ backgroundColor: "#D7ee34" }}>
              Bulk Notification
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
