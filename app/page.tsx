"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign, Users, Clock, Trophy, Activity } from "lucide-react"

// Import dashboard components
import { OverviewCharts } from "@/components/overview-charts"
import { CourtManagement } from "@/components/court-management"
import { CoachManagement } from "@/components/coach-management"
import { CompetitionSection } from "@/components/competition-section"
import { ActionModals } from "@/components/action-modals"
import { AdvancedAnalytics } from "@/components/advanced-analytics"
import { MemberManagement } from "@/components/member-management"

export default function SportsDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showModal, setShowModal] = useState<string | null>(null)

  // Dummy stats data
  const stats = [
    {
      title: "Total Earnings",
      value: "$45,231",
      change: "+20.1%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Bookings",
      value: "2,350",
      change: "+180.1%",
      icon: CalendarDays,
      color: "text-blue-600",
    },
    {
      title: "Active Members",
      value: "1,234",
      change: "+19%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Court Utilization",
      value: "87%",
      change: "+12%",
      icon: Activity,
      color: "text-orange-600",
    },
  ]

  const recentBookings = [
    {
      id: "1",
      court: "Tennis Court A",
      player: "John Doe",
      time: "10:00 AM - 11:00 AM",
      status: "confirmed",
      amount: "$50",
    },
    {
      id: "2",
      court: "Basketball Court",
      player: "Jane Smith",
      time: "2:00 PM - 4:00 PM",
      status: "pending",
      amount: "$80",
    },
    {
      id: "3",
      court: "Badminton Court B",
      player: "Mike Johnson",
      time: "6:00 PM - 7:00 PM",
      status: "confirmed",
      amount: "$35",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">SportsCourt Pro</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Today
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="courts">Courts</TabsTrigger>
            <TabsTrigger value="coaches">Coaches</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <OverviewCharts />
              </div>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest court reservations and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{booking.court}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.player} • {booking.time}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className={booking.status === "confirmed" ? "bg-green-100 text-green-800" : ""}
                          >
                            {booking.status}
                          </Badge>
                          <span className="text-sm font-medium">{booking.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-4 bg-black text-white hover:bg-gray-800"
                    onClick={() => setShowModal("bookings")}
                  >
                    View All Bookings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="courts">
            <CourtManagement onAction={setShowModal} />
          </TabsContent>

          <TabsContent value="coaches">
            <CoachManagement onAction={setShowModal} />
          </TabsContent>

          <TabsContent value="members">
            <MemberManagement onAction={setShowModal} />
          </TabsContent>

          <TabsContent value="competitions">
            <CompetitionSection onAction={setShowModal} />
          </TabsContent>
        </Tabs>
      </div>

      <ActionModals activeModal={showModal} onClose={() => setShowModal(null)} />
    </div>
  )
}
