"use client"

import { useState } from "react"
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
import { TrendingUp, TrendingDown, Users, Clock, Target, X, Check, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"

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

  // Members data
  const members = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", type: "user", active: true },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", type: "user", active: true },
    { id: 3, name: "Michael Brown", email: "michael@example.com", type: "coach", active: true },
    { id: 4, name: "Emily Davis", email: "emily@example.com", type: "user", active: false },
    { id: 5, name: "David Wilson", email: "david@example.com", type: "coach", active: true },
    { id: 6, name: "Jessica Taylor", email: "jessica@example.com", type: "user", active: true },
    { id: 7, name: "Daniel Anderson", email: "daniel@example.com", type: "user", active: true },
    { id: 8, name: "Olivia Martinez", email: "olivia@example.com", type: "coach", active: false },
    { id: 9, name: "James Thomas", email: "james@example.com", type: "user", active: true },
    { id: 10, name: "Sophia Garcia", email: "sophia@example.com", type: "user", active: true },
  ]

  // State for dialogs and messages
  const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(false)
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false)
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")
  const [sendToAll, setSendToAll] = useState(false)
  const [reportType, setReportType] = useState("daily")

  // Toggle member selection
  const toggleMemberSelection = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(memberId => memberId !== id))
    } else {
      setSelectedMembers([...selectedMembers, id])
    }
  }

  // Select all members
  const selectAllMembers = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(members.map(member => member.id))
    }
  }

  // Handle send message
  const handleSendMessage = (type: string) => {
    // In a real app, you would send the message to the backend here
    console.log(`Sending ${type} message:`, {
      subject,
      message,
      recipients: sendToAll ? "all" : selectedMembers,
    })
    
    // Reset form
    setSubject("")
    setMessage("")
    setSelectedMembers([])
    
    // Close current dialog and show success
    if (type === "emergency") setEmergencyDialogOpen(false)
    if (type === "maintenance") setMaintenanceDialogOpen(false)
    if (type === "bulk") setBulkDialogOpen(false)
    if (type === "report") setReportDialogOpen(false)
    
    setSuccessDialogOpen(true)
  }

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
            <Button 
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => setEmergencyDialogOpen(true)}
            >
              Emergency Court Close
            </Button>
            <Button 
              className="w-full bg-transparent" 
              variant="outline"
              onClick={() => setMaintenanceDialogOpen(true)}
            >
              Send Maintenance Alert
            </Button>
            <Button 
              className="w-full text-black hover:opacity-90" 
              style={{ backgroundColor: "#D7ee34" }}
              onClick={() => setBulkDialogOpen(true)}
            >
              Bulk Notification
            </Button>
            <Button 
              className="w-full bg-transparent" 
              variant="outline"
              onClick={() => setReportDialogOpen(true)}
            >
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Court Close Dialog */}
      <Dialog open={emergencyDialogOpen} onOpenChange={setEmergencyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Emergency Court Closure</DialogTitle>
            <DialogDescription>
              Send an emergency notification about court closure to all users and coaches.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emergency-subject">Subject</Label>
              <Input
                id="emergency-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Emergency: Court Closure"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency-message">Message</Label>
              <Textarea
                id="emergency-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear members, we regret to inform you that due to unforeseen circumstances, all courts will be closed today..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="emergency-all" checked={sendToAll} onCheckedChange={setSendToAll} />
              <Label htmlFor="emergency-all">Send to all members</Label>
            </div>
            {!sendToAll && (
              <div className="space-y-2">
                <Label>Select Recipients</Label>
                <ScrollArea className="h-48 rounded-md border p-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={selectAllMembers}>
                        {selectedMembers.length === members.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`member-${member.id}`}
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMemberSelection(member.id)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor={`member-${member.id}`} className="text-sm">
                          {member.name} ({member.type})
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={() => handleSendMessage("emergency")}
              disabled={!subject || !message || (!sendToAll && selectedMembers.length === 0)}
              className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
            >
              <Send className="mr-2 h-4 w-4" /> Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Alert Dialog */}
      <Dialog open={maintenanceDialogOpen} onOpenChange={setMaintenanceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Maintenance Alert</DialogTitle>
            <DialogDescription>
              Notify members about scheduled maintenance or unexpected issues.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="maintenance-subject">Subject</Label>
              <Input
                id="maintenance-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Maintenance Alert: Court Unavailable"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Message</Label>
              <Textarea
                id="maintenance-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear members, we would like to inform you that the following courts will be undergoing maintenance..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="maintenance-all" checked={sendToAll} onCheckedChange={setSendToAll} />
              <Label htmlFor="maintenance-all">Send to all members</Label>
            </div>
            {!sendToAll && (
              <div className="space-y-2">
                <Label>Select Recipients</Label>
                <ScrollArea className="h-48 rounded-md border p-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={selectAllMembers}>
                        {selectedMembers.length === members.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`member-${member.id}`}
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMemberSelection(member.id)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor={`member-${member.id}`} className="text-sm">
                          {member.name} ({member.type})
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={() => handleSendMessage("maintenance")}
              disabled={!subject || !message || (!sendToAll && selectedMembers.length === 0)}
              className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
            >
              <Send className="mr-2 h-4 w-4" /> Send Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Notification Dialog */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bulk Notification</DialogTitle>
            <DialogDescription>
              Send a custom notification to selected members or all members.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-subject">Subject</Label>
              <Input
                id="bulk-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Important Announcement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bulk-message">Message</Label>
              <Textarea
                id="bulk-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear members, we have an important announcement..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="bulk-all" checked={sendToAll} onCheckedChange={setSendToAll} />
              <Label htmlFor="bulk-all">Send to all members</Label>
            </div>
            {!sendToAll && (
              <div className="space-y-2">
                <Label>Select Recipients</Label>
                <ScrollArea className="h-48 rounded-md border p-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={selectAllMembers}>
                        {selectedMembers.length === members.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`member-${member.id}`}
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMemberSelection(member.id)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor={`member-${member.id}`} className="text-sm">
                          {member.name} ({member.type})
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={() => handleSendMessage("bulk")}
              disabled={!subject || !message || (!sendToAll && selectedMembers.length === 0)}
              className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
            >
              <Send className="mr-2 h-4 w-4" /> Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>
              Select the type of report you want to generate and recipients.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <select
                id="report-type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="daily">Daily Activity Report</option>
                <option value="weekly">Weekly Summary Report</option>
                <option value="monthly">Monthly Performance Report</option>
                <option value="financial">Financial Report</option>
                <option value="utilization">Court Utilization Report</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-message">Additional Notes (Optional)</Label>
              <Textarea
                id="report-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add any additional notes or comments for the report..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="report-all" checked={sendToAll} onCheckedChange={setSendToAll} />
              <Label htmlFor="report-all">Send to all managers</Label>
            </div>
            {!sendToAll && (
              <div className="space-y-2">
                <Label>Select Recipients</Label>
                <ScrollArea className="h-48 rounded-md border p-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={selectAllMembers}>
                        {selectedMembers.length === members.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    {members.filter(m => m.type === "coach" || m.name.includes("Manager")).map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`member-${member.id}`}
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMemberSelection(member.id)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor={`member-${member.id}`} className="text-sm">
                          {member.name} ({member.type})
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={() => handleSendMessage("report")}
              disabled={!reportType || (!sendToAll && selectedMembers.length === 0)}
              className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
            >
              <Send className="mr-2 h-4 w-4" /> Generate & Send Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="h-6 w-6 text-green-600 mr-2" />
              Message Sent Successfully!
            </DialogTitle>
            <DialogDescription>
              Your notification has been delivered to all selected recipients.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Recipients will receive the message via email and in-app notification.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setSuccessDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}