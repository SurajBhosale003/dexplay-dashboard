"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Search, Filter, UserPlus, Mail, Phone, Star, TrendingUp } from "lucide-react"

interface MemberManagementProps {
  onAction: (action: string) => void
}

export function MemberManagement({ onAction }: MemberManagementProps) {
  const members = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      membershipType: "Premium",
      joinDate: "2024-01-15",
      totalBookings: 45,
      monthlySpend: 320,
      lastVisit: "2024-07-14",
      status: "active",
      favoriteCoach: "Sarah Johnson",
      favoriteCourt: "Tennis A",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 234-5678",
      membershipType: "Standard",
      joinDate: "2024-02-20",
      totalBookings: 32,
      monthlySpend: 180,
      lastVisit: "2024-07-13",
      status: "active",
      favoriteCoach: "Mike Chen",
      favoriteCourt: "Basketball",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 345-6789",
      membershipType: "Basic",
      joinDate: "2024-03-10",
      totalBookings: 18,
      monthlySpend: 95,
      lastVisit: "2024-07-10",
      status: "inactive",
      favoriteCoach: "Emma Wilson",
      favoriteCourt: "Badminton A",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      membershipType: "Premium",
      joinDate: "2024-01-05",
      totalBookings: 67,
      monthlySpend: 450,
      lastVisit: "2024-07-15",
      status: "active",
      favoriteCoach: "David Rodriguez",
      favoriteCourt: "Squash",
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  const membershipData = [
    { type: "Premium", count: 45, color: "#000000" },
    { type: "Standard", count: 78, color: "#D7ee34" },
    { type: "Basic", count: 123, color: "#666666" },
  ]

  const memberGrowthData = [
    { month: "Jan", newMembers: 15, totalMembers: 180 },
    { month: "Feb", newMembers: 23, totalMembers: 203 },
    { month: "Mar", newMembers: 18, totalMembers: 221 },
    { month: "Apr", newMembers: 31, totalMembers: 252 },
    { month: "May", newMembers: 27, totalMembers: 279 },
    { month: "Jun", newMembers: 35, totalMembers: 314 },
    { month: "Jul", newMembers: 42, totalMembers: 356 },
  ]

  const retentionData = [
    { period: "0-3 months", retention: 95 },
    { period: "3-6 months", retention: 87 },
    { period: "6-12 months", retention: 82 },
    { period: "1-2 years", retention: 78 },
    { period: "2+ years", retention: 85 },
  ]

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search members..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800" onClick={() => onAction("add-member")}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Member Analytics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
            <CardDescription>Members by subscription type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ type, count }) => `${type}: ${count}`}
                >
                  {membershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
            <CardDescription>New members and total growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <AreaChart data={memberGrowthData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Area type="monotone" dataKey="newMembers" stroke="#000000" fill="#D7ee34" fillOpacity={0.3} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Retention Rates</CardTitle>
            <CardDescription>Member retention by period</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <BarChart data={retentionData}>
                <XAxis dataKey="period" />
                <YAxis />
                <Bar dataKey="retention" fill="#000000" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card> */}
      </div>

      {/* Member List */}
      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>Manage your facility members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{member.name}</h3>
                          <Badge
                            className={
                              member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {member.status}
                          </Badge>
                          <Badge variant="outline">{member.membershipType}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {member.email}
                          </span>
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {member.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <p className="font-bold">{member.totalBookings}</p>
                          <p className="text-muted-foreground">Bookings</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold">${member.monthlySpend}</p>
                          <p className="text-muted-foreground">Monthly</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => onAction("member-profile")}>
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          style={{ backgroundColor: "#D7ee34" }}
                          className="text-white hover:opacity-90"
                          onClick={() => onAction("contact-member")}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Joined</p>
                        <p className="font-medium">{member.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Favorite Coach</p>
                        <p className="font-medium">{member.favoriteCoach}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Favorite Court</p>
                        <p className="font-medium">{member.favoriteCourt}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Members</CardTitle>
            <CardDescription>Members with highest engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Wilson", bookings: 67, revenue: 450, growth: "+15%" },
                { name: "John Smith", bookings: 45, revenue: 320, growth: "+8%" },
                { name: "Emily Davis", bookings: 32, revenue: 180, growth: "+12%" },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${member.revenue}</p>
                    <p className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {member.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Engagement</CardTitle>
            <CardDescription>Activity and participation metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Average Bookings/Month</span>
              <span className="font-bold">3.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Member Satisfaction</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-bold">4.7</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Referral Rate</span>
              <span className="font-bold">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Churn Rate</span>
              <span className="font-bold text-red-600">5.2%</span>
            </div>
            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => onAction("engagement-report")}
            >
              View Detailed Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
