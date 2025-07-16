"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { MapPin, Clock, DollarSign, Settings, Star, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface CourtManagementProps {
  onAction: (action: string) => void;
}

export function CourtManagement({ onAction }: CourtManagementProps) {
  const [courts, setCourts] = useState([
    {
      id: 1,
      name: "Tennis Court A",
      type: "Tennis",
      status: "active",
      utilization: 85,
      todayBookings: 8,
      revenue: 400,
      rating: 4.8,
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131755/dexciss%20site/dexplay/optimal/400/tennis_x400/pexels-athena-2961964_x400_imcjdu.jpg?height=200&width=300",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131780/dexciss%20site/dexplay/optimal/400/basketball_x400/pexels-kaip-2234254_x400_vcxrx4.jpg?height=200&width=300",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131810/dexciss%20site/dexplay/optimal/400/badminton_x400/pexels-leozhao-5767580_x400_lw38l0.jpg?height=200&width=300",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131814/dexciss%20site/dexplay/optimal/400/badminton_x400/pexels-shvets-production-8007094_x400_fadifa.jpg?height=200&width=300",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131788/dexciss%20site/dexplay/optimal/400/original_x400/pexels-pixabay-274422_x400_v0deq4.jpg?height=200&width=300",
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
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131804/dexciss%20site/dexplay/optimal/400/original_x400/pexels-pixabay-209977_x400_vutnwa.jpg?height=200&width=300",
    },
  ]);

  const [showAddCourt, setShowAddCourt] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showBulkBooking, setShowBulkBooking] = useState(false);
  const [showReportSuccess, setShowReportSuccess] = useState(false);
  
  const [newCourt, setNewCourt] = useState({
    name: "",
    type: "Tennis",
    status: "active",
  });

  const [maintenanceData, setMaintenanceData] = useState({
    courtId: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [bulkBookingData, setBulkBookingData] = useState({
    courts: [] as number[],
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  const { toast } = useToast();

  const courtTypeData = [
    { name: "Tennis", count: courts.filter(c => c.type === "Tennis").length, color: "#000000" },
    { name: "Badminton", count: courts.filter(c => c.type === "Badminton").length, color: "#D7ee34" },
    { name: "Basketball", count: courts.filter(c => c.type === "Basketball").length, color: "#666666" },
    { name: "Squash", count: courts.filter(c => c.type === "Squash").length, color: "#999999" },
  ];

  const utilizationData = courts.map((court) => ({
    name: court.name.split(" ").slice(0, 2).join(" "),
    utilization: court.utilization,
    revenue: court.revenue,
  }));

  const handleAddCourt = () => {
    const newCourtData = {
      id: courts.length + 1,
      name: newCourt.name,
      type: newCourt.type,
      status: newCourt.status,
      utilization: 0,
      todayBookings: 0,
      revenue: 0,
      rating: 4.0,
      image: "/placeholder.svg?height=200&width=300",
    };
    
    setCourts([...courts, newCourtData]);
    setShowAddCourt(false);
    setNewCourt({ name: "", type: "Tennis", status: "active" });
    
    toast({
      title: "Court Added",
      description: `${newCourt.name} has been added successfully.`,
    });
  };

  const handleScheduleMaintenance = () => {
    const courtId = parseInt(maintenanceData.courtId);
    const updatedCourts = courts.map(court => {
      if (court.id === courtId) {
        return { ...court, status: "maintenance", utilization: 0, todayBookings: 0, revenue: 0 };
      }
      return court;
    });
    
    setCourts(updatedCourts);
    setShowMaintenance(false);
    setMaintenanceData({
      courtId: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
    
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance has been scheduled for the selected court from ${maintenanceData.startDate} to ${maintenanceData.endDate}.`,
    });
  };

  const handleBulkBooking = () => {
    setShowBulkBooking(false);
    setBulkBookingData({
      courts: [],
      date: "",
      startTime: "",
      endTime: "",
      purpose: "",
    });
    
    toast({
      title: "Bulk Booking Created",
      description: `Bulk booking has been created for ${bulkBookingData.courts.length} courts on ${bulkBookingData.date}.`,
    });
  };

  const handleGenerateReport = () => {
    setShowReportSuccess(true);
    setTimeout(() => setShowReportSuccess(false), 3000);
    
    toast({
      title: "Report Generated",
      description: "The court utilization report has been generated and sent to your email.",
    });
  };

  const toggleCourtSelection = (courtId: number) => {
    setBulkBookingData(prev => {
      if (prev.courts.includes(courtId)) {
        return {
          ...prev,
          courts: prev.courts.filter(id => id !== courtId)
        };
      } else {
        return {
          ...prev,
          courts: [...prev.courts, courtId]
        };
      }
    });
  };

  return (
    <div className="space-y-6 items-center">
      {/* Court Analytics */}
      <div className="flex justify-center">
        <div className="grid gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Court Type Distribution</CardTitle>
              <CardDescription>
                Distribution of different court types
              </CardDescription>
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
        </div>
      </div>

      {/* Court Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courts.map((court) => (
          <Card key={court.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={court.image || "/placeholder.svg"}
                alt={court.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${
                  court.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
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
                 className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                  onClick={() => onAction("booking")}
                >
                  Book Now
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction("settings")}
                >
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
            <Button
              className="bg-[#D7EE34] text-black "
              onClick={() => setShowAddCourt(true)}
            >
              Add New Court
            </Button>
            <Button variant="outline" onClick={() => setShowMaintenance(true)}>
              Schedule Maintenance
            </Button>
            <Button
              style={{ backgroundColor: "#D7ee34" }}
              className="text-black hover:opacity-90"
              onClick={() => setShowBulkBooking(true)}
            >
              Bulk Booking
            </Button>
            <Button variant="outline" onClick={handleGenerateReport}>
              Generate Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add New Court Modal */}
      <Dialog open={showAddCourt} onOpenChange={setShowAddCourt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Court</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="court-name">Court Name</Label>
              <Input
                id="court-name"
                placeholder="Enter court name"
                value={newCourt.name}
                onChange={(e) => setNewCourt({...newCourt, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="court-type">Court Type</Label>
              <Select 
                value={newCourt.type} 
                onValueChange={(value) => setNewCourt({...newCourt, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select court type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Badminton">Badminton</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Squash">Squash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="court-status">Initial Status</Label>
              <Select 
                value={newCourt.status} 
                onValueChange={(value) => setNewCourt({...newCourt, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddCourt(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                onClick={handleAddCourt}
                disabled={!newCourt.name}
              >
                Add Court
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Maintenance Modal */}
      <Dialog open={showMaintenance} onOpenChange={setShowMaintenance}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="court-select">Select Court</Label>
              <Select 
                value={maintenanceData.courtId} 
                onValueChange={(value) => setMaintenanceData({...maintenanceData, courtId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a court" />
                </SelectTrigger>
                <SelectContent>
                  {courts.map(court => (
                    <SelectItem key={court.id} value={court.id.toString()}>
                      {court.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={maintenanceData.startDate}
                  onChange={(e) => setMaintenanceData({...maintenanceData, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={maintenanceData.endDate}
                  onChange={(e) => setMaintenanceData({...maintenanceData, endDate: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Maintenance</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for maintenance"
                value={maintenanceData.reason}
                onChange={(e) => setMaintenanceData({...maintenanceData, reason: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowMaintenance(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                onClick={handleScheduleMaintenance}
                disabled={!maintenanceData.courtId || !maintenanceData.startDate || !maintenanceData.endDate}
              >
                Schedule Maintenance
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Booking Modal */}
      <Dialog open={showBulkBooking} onOpenChange={setShowBulkBooking}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Bulk Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Courts</Label>
              <div className="grid grid-cols-2 gap-2">
                {courts.filter(c => c.status === "active").map(court => (
                  <div key={court.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`court-${court.id}`}
                      checked={bulkBookingData.courts.includes(court.id)}
                      onCheckedChange={() => toggleCourtSelection(court.id)}
                    />
                    <Label htmlFor={`court-${court.id}`}>{court.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-date">Date</Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={bulkBookingData.date}
                  onChange={(e) => setBulkBookingData({...bulkBookingData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={bulkBookingData.startTime}
                  onChange={(e) => setBulkBookingData({...bulkBookingData, startTime: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={bulkBookingData.endTime}
                  onChange={(e) => setBulkBookingData({...bulkBookingData, endTime: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input
                id="purpose"
                placeholder="Enter purpose of booking"
                value={bulkBookingData.purpose}
                onChange={(e) => setBulkBookingData({...bulkBookingData, purpose: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowBulkBooking(false)}>
                Cancel
              </Button>
              <Button 
                
                className="bg-black text-white hover:bg-[#D7EE34] hover:text-black"
                onClick={handleBulkBooking}
                disabled={bulkBookingData.courts.length === 0 || !bulkBookingData.date || !bulkBookingData.startTime || !bulkBookingData.endTime}
              >
                Create Bulk Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Success Toast */}
      {showReportSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2">
          <span>Report generated successfully!</span>
          <button onClick={() => setShowReportSuccess(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}