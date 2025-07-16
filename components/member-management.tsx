"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Search, Filter, UserPlus, Mail, Phone, Star, TrendingUp, X, ChevronLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Member {
  id: number
  name: string
  email: string
  phone: string
  membershipType: string
  joinDate: string
  totalBookings: number
  monthlySpend: number
  lastVisit: string
  status: string
  favoriteCoach: string
  favoriteCourt: string
  image: string
  address?: string
  notes?: string
}

interface MemberManagementProps {
  onAction?: (action: string) => void
}

export function MemberManagement({ onAction }: MemberManagementProps) {
  const [view, setView] = useState<"list" | "profile" | "contact" | "report">("list")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMembership, setFilterMembership] = useState("all")
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState<Partial<Member>>({
    name: "",
    email: "",
    phone: "",
    membershipType: "Basic",
    status: "active"
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const members: Member[] = [
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=50&width=50",
      address: "123 Main St, Anytown, USA",
      notes: "Prefers morning sessions. Allergic to peanuts."
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=50&width=50",
      address: "456 Oak Ave, Somewhere, USA",
      notes: "Interested in personal training packages."
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=50&width=50",
      address: "789 Pine Rd, Nowhere, USA",
      notes: "Travels frequently. Best to contact via email."
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=50&width=50",
      address: "321 Elm Blvd, Anywhere, USA",
      notes: "VIP member. Referred 5 new members this year."
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

  const handleViewProfile = (member: Member) => {
    setSelectedMember(member)
    setView("profile")
  }

  const handleContactMember = (member: Member) => {
    setSelectedMember(member)
    setView("contact")
  }

  const handleViewReport = () => {
    setView("report")
  }

  const handleBackToList = () => {
    setView("list")
    setSelectedMember(null)
  }

  const handleAddMember = () => {
    setShowAddMember(true)
  }

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitNewMember = () => {
    // In a real app, you would send this to your API
    const addedMember = {
      ...newMember,
      id: Math.max(...members.map(m => m.id)) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      totalBookings: 0,
      monthlySpend: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      favoriteCoach: "None yet",
      favoriteCourt: "None yet",
      image: "/placeholder.svg?height=50&width=50"
    } as Member

    // Normally you would update your state here
    setShowSuccess(true)
    setSuccessMessage(`Member ${addedMember.name} added successfully!`)
    setShowAddMember(false)
    setNewMember({
      name: "",
      email: "",
      phone: "",
      membershipType: "Basic",
      status: "active"
    })

    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || member.status === filterStatus
    const matchesMembership = filterMembership === "all" || member.membershipType === filterMembership
    
    return matchesSearch && matchesStatus && matchesMembership
  })

  if (view === "profile" && selectedMember) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={handleBackToList} className="mb-4 bg-[#D7EE34] text-black hover:bg-white ">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Members
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedMember.image} alt={selectedMember.name} />
                <AvatarFallback>
                  {selectedMember.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedMember.name}</CardTitle>
                <CardDescription>
                  <Badge
                    className={
                      selectedMember.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {selectedMember.status}
                  </Badge>
                  <Badge variant="outline" className="ml-2">
                    {selectedMember.membershipType}
                  </Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><Mail className="inline w-4 h-4 mr-2" />{selectedMember.email}</p>
                    <p><Phone className="inline w-4 h-4 mr-2" />{selectedMember.phone}</p>
                    <p>{selectedMember.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-muted-foreground">Activity</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p>{selectedMember.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Visit</p>
                      <p>{selectedMember.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p>{selectedMember.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Spend</p>
                      <p>${selectedMember.monthlySpend}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">Preferences</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="text-muted-foreground">Favorite Coach:</span> {selectedMember.favoriteCoach}</p>
                    <p><span className="text-muted-foreground">Favorite Court:</span> {selectedMember.favoriteCourt}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-muted-foreground">Notes</h3>
                  <p className="mt-2">{selectedMember.notes || "No notes available."}</p>
                </div>

                <Button 
                  className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                  onClick={() => handleContactMember(selectedMember)}
                >
                  Contact Member
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (view === "contact" && selectedMember) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={handleBackToList} className="mb-4 bg-[#D7EE34] text-black hover:bg-white">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Members
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact {selectedMember.name}</CardTitle>
            <CardDescription>Choose how you'd like to contact this member</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-white hover:bg-[#D7EE34]">
                <Mail className="w-6 h-6 mb-2" />
                <span>Email</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-white hover:bg-[#D7EE34]">
                <Phone className="w-6 h-6 mb-2" />
                <span>Phone</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-white hover:bg-[#D7EE34]">
                <Mail className="w-6 h-6 mb-2" />
                <span>SMS</span>
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Send a Message</h3>
              <Textarea placeholder="Type your message here..." rows={4} />
              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Send Message</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (view === "report") {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={handleBackToList} className="mb-4 bg-white hover:bg-[#D7EE34]">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Members
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Member Engagement Report</CardTitle>
            <CardDescription>Detailed analytics on member participation and retention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Monthly Engagement</h3>
                <ChartContainer config={{}} className="h-[300px] w-full">
                  <AreaChart data={memberGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Area 
                      type="monotone" 
                      dataKey="newMembers" 
                      stroke="#000000" 
                      fill="#D7ee34" 
                      fillOpacity={0.3} 
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </AreaChart>
                </ChartContainer>
              </div>

              <div>
                <h3 className="font-medium mb-4">Retention Rates</h3>
                <ChartContainer config={{}} className="h-[300px] w-full">
                  <BarChart data={retentionData}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Bar dataKey="retention" fill="#000000" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ChartContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Tennis</span>
                        <span className="font-bold">42%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Swimming</span>
                        <span className="font-bold">28%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Gym</span>
                        <span className="font-bold">18%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Classes</span>
                        <span className="font-bold">12%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Peak Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Morning (6-10am)</span>
                        <span className="font-bold">35%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Lunch (11am-2pm)</span>
                        <span className="font-bold">15%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Afternoon (2-5pm)</span>
                        <span className="font-bold">20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Evening (5-9pm)</span>
                        <span className="font-bold">30%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Age 18-30</span>
                        <span className="font-bold">25%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Age 31-45</span>
                        <span className="font-bold">40%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Age 46-60</span>
                        <span className="font-bold">25%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Age 60+</span>
                        <span className="font-bold">10%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button 
                 className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                  onClick={() => {
                    setShowSuccess(true)
                    setSuccessMessage("Report submitted successfully!")
                    setTimeout(() => {
                      setShowSuccess(false)
                      handleBackToList()
                    }, 2000)
                  }}
                >
                  Submit Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
            <span>{successMessage}</span>
            <button 
              onClick={() => setShowSuccess(false)} 
              className="ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newMember.name}
                onChange={handleNewMemberChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newMember.email}
                onChange={handleNewMemberChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={newMember.phone}
                onChange={handleNewMemberChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="membershipType" className="text-right">
                Membership
              </Label>
              <Select
                value={newMember.membershipType}
                onValueChange={(value) => setNewMember(prev => ({ ...prev, membershipType: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select membership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={newMember.status}
                onValueChange={(value) => setNewMember(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddMember(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
              onClick={handleSubmitNewMember}
            >
              Add Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search members..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMembership} onValueChange={setFilterMembership}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Membership" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-black text-white hover:bg-[#D7EE34] hover:text-black" onClick={handleAddMember}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Member Analytics */}
      <div className="grid gap-2 md:grid-cols-2">
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
      </div>

      {/* Member List */}
      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>Manage your facility members</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No members found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.image} alt={member.name} />
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
                                member.status === "active" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-gray-100 text-gray-800"
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
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleViewProfile(member)}
                            className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                          >
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            style={{ backgroundColor: "#D7ee34" }}
                            className="text-black hover:opacity-90"
                            onClick={() => handleContactMember(member)}
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
          )}
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
              className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
              onClick={handleViewReport}
            >
              View Detailed Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}