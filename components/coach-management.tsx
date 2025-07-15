"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, AreaChart, Area } from "recharts"
import { Calendar, Star, MessageSquare, Phone } from "lucide-react"

interface CoachManagementProps {
  onAction: (action: string) => void
}

export function CoachManagement({ onAction }: CoachManagementProps) {
  const coaches = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Tennis",
      rating: 4.9,
      experience: "8 years",
      activeClasses: 12,
      totalStudents: 45,
      monthlyEarnings: 3200,
      availability: "Available",
      image: "/placeholder.svg?height=100&width=100",
      nextClass: "10:00 AM - Tennis Basics",
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Basketball",
      rating: 4.8,
      experience: "6 years",
      activeClasses: 8,
      totalStudents: 32,
      monthlyEarnings: 2800,
      availability: "Busy",
      image: "/placeholder.svg?height=100&width=100",
      nextClass: "2:00 PM - Advanced Shooting",
    },
    {
      id: 3,
      name: "Emma Wilson",
      specialty: "Badminton",
      rating: 4.7,
      experience: "5 years",
      activeClasses: 10,
      totalStudents: 38,
      monthlyEarnings: 2600,
      availability: "Available",
      image: "/placeholder.svg?height=100&width=100",
      nextClass: "4:00 PM - Doubles Strategy",
    },
    {
      id: 4,
      name: "David Rodriguez",
      specialty: "Squash",
      rating: 4.6,
      experience: "7 years",
      activeClasses: 6,
      totalStudents: 24,
      monthlyEarnings: 2200,
      availability: "Available",
      image: "/placeholder.svg?height=100&width=100",
      nextClass: "6:00 PM - Beginner Squash",
    },
  ]

  const attendanceData = [
    { week: "Week 1", attendance: 85 },
    { week: "Week 2", attendance: 92 },
    { week: "Week 3", attendance: 78 },
    { week: "Week 4", attendance: 88 },
    { week: "Week 5", attendance: 95 },
    { week: "Week 6", attendance: 82 },
    { week: "Week 7", attendance: 90 },
  ]

  const coachPerformanceData = coaches.map((coach) => ({
    name: coach.name.split(" ")[0],
    students: coach.totalStudents,
    earnings: coach.monthlyEarnings / 100,
    rating: coach.rating * 20,
  }))

  const classScheduleData = [
    { time: "8AM", classes: 2 },
    { time: "10AM", classes: 4 },
    { time: "12PM", classes: 3 },
    { time: "2PM", classes: 5 },
    { time: "4PM", classes: 6 },
    { time: "6PM", classes: 8 },
    { time: "8PM", classes: 4 },
  ]

  return (
    <div className="space-y-6">
      {/* Coach Analytics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>Average class attendance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px]">
              <LineChart data={attendanceData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{ fill: "#D7ee34", strokeWidth: 2, r: 4 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coach Performance</CardTitle>
            <CardDescription>Students, earnings, and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px]">
              <BarChart data={coachPerformanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="students" fill="#000000" />
                <Bar dataKey="earnings" fill="#D7ee34" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Schedule Distribution</CardTitle>
            <CardDescription>Classes throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px]">
              <AreaChart data={classScheduleData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Area type="monotone" dataKey="classes" stroke="#000000" fill="#D7ee34" fillOpacity={0.3} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Coach Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {coaches.map((coach) => (
          <Card key={coach.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={coach.image || "/placeholder.svg"} alt={coach.name} />
                  <AvatarFallback>
                    {coach.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <Badge
                      className={
                        coach.availability === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {coach.availability}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-4">
                    <span>{coach.specialty} Coach</span>
                    <span>•</span>
                    <span>{coach.experience}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{coach.rating}</span>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{coach.activeClasses}</p>
                  <p className="text-sm text-muted-foreground">Active Classes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{coach.totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">${coach.monthlyEarnings}</p>
                  <p className="text-sm text-muted-foreground">Monthly</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Next Class:</span>
                  <span className="font-medium">{coach.nextClass}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  onClick={() => onAction("schedule")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline" onClick={() => onAction("message")}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  style={{ backgroundColor: "#D7ee34" }}
                  className="text-white hover:opacity-90"
                  onClick={() => onAction("call")}
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Class Management */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Classes</CardTitle>
          <CardDescription>Today's scheduled classes and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "10:00 AM", class: "Tennis Basics", coach: "Sarah Johnson", students: 8, status: "confirmed" },
              { time: "2:00 PM", class: "Advanced Basketball", coach: "Mike Chen", students: 12, status: "confirmed" },
              { time: "4:00 PM", class: "Badminton Doubles", coach: "Emma Wilson", students: 6, status: "pending" },
              { time: "6:00 PM", class: "Beginner Squash", coach: "David Rodriguez", students: 4, status: "confirmed" },
            ].map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="font-medium">{classItem.time}</p>
                  </div>
                  <div>
                    <p className="font-medium">{classItem.class}</p>
                    <p className="text-sm text-muted-foreground">
                      Coach: {classItem.coach} • {classItem.students} students
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={
                      classItem.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                    }
                  >
                    {classItem.status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => onAction("class-details")}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Coach Management Actions</CardTitle>
          <CardDescription>Quick actions for coach management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => onAction("add-coach")}>
              Add New Coach
            </Button>
            <Button variant="outline" onClick={() => onAction("schedule-class")}>
              Schedule Class
            </Button>
            <Button
              style={{ backgroundColor: "#D7ee34" }}
              className="text-white hover:opacity-90"
              onClick={() => onAction("payroll")}
            >
              Process Payroll
            </Button>
            <Button variant="outline" onClick={() => onAction("performance-review")}>
              Performance Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
