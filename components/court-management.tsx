"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { MapPin, Clock, DollarSign, Settings, Star } from "lucide-react"

interface CourtManagementProps {
  onAction: (action: string) => void
}

export function CourtManagement({ onAction }: CourtManagementProps) {
  const courts = [
    {
      id: 1,
      name: "Tennis Court A",
      type: "Tennis",
      status: "active",
      utilization: 85,
      todayBookings: 8,
      revenue: 400,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Basketball Court",
      type: "Basketball",
      status: "active",
      utilization: 92,
      todayBookings: 6,
      revenue: 480,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Badminton Court A",
      type: "Badminton",
      status: "maintenance",
      utilization: 0,
      todayBookings: 0,
      revenue: 0,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Badminton Court B",
      type: "Badminton",
      status: "active",
      utilization: 78,
      todayBookings: 7,
      revenue: 245,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Squash Court",
      type: "Squash",
      status: "active",
      utilization: 65,
      todayBookings: 5,
      revenue: 250,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Tennis Court B",
      type: "Tennis",
      status: "active",
      utilization: 88,
      todayBookings: 9,
      revenue: 450,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const courtTypeData = [
    { name: "Tennis", count: 2, color: "#000000" },
    { name: "Badminton", count: 2, color: "#D7ee34" },
    { name: "Basketball", count: 1, color: "#666666" },
    { name: "Squash", count: 1, color: "#999999" },
  ]

  const utilizationData = courts.map((court) => ({
    name: court.name.split(" ").slice(0, 2).join(" "),
    utilization: court.utilization,
    revenue: court.revenue,
  }))

  return (
    <div className="space-y-6 items-center">
      {/* Court Analytics */}
      <div className="grid gap-2 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Court Type Distribution</CardTitle>
            <CardDescription>Distribution of different court types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px]">
              <PieChart>
                <Pie
                  data={courtTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ name, count }) => `${name}: ${count}`}
                >
                  {courtTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Court Utilization vs Revenue</CardTitle>
            <CardDescription>Performance comparison across courts</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px]">
              <BarChart data={utilizationData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="utilization" fill="#000000" />
                <Bar dataKey="revenue" fill="#D7ee34" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card> */}
      </div>

      {/* Court Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courts.map((court) => (
          <Card key={court.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={court.image || "/placeholder.svg"} alt={court.name} className="w-full h-full object-cover" />
              <Badge
                className={`absolute top-2 right-2 ${
                  court.status === "active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                }`}
              >
                {court.status}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{court.name}</CardTitle>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{court.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{court.type} Court</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Utilization</span>
                  <span>{court.utilization}%</span>
                </div>
                <Progress value={court.utilization} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{court.todayBookings}</p>
                    <p className="text-muted-foreground">Today's Bookings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">${court.revenue}</p>
                    <p className="text-muted-foreground">Today's Revenue</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  onClick={() => onAction("booking")}
                >
                  Book Now
                </Button>
                <Button size="sm" variant="outline" onClick={() => onAction("settings")}>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your courts efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => onAction("add-court")}>
              Add New Court
            </Button>
            <Button variant="outline" onClick={() => onAction("maintenance")}>
              Schedule Maintenance
            </Button>
            <Button
              style={{ backgroundColor: "#D7ee34" }}
              className="text-white hover:opacity-90"
              onClick={() => onAction("bulk-booking")}
            >
              Bulk Booking
            </Button>
            <Button variant="outline" onClick={() => onAction("reports")}>
              Generate Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
