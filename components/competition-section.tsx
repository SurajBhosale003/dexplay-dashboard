"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { Trophy, Calendar, Users, MapPin, Award, X, Check, Info } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CompetitionSectionProps {
  onAction?: (action: string) => void
}

export function CompetitionSection({ onAction }: CompetitionSectionProps) {
  const [activeForm, setActiveForm] = useState<string | null>(null)
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [notification, setNotification] = useState<{ show: boolean; message: string; isSuccess: boolean }>({ show: false, message: "", isSuccess: false })
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState<any>({
    tournamentName: "",
    sport: "",
    startDate: "",
    endDate: "",
    venue: "",
    maxParticipants: "",
    registrationFee: "",
    prizePool: "",
    description: "",
    matchDate: "",
    matchTime: "",
    matchVenue: "",
    player1: "",
    player2: "",
    winner: "",
    runnerUp: "",
    name: "",
    email: "",
    phone: "",
    team: "",
  })

  const competitions = [
    {
      id: 1,
      name: "Summer Tennis Championship",
      sport: "Tennis",
      status: "upcoming",
      date: "2024-08-15",
      participants: 32,
      prizePool: 5000,
      registrationFee: 50,
      venue: "Tennis Court A & B",
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131762/dexciss%20site/dexplay/optimal/400/tennis_x400/pexels-jim-de-ramos-395808-1277397_x400_qfb2it.jpg?height=200&width=300",
      description: "Annual summer tennis championship open to all club members. Singles matches with elimination brackets.",
      rules: "Best of 3 sets. Tie-break at 6-6. Must wear proper tennis attire.",
      organizer: "Tennis Club Committee",
      contact: "tennis@club.com",
    },
    {
      id: 2,
      name: "Basketball 3v3 Tournament",
      sport: "Basketball",
      status: "ongoing",
      date: "2024-07-20",
      participants: 24,
      prizePool: 3000,
      registrationFee: 75,
      venue: "Basketball Court",
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131782/dexciss%20site/dexplay/optimal/400/basketball_x400/pexels-pixabay-71103_x400_l328oj.jpg?height=200&width=300",
      description: "Fast-paced 3v3 basketball tournament. Teams must register together.",
      rules: "Games to 21 points or 15 minutes. 2-point and 3-point shots count.",
      organizer: "Sports Department",
      contact: "sports@club.com",
    },
    {
      id: 3,
      name: "Badminton Doubles Cup",
      sport: "Badminton",
      status: "completed",
      date: "2024-07-10",
      participants: 16,
      prizePool: 2000,
      registrationFee: 40,
      venue: "Badminton Courts",
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131810/dexciss%20site/dexplay/optimal/400/badminton_x400/pexels-leozhao-5767580_x400_lw38l0.jpg?height=200&width=300",
      description: "Doubles badminton tournament. You can register with a partner or be assigned one.",
      rules: "Best of 3 games to 21 points. Must provide own rackets.",
      organizer: "Badminton Association",
      contact: "badminton@club.com",
    },
  ]

  const leaderboard = [
    {
      rank: 1,
      name: "Alex Thompson",
      sport: "Tennis",
      points: 2450,
      wins: 15,
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40",
    },
    {
      rank: 2,
      name: "Maria Garcia",
      sport: "Basketball",
      points: 2380,
      wins: 14,
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40",
    },
    {
      rank: 3,
      name: "John Smith",
      sport: "Badminton",
      points: 2320,
      wins: 13,
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=40&width=40",
    },
    {
      rank: 4,
      name: "Lisa Wang",
      sport: "Tennis",
      points: 2280,
      wins: 12,
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40",
    },
    {
      rank: 5,
      name: "David Brown",
      sport: "Squash",
      points: 2240,
      wins: 11,
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=40&width=40",
    },
  ]

  const participationData = [
    { sport: "Tennis", participants: 45, color: "#000000" },
    { sport: "Basketball", participants: 32, color: "#D7ee34" },
    { sport: "Badminton", participants: 28, color: "#666666" },
    { sport: "Squash", participants: 18, color: "#999999" },
  ]

  const monthlyCompetitions = [
    { month: "Jan", competitions: 3, participants: 85 },
    { month: "Feb", competitions: 4, participants: 102 },
    { month: "Mar", competitions: 2, participants: 68 },
    { month: "Apr", competitions: 5, participants: 125 },
    { month: "May", competitions: 3, participants: 89 },
    { month: "Jun", competitions: 4, participants: 110 },
    { month: "Jul", competitions: 6, participants: 145 },
  ]

  const players = [
    { id: 1, name: "Alex Thompson", sport: "Tennis", ranking: 1 },
    { id: 2, name: "Maria Garcia", sport: "Basketball", ranking: 2 },
    { id: 3, name: "John Smith", sport: "Badminton", ranking: 3 },
    { id: 4, name: "Lisa Wang", sport: "Tennis", ranking: 4 },
    { id: 5, name: "David Brown", sport: "Squash", ranking: 5 },
  ]

  const handleAction = (action: string, item?: any) => {
    if (onAction) {
      onAction(action)
    }

    switch (action) {
      case "register":
      case "manage":
      case "view-details":
        setSelectedCompetition(item)
        setActiveForm(action)
        break
      case "player-profile":
        setSelectedPlayer(item)
        setActiveForm(action)
        break
      case "create-tournament":
      case "schedule-match":
      case "announce-winner":
      case "tournament-brackets":
        setActiveForm(action)
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    
    // Show success notification
    let message = ""
    switch (activeForm) {
      case "register":
        message = "Registration submitted successfully!"
        break
      case "manage":
        message = "Tournament updated successfully!"
        break
      case "create-tournament":
        message = "Tournament created successfully!"
        break
      case "schedule-match":
        message = "Match scheduled successfully!"
        break
      case "announce-winner":
        message = "Winner announced successfully!"
        break
      case "view-details":
        message = "Your request has been processed!"
        break
      default:
        message = "Action completed successfully!"
    }
    
    setNotification({ show: true, message, isSuccess: true })
    setActiveForm(null)
    setFormData({
      tournamentName: "",
      sport: "",
      startDate: "",
      endDate: "",
      venue: "",
      maxParticipants: "",
      registrationFee: "",
      prizePool: "",
      description: "",
      matchDate: "",
      matchTime: "",
      matchVenue: "",
      player1: "",
      player2: "",
      winner: "",
      runnerUp: "",
      name: "",
      email: "",
      phone: "",
      team: "",
    })
  }

  const closeNotification = () => {
    setNotification({ show: false, message: "", isSuccess: false })
  }

  return (
    <div className="space-y-6">
      {/* Notification Popup */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${notification.isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          <div className="mr-2">
            {notification.isSuccess ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </div>
          <div>{notification.message}</div>
          <button onClick={closeNotification} className="ml-4">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Competition Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sport Participation</CardTitle>
            <CardDescription>Participants by sport in competitions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px]">
              <PieChart>
                <Pie
                  data={participationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="participants"
                  label={({ sport, participants }) => `${sport}: ${participants}`}
                >
                  {participationData.map((entry, index) => (
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
            <CardTitle>Monthly Competition Trends</CardTitle>
            <CardDescription>Competitions and participation over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px]">
              <BarChart data={monthlyCompetitions}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="competitions" fill="#000000" />
                <Bar dataKey="participants" fill="#D7ee34" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Competitions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {competitions.map((competition) => (
          <Card key={competition.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={competition.image || "/placeholder.svg"}
                alt={competition.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${
                  competition.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : competition.status === "ongoing"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {competition.status}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{competition.name}</CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>{competition.sport} Tournament</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{competition.date}</p>
                    <p className="text-muted-foreground">Date</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{competition.participants}</p>
                    <p className="text-muted-foreground">Participants</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">${competition.prizePool}</p>
                    <p className="text-muted-foreground">Prize Pool</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">${competition.registrationFee}</p>
                    <p className="text-muted-foreground">Entry Fee</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                  onClick={() => handleAction(
                    competition.status === "upcoming" ? "register" : "view-details", 
                    competition
                  )}
                >
                  {competition.status === "upcoming" ? "Register" : "View Details"}
                </Button>
                <Button
                  size="sm"
                  style={{ backgroundColor: "#D7ee34" }}
                  className="text-black hover:opacity-90 "
                  onClick={() => handleAction("manage", competition)}
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Top Players Leaderboard</CardTitle>
          <CardDescription>Current rankings based on competition performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold">
                    {player.rank}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback>
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-muted-foreground">{player.sport}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-bold">{player.points}</p>
                    <p className="text-muted-foreground">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{player.wins}</p>
                    <p className="text-muted-foreground">Wins</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className = "bg-white text-black hover:bg-[#D7EE34]" 
                    onClick={() => handleAction("player-profile", player)}
                  >
                    View Profile
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
          <CardTitle>Competition Management</CardTitle>
          <CardDescription>Organize and manage tournaments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              className="bg-[#D7EE34] text-black" 
              onClick={() => handleAction("create-tournament")}
            >
              Create Tournament
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleAction("schedule-match")}
              
              
            >
              Schedule Match
            </Button>
            <Button
              style={{ backgroundColor: "#D7ee34" }}
              className="text-black hover:opacity-90"
              onClick={() => handleAction("announce-winner")}
            >
              Announce Winner
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleAction("tournament-brackets")}
            >
              View Brackets
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form Dialog */}
      <Dialog open={activeForm === "register"} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {selectedCompetition?.name}</DialogTitle>
            <DialogDescription>
              Fill out the form to register for this competition.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="col-span-3"
                  required
                  onChange={handleInputChange}
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
                  className="col-span-3"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="col-span-3"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team" className="text-right">
                  Team Name (optional)
                </Label>
                <Input
                  id="team"
                  name="team"
                  className="col-span-3"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Submit Registration</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={activeForm === "view-details"} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCompetition?.name}</DialogTitle>
            <DialogDescription>
              {selectedCompetition?.sport} Tournament Details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-start gap-4">
              <div className="w-1/3">
                <img
                  src={selectedCompetition?.image || "/placeholder.svg"}
                  alt={selectedCompetition?.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="w-2/3 space-y-4">
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompetition?.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Rules</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompetition?.rules}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Date</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCompetition?.date}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Venue</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCompetition?.venue}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Prize Pool</h3>
                    <p className="text-sm text-muted-foreground">
                      ${selectedCompetition?.prizePool}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Entry Fee</h3>
                    <p className="text-sm text-muted-foreground">
                      ${selectedCompetition?.registrationFee}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Organizer</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompetition?.organizer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Contact: {selectedCompetition?.contact}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={() => {
                handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                setActiveForm(null)
              }}
            >
              Request More Info
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setActiveForm(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Management Form Dialog */}
      <Dialog open={activeForm === "manage"} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage {selectedCompetition?.name}</DialogTitle>
            <DialogDescription>
              Update competition details and settings.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("status", value)}
                  defaultValue={selectedCompetition?.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="col-span-3"
                  defaultValue={selectedCompetition?.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="participants" className="text-right">
                  Max Participants
                </Label>
                <Input
                  id="participants"
                  name="participants"
                  type="number"
                  className="col-span-3"
                  defaultValue={selectedCompetition?.participants}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prizePool" className="text-right">
                  Prize Pool ($)
                </Label>
                <Input
                  id="prizePool"
                  name="prizePool"
                  type="number"
                  className="col-span-3"
                  defaultValue={selectedCompetition?.prizePool}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registrationFee" className="text-right">
                  Registration Fee ($)
                </Label>
                <Input
                  id="registrationFee"
                  name="registrationFee"
                  type="number"
                  className="col-span-3"
                  defaultValue={selectedCompetition?.registrationFee}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="venue" className="text-right">
                  Venue
                </Label>
                <Input
                  id="venue"
                  name="venue"
                  className="col-span-3"
                  defaultValue={selectedCompetition?.venue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Player Profile Dialog */}
      <Dialog open={activeForm === "player-profile"} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPlayer?.name}'s Profile</DialogTitle>
            <DialogDescription>
              Player details and statistics
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedPlayer?.image || "/placeholder.svg"} alt={selectedPlayer?.name} />
                <AvatarFallback>
                  {selectedPlayer?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold">{selectedPlayer?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedPlayer?.sport}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground">Ranking</h4>
                <p className="text-2xl font-bold">{selectedPlayer?.rank}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground">Points</h4>
                <p className="text-2xl font-bold">{selectedPlayer?.points}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground">Wins</h4>
                <p className="text-2xl font-bold">{selectedPlayer?.wins}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground">Matches</h4>
                <p className="text-2xl font-bold">{selectedPlayer?.wins ? selectedPlayer.wins * 2 : 0}</p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Competitions</h4>
              <div className="space-y-2">
                {competitions.filter(c => c.sport === selectedPlayer?.sport).map(comp => (
                  <div key={comp.id} className="flex justify-between items-center">
                    <span>{comp.name}</span>
                    <Badge variant="outline">{comp.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Match Dialog */}
      <Dialog open={activeForm === "schedule-match"} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Match</DialogTitle>
            <DialogDescription>
              Schedule a match between two players.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="matchDate" className="text-right">
                  Date
                </Label>
                <Input
                  id="matchDate"
                  name="matchDate"
                  type="date"
                  className="col-span-3"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="matchTime" className="text-right">
                  Time
                </Label>
                <Input
                  id="matchTime"
                  name="matchTime"
                  type="time"
                  className="col-span-3"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="matchVenue" className="text-right">
                  Venue
                </Label>
                <Input
                  id="matchVenue"
                  name="matchVenue"
                  className="col-span-3"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="player1" className="text-right">
                  Player 1
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("player1", value)}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {players.map(player => (
                      <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="player2" className="text-right">
                  Player 2
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("player2", value)}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {players.map(player => (
                      <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Schedule Match</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Announce Winner Dialog */}
      <Dialog open={activeForm === "announce-winner"} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Announce Match Winner</DialogTitle>
            <DialogDescription>
              Select the winner and runner-up for the match.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="match" className="text-right">
                  Select Match
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("match", value)}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select match" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match1">Tennis: Alex vs Maria (Aug 15)</SelectItem>
                    <SelectItem value="match2">Basketball: John vs Lisa (Aug 16)</SelectItem>
                    <SelectItem value="match3">Badminton: David vs Sarah (Aug 17)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Result</Label>
                <div className="col-span-3 space-y-4">
                  <RadioGroup 
                    defaultValue="player1" 
                    onValueChange={(value) => handleSelectChange("winner", value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="player1" id="player1" />
                      <Label htmlFor="player1">Player 1 Wins</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="player2" id="player2" />
                      <Label htmlFor="player2">Player 2 Wins</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="score" className="text-right">
                  Score
                </Label>
                <Input
                  id="score"
                  name="score"
                  className="col-span-3"
                  placeholder="e.g. 6-4, 7-5"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comments" className="text-right">
                  Comments
                </Label>
                <Textarea
                  id="comments"
                  name="comments"
                  className="col-span-3"
                  placeholder="Any additional comments about the match"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">Announce Winner</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Tournament Brackets Dialog */}
      <Dialog open={activeForm === "tournament-brackets"} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Tournament Brackets</DialogTitle>
            <DialogDescription>
              View and manage tournament brackets
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between mb-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select tournament" />
                </SelectTrigger>
                <SelectContent>
                  {competitions.map(comp => (
                    <SelectItem key={comp.id} value={comp.id.toString()}>{comp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className ="bg-white text-black hover:bg-[#D7EE34] ">Print Brackets</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Summer Tennis Championship - Bracket</h3>
              <div className="grid grid-cols-4 gap-4">
                {/* Round 1 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Round 1</h4>
                  <div className="border rounded p-2">
                    <p>Alex Thompson</p>
                    <p className="font-bold">6-4, 6-3</p>
                    <p className="text-muted-foreground text-sm">vs. David Brown</p>
                  </div>
                  <div className="border rounded p-2">
                    <p>Maria Garcia</p>
                    <p className="font-bold">7-5, 6-2</p>
                    <p className="text-muted-foreground text-sm">vs. John Smith</p>
                  </div>
                </div>
                
                {/* Quarter Finals */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Quarter Finals</h4>
                  <div className="border rounded p-2">
                    <p>Alex Thompson</p>
                    <p className="font-bold">6-2, 6-4</p>
                    <p className="text-muted-foreground text-sm">vs. Lisa Wang</p>
                  </div>
                  <div className="border rounded p-2">
                    <p>Maria Garcia</p>
                    <p className="font-bold">6-3, 7-6</p>
                    <p className="text-muted-foreground text-sm">vs. Sarah Johnson</p>
                  </div>
                </div>
                
                {/* Semi Finals */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Semi Finals</h4>
                  <div className="border rounded p-2">
                    <p>Alex Thompson</p>
                    <p className="font-bold">6-4, 3-6, 7-5</p>
                    <p className="text-muted-foreground text-sm">vs. Michael Lee</p>
                  </div>
                  <div className="border rounded p-2 bg-yellow-50">
                    <p>Maria Garcia</p>
                    <p className="text-muted-foreground text-sm">vs. TBD</p>
                  </div>
                </div>
                
                {/* Final */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Final</h4>
                  <div className="border rounded p-2 bg-gray-100">
                    <p>TBD</p>
                    <p className="text-muted-foreground text-sm">vs. TBD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setNotification({ show: true, message: "Brackets updated successfully!", isSuccess: true })} className="bg-black text-white hover:bg-[#D7EE34] hover:text-black">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}