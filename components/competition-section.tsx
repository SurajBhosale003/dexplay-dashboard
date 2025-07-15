"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { Trophy, Calendar, Users, MapPin, Award } from "lucide-react"

interface CompetitionSectionProps {
  onAction: (action: string) => void
}

export function CompetitionSection({ onAction }: CompetitionSectionProps) {
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
      image: "/placeholder.svg?height=200&width=300",
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
      image: "/placeholder.svg?height=200&width=300",
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
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const leaderboard = [
    {
      rank: 1,
      name: "Alex Thompson",
      sport: "Tennis",
      points: 2450,
      wins: 15,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 2,
      name: "Maria Garcia",
      sport: "Basketball",
      points: 2380,
      wins: 14,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 3,
      name: "John Smith",
      sport: "Badminton",
      points: 2320,
      wins: 13,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 4,
      name: "Lisa Wang",
      sport: "Tennis",
      points: 2280,
      wins: 12,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 5,
      name: "David Brown",
      sport: "Squash",
      points: 2240,
      wins: 11,
      image: "/placeholder.svg?height=40&width=40",
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

  return (
    <div className="space-y-6">
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
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  onClick={() => onAction("register")}
                >
                  {competition.status === "upcoming" ? "Register" : "View Details"}
                </Button>
                <Button
                  size="sm"
                  style={{ backgroundColor: "#D7ee34" }}
                  className="text-white hover:opacity-90"
                  onClick={() => onAction("manage")}
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
                  <Button size="sm" variant="outline" onClick={() => onAction("player-profile")}>
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
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => onAction("create-tournament")}>
              Create Tournament
            </Button>
            <Button variant="outline" onClick={() => onAction("schedule-match")}>
              Schedule Match
            </Button>
            <Button
              style={{ backgroundColor: "#D7ee34" }}
              className="text-white hover:opacity-90"
              onClick={() => onAction("announce-winner")}
            >
              Announce Winner
            </Button>
            <Button variant="outline" onClick={() => onAction("tournament-brackets")}>
              View Brackets
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
