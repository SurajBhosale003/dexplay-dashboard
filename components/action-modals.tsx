"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Calendar, Clock, Users, Trophy } from "lucide-react"

interface ActionModalsProps {
  activeModal: string | null
  onClose: () => void
}

export function ActionModals({ activeModal, onClose }: ActionModalsProps) {
  const [formData, setFormData] = useState({
    courtType: "",
    date: "",
    time: "",
    duration: "",
    playerName: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  const renderBookingModal = () => (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>New Court Booking</DialogTitle>
        <DialogDescription>Book a court for your next game or training session</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="court">Court Type</Label>
            <Select
              value={formData.courtType}
              onValueChange={(value) => setFormData({ ...formData, courtType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select court" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tennis-a">Tennis Court A</SelectItem>
                <SelectItem value="tennis-b">Tennis Court B</SelectItem>
                <SelectItem value="basketball">Basketball Court</SelectItem>
                <SelectItem value="badminton-a">Badminton Court A</SelectItem>
                <SelectItem value="badminton-b">Badminton Court B</SelectItem>
                <SelectItem value="squash">Squash Court</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="1.5">1.5 hours</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="3">3 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="player">Player Name</Label>
          <Input
            id="player"
            placeholder="Enter player name"
            value={formData.playerName}
            onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="player@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any special requirements or notes..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
        <div className="flex space-x-2 pt-4">
          <Button type="submit" className="bg-black text-white hover:bg-[#D7EE34] hover:text-black flex-1">
            Confirm Booking
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  )

  const renderSuccessModal = () => (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <DialogTitle className="text-xl">Congratulations!</DialogTitle>
        <DialogDescription>
          Your booking has been confirmed successfully. You will receive a confirmation email shortly.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Court:</span>
                <span className="font-medium">Tennis Court A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">July 20, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">$100.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full" style={{ backgroundColor: "#D7ee34" }} onClick={onClose}>
          Great! Continue
        </Button>
      </div>
    </DialogContent>
  )

  const renderApprovalModal = () => (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Booking Approval Required</DialogTitle>
        <DialogDescription>Review and approve or reject this booking request</DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">July 20, 2024</p>
                  <p className="text-muted-foreground">Date</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">2:00 PM - 4:00 PM</p>
                  <p className="text-muted-foreground">Time</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-muted-foreground">Player</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Basketball Court</p>
                  <p className="text-muted-foreground">Court</p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                <strong>Notes:</strong> Need equipment rental for 2 basketballs
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="flex space-x-2">
          <Button className="flex-1 bg-green-600 text-white hover:bg-green-700" onClick={onClose}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          <Button className="flex-1 bg-red-600 text-white hover:bg-red-700" onClick={onClose}>
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>
    </DialogContent>
  )

  const renderCompetitionModal = () => (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Create New Tournament</DialogTitle>
        <DialogDescription>Set up a new competition for your sports facility</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tournament-name">Tournament Name</Label>
            <Input id="tournament-name" placeholder="Summer Championship" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sport">Sport</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="badminton">Badminton</SelectItem>
                <SelectItem value="squash">Squash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input id="start-date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input id="end-date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-participants">Max Participants</Label>
            <Input id="max-participants" type="number" placeholder="32" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entry-fee">Entry Fee ($)</Label>
            <Input id="entry-fee" type="number" placeholder="50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prize-pool">Prize Pool ($)</Label>
            <Input id="prize-pool" type="number" placeholder="1000" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Tournament Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the tournament format, rules, and other details..."
            rows={3}
          />
        </div>
        <div className="flex space-x-2 pt-4">
          <Button type="submit" className="bg-black text-white hover:bg-[#D7EE34] hover:text-black flex-1">
            Create Tournament
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="bg-white text-black ">
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  )

  return (
    <Dialog open={!!activeModal} onOpenChange={onClose}>
      {activeModal === "booking" && renderBookingModal()}
      {activeModal === "success" && renderSuccessModal()}
      {activeModal === "approval" && renderApprovalModal()}
      {activeModal === "create-tournament" && renderCompetitionModal()}
      {activeModal === "bookings" && (
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>All Bookings</DialogTitle>
            <DialogDescription>Manage all court bookings and reservations</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {[
              {
                id: 1,
                court: "Tennis Court A",
                player: "John Doe",
                time: "10:00 AM - 11:00 AM",
                status: "confirmed",
                amount: "$50",
              },
              {
                id: 2,
                court: "Basketball Court",
                player: "Jane Smith",
                time: "2:00 PM - 4:00 PM",
                status: "pending",
                amount: "$80",
              },
              {
                id: 3,
                court: "Badminton Court B",
                player: "Mike Johnson",
                time: "6:00 PM - 7:00 PM",
                status: "confirmed",
                amount: "$35",
              },
              {
                id: 4,
                court: "Tennis Court B",
                player: "Sarah Wilson",
                time: "8:00 AM - 9:00 AM",
                status: "confirmed",
                amount: "$50",
              },
              {
                id: 5,
                court: "Squash Court",
                player: "David Brown",
                time: "7:00 PM - 8:00 PM",
                status: "pending",
                amount: "$40",
              },
            ].map((booking) => (
              <Card key={booking.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{booking.court}</p>
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
                      <span className="font-medium">{booking.amount}</span>
                      {booking.status === "pending" && (
                        <Button
                          size="sm"
                          className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                          onClick={() => onClose()}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
