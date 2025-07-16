"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast as sonnerToast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, AreaChart, Area } from "recharts"
import { Calendar, Star, MessageSquare, Phone, X, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Toaster } from "@/components/ui/sonner"

interface CoachManagementProps {
  onAction?: (action: string) => void
}

export function CoachManagement({ onAction }: CoachManagementProps) {
  const [action, setAction] = useState<string | null>(null)
  const [selectedCoach, setSelectedCoach] = useState<any>(null)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [messageContent, setMessageContent] = useState("")
  const [date, setDate] = useState<Date>()
  const [newCoach, setNewCoach] = useState({
    name: "",
    specialty: "",
    experience: "",
    email: "",
    phone: "",
  })
  const [classForm, setClassForm] = useState({
    coach: "",
    type: "",
    date: "",
    time: "",
    duration: "",
    maxStudents: "",
  })
  const [payrollData, setPayrollData] = useState({
    period: "",
    paymentMethod: "Bank Transfer",
  })
  const [reviewData, setReviewData] = useState({
    coach: "",
    rating: "",
    comments: "",
  })

  const handleAction = (actionType: string, data?: any) => {
    setAction(actionType)
    if (data) {
      if (actionType === "message" || actionType === "schedule" || actionType === "call") {
        setSelectedCoach(data)
      } else if (actionType === "class-details") {
        setSelectedClass(data)
      }
    }
  }

  const showSuccessToast = (message: string) => {
    sonnerToast(
      <div className="flex items-center">
        <Check className="h-4 w-4 mr-2" />
        <span>Success: {message}</span>
      </div>
    )
  }

  const handleSendMessage = () => {
    // In a real app, you would send the message to the coach here
    console.log(`Message to ${selectedCoach.name}: ${messageContent}`)
    setMessageContent("")
    setAction(null)
    showSuccessToast(`Message sent to ${selectedCoach.name}`)
  }

  const handleAddCoach = () => {
    // In a real app, you would save the new coach data here
    console.log("Adding new coach:", newCoach)
    setNewCoach({
      name: "",
      specialty: "",
      experience: "",
      email: "",
      phone: "",
    })
    setAction(null)
    showSuccessToast(`Coach ${newCoach.name} added successfully`)
  }

  const handleScheduleSession = () => {
    // In a real app, you would save the session data here
    console.log("Scheduling session with:", selectedCoach.name)
    setAction(null)
    showSuccessToast(`Session scheduled with ${selectedCoach.name}`)
  }

  const handleScheduleClass = () => {
    // In a real app, you would save the class data here
    console.log("Scheduling class:", classForm)
    setClassForm({
      coach: "",
      type: "",
      date: "",
      time: "",
      duration: "",
      maxStudents: "",
    })
    setAction(null)
    showSuccessToast("Class scheduled successfully")
  }

  const handleProcessPayroll = () => {
    // In a real app, you would process payroll here
    console.log("Processing payroll:", payrollData)
    setPayrollData({
      period: "",
      paymentMethod: "Bank Transfer",
    })
    setAction(null)
    showSuccessToast("Payroll processed successfully")
  }

  const handleSubmitReview = () => {
    // In a real app, you would save the review data here
    console.log("Submitting review:", reviewData)
    setReviewData({
      coach: "",
      rating: "",
      comments: "",
    })
    setAction(null)
    showSuccessToast(`Performance review submitted for ${reviewData.coach}`)
  }

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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=100&width=100",
      nextClass: "10:00 AM - Tennis Basics",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=100&width=100",
      nextClass: "2:00 PM - Advanced Shooting",
      email: "mike.chen@example.com",
      phone: "+1 (555) 987-6543",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217662/People%20Profile/pm0476_w0_dfthen.avif?height=100&width=100",
      nextClass: "4:00 PM - Doubles Strategy",
      email: "emma.wilson@example.com",
      phone: "+1 (555) 456-7890",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=100&width=100",
      nextClass: "6:00 PM - Beginner Squash",
      email: "david.rodriguez@example.com",
      phone: "+1 (555) 789-0123",
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

  const upcomingClasses = [
    { time: "10:00 AM", class: "Tennis Basics", coach: "Sarah Johnson", students: 8, status: "confirmed" },
    { time: "2:00 PM", class: "Advanced Basketball", coach: "Mike Chen", students: 12, status: "confirmed" },
    { time: "4:00 PM", class: "Badminton Doubles", coach: "Emma Wilson", students: 6, status: "pending" },
    { time: "6:00 PM", class: "Beginner Squash", coach: "David Rodriguez", students: 4, status: "confirmed" },
  ]

  return (
    <div className="space-y-6">
      <Toaster />

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
                 className="bg-black text-white hover:bg-[#D7EE34] hover:text-black flex-1"
                  onClick={() => handleAction("schedule", coach)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAction("message", coach)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  style={{ backgroundColor: "#D7ee34" }}
                  className="text-black hover:opacity-90"
                  onClick={() => handleAction("call", coach)}
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
            {upcomingClasses.map((classItem, index) => (
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
                  <Button size="sm" variant="outline" onClick={() => handleAction("class-details", classItem)} className="bg-white hover:bg-[#D7EE34] text-black">
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
            <Button className="bg-[#D7ee34] text-black " onClick={() => handleAction("add-coach")}>
              Add New Coach
            </Button>
            <Button variant="outline" onClick={() => handleAction("schedule-class")}>
              Schedule Class
            </Button>
            <Button
              style={{ backgroundColor: "#D7ee34" }}
              className="text-black hover:opacity-90"
              onClick={() => handleAction("payroll")}
            >
              Process Payroll
            </Button>
            <Button variant="outline" onClick={() => handleAction("performance-review")}>
              Performance Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={action === "message"} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message to {selectedCoach?.name}</DialogTitle>
            <DialogDescription>
              Send a message to this coach. They'll receive it via email at {selectedCoach?.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message here..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage} className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={action === "schedule"} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule with {selectedCoach?.name}</DialogTitle>
            <DialogDescription>
              Schedule a new session with {selectedCoach?.name}, {selectedCoach?.specialty} coach.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sessionType">Session Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private Lesson</SelectItem>
                  <SelectItem value="group">Group Class</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="training">Training Session</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="60" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleSession} className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Schedule Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Class Details Dialog */}
      <Dialog open={action === "class-details"} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedClass?.class} Details</DialogTitle>
            <DialogDescription>
              {selectedClass?.time} with Coach {selectedClass?.coach}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Class Information</Label>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{selectedClass?.time}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Coach:</span>
                  <span>{selectedClass?.coach}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Students:</span>
                  <span>{selectedClass?.students} enrolled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    className={
                      selectedClass?.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }
                  >
                    {selectedClass?.status}
                  </Badge>
                </div>
              </div>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this class..."
                rows={3}
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Coach Dialog */}
      <Dialog open={action === "add-coach"} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Coach</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new coach to your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newCoach.name}
                onChange={(e) => setNewCoach({...newCoach, name: e.target.value})}
                placeholder="Coach's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                value={newCoach.specialty}
                onChange={(e) => setNewCoach({...newCoach, specialty: e.target.value})}
                placeholder="e.g., Tennis, Basketball"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                value={newCoach.experience}
                onChange={(e) => setNewCoach({...newCoach, experience: e.target.value})}
                placeholder="e.g., 5 years"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCoach.email}
                  onChange={(e) => setNewCoach({...newCoach, email: e.target.value})}
                  placeholder="coach@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newCoach.phone}
                  onChange={(e) => setNewCoach({...newCoach, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button onClick={handleAddCoach} className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Add Coach</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Class Dialog */}
      <Dialog open={action === "schedule-class"} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Class</DialogTitle>
            <DialogDescription>
              Create a new class session with one of your coaches.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="coach">Coach</Label>
              <Select
                value={classForm.coach}
                onValueChange={(value) => setClassForm({...classForm, coach: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a coach" />
                </SelectTrigger>
                <SelectContent>
                  {coaches.map((coach) => (
                    <SelectItem key={coach.id} value={coach.name}>
                      {coach.name} ({coach.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Class Type</Label>
              <Select
                value={classForm.type}
                onValueChange={(value) => setClassForm({...classForm, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private Lesson</SelectItem>
                  <SelectItem value="group">Group Class</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="training">Training Session</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <div className="grid grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input type="time" value={classForm.time} onChange={(e) => setClassForm({...classForm, time: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={classForm.duration}
                  onChange={(e) => setClassForm({...classForm, duration: e.target.value})}
                  placeholder="60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Max Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={classForm.maxStudents}
                  onChange={(e) => setClassForm({...classForm, maxStudents: e.target.value})}
                  placeholder="10"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleClass} className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Schedule Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Process Payroll Dialog */}
      <Dialog open={action === "payroll"} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Payroll</DialogTitle>
            <DialogDescription>
              Run payroll for your coaching staff.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="period">Pay Period</Label>
              <Select
                value={payrollData.period}
                onValueChange={(value) => setPayrollData({...payrollData, period: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pay period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={payrollData.paymentMethod}
                onValueChange={(value) => setPayrollData({...payrollData, paymentMethod: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                  <SelectItem value="Direct Deposit">Direct Deposit</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Coaches Included</Label>
              <div className="border rounded-lg p-4">
                {coaches.map((coach) => (
                  <div key={coach.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id={`coach-${coach.id}`} className="h-4 w-4" defaultChecked />
                      <label htmlFor={`coach-${coach.id}`}>{coach.name}</label>
                    </div>
                    <span>${coach.monthlyEarnings}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 mt-2 border-t">
                  <span>Total</span>
                  <span>${coaches.reduce((sum, coach) => sum + coach.monthlyEarnings, 0)}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button onClick={handleProcessPayroll} className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Process Payroll</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Performance Review Dialog */}
      <Dialog open={action === "performance-review"} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coach Performance Review</DialogTitle>
            <DialogDescription>
              Submit a performance review for one of your coaches.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reviewCoach">Coach</Label>
              <Select
                value={reviewData.coach}
                onValueChange={(value) => setReviewData({...reviewData, coach: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a coach" />
                </SelectTrigger>
                <SelectContent>
                  {coaches.map((coach) => (
                    <SelectItem key={coach.id} value={coach.name}>
                      {coach.name} ({coach.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Select
                value={reviewData.rating}
                onValueChange={(value) => setReviewData({...reviewData, rating: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                  <SelectItem value="4">4 - Very Good</SelectItem>
                  <SelectItem value="3">3 - Good</SelectItem>
                  <SelectItem value="2">2 - Needs Improvement</SelectItem>
                  <SelectItem value="1">1 - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={reviewData.comments}
                onChange={(e) => setReviewData({...reviewData, comments: e.target.value})}
                placeholder="Provide detailed feedback..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReview} className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}