"use client";

import React, { useState, useEffect } from "react";
import { format, addHours, isBefore, isAfter } from "date-fns";
import Navbar from "@/components/Navbar";

interface Booking {
  id: string;
  resourceId: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
}

interface Resource {
  id: string;
  title: string;
}

const BookingPage: React.FC = () => {
  const resources: Resource[] = [
    { id: "aircraft1", title: "Cessna 172" },
    { id: "aircraft2", title: "Piper PA-28" },
    { id: "aircraft3", title: "Diamond DA40" },
  ];

  const timeslots = Array.from({ length: 24 }, (_, index) => `${index.toString().padStart(2, '0')}:00`);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Booking | null>(null);
  const [newBookingTitle, setNewBookingTitle] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch("/${locale}/api/bookings?date=${format(currentDate, 'yyyy-MM-dd')}");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch bookings");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentDate]);

  const navigateDate = (direction: "prev" | "next") => {
    setCurrentDate(prev => direction === "prev" ? addHours(prev, -24) : addHours(prev, 24));
  };

  const handleSlotClick = (resourceId: string, time: string) => {
    const startDateTime = new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`);
    if (isBefore(startDateTime, new Date())) {
      alert("Cannot book a time in the past.");
      return;
    }
    const selectedStart = new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`);
    const selectedEnd = addHours(selectedStart, 1); // Default to 1 hour later
    setSelectedSlot({
      id: "",
      resourceId,
      startDateTime: format(selectedStart, "yyyy-MM-dd'T'HH:mm"),
      endDateTime: format(selectedEnd, "yyyy-MM-dd'T'HH:mm"),
      title: ""
    });
    setNewBookingTitle(""); // Reset title input when a new slot is selected
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedSlot(booking);
    setNewBookingTitle(booking.title);
  };

  const handleBookingSubmit = async () => {
    if (!selectedSlot || !newBookingTitle) {
      console.error("Booking data is incomplete.");
      return;
    }
    const method = selectedSlot.id ? "PUT" : "POST";
    const endpoint = "/${locale}/api/bookings${selectedSlot.id ? `/${selectedSlot.id}` : ''}";
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId: selectedSlot.resourceId,
          startDateTime: selectedSlot.startDateTime,
          endDateTime: selectedSlot.endDateTime,
          title: newBookingTitle,
          id: selectedSlot.id // Only needed for PUT
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save booking");
      await fetchBookings();
      setSelectedSlot(null);
      setNewBookingTitle("");
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  const handleBookingDelete = async () => {
    if (!selectedSlot || !selectedSlot.id) {
      console.error("No booking selected for deletion.");
      return;
    }
    try {
      const response = await fetch("/${locale}/api/bookings/${selectedSlot.id}", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedSlot.id })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete booking");
      }
      await fetchBookings();
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      <Navbar locale={""} />
      <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Booking System</h1>
        {/* Date Navigation Section */}
        <div className="flex items-center justify-between mb-4 w-full max-w-5xl">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md" onClick={() => navigateDate("prev")}>Previous Day</button>
          <h2 className="text-xl font-bold text-gray-700">{format(currentDate, "EEEE, MMMM d, yyyy")}</h2>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md" onClick={() => navigateDate("next")}>Next Day</button>
        </div>
        {/* Calendar Section */}
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-4">
          {/* Calendar Header */}
          <div className="grid grid-cols-4 border-b border-gray-300 pb-2 mb-4">
            <div className="font-bold text-gray-700">Time</div>
            {resources.map((resource) => (
              <div key={resource.id} className="font-bold text-gray-700 text-center">{resource.title}</div>
            ))}
          </div>
          {/* Calendar Rows */}
          {timeslots.map((time) => (
            <div key={time} className="grid grid-cols-4 border-b border-gray-200 items-center">
              <div className="py-2 font-medium text-gray-600">{time}</div>
              {resources.map((resource) => {
                const booking = bookings.find(
                  b => b.resourceId === resource.id &&
                  isAfter(new Date(b.endDateTime), new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`)) &&
                  isBefore(new Date(b.startDateTime), new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`))
                );
                return (
                  <div key={`${resource.id}-${time}`} 
                       className={`py-2 text-center cursor-pointer ${booking ? "bg-blue-500 text-white font-bold" : (isBefore(new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`), new Date()) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300")}`}
                       onClick={() => booking || isBefore(new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`), new Date()) ? null : handleSlotClick(resource.id, time)}>
                    {booking ? booking.title : (isBefore(new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`), new Date()) ? "Past" : "Available")}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {/* Booking Form Section */}
        {selectedSlot && (
          <div className="mt-6 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedSlot.id ? "Edit Booking" : "New Booking"}</h2>
            <label className="block text-gray-600 font-medium mb-2">Start Date & Time:</label>
            
            {/* Start time */}
            <input type="datetime-local" className="w-full p-2 border border-gray-300 rounded-md mb-4" value={selectedSlot.startDateTime} onChange={(e) => setSelectedSlot((prev) => prev && { ...prev, startDateTime: e.target.value })}/>
            
            <label className="block text-gray-600 font-medium mb-2">End Date & Time:</label>
            
            {/* End time */}
            <input type="datetime-local" className="w-full p-2 border border-gray-300 rounded-md mb-4" value={selectedSlot.endDateTime} onChange={(e) => setSelectedSlot(prev => prev && { ...prev, endDateTime: e.target.value })}/>
            <input type="text" placeholder="Booking Title" className="w-full p-2 border border-gray-300 rounded-md mb-4" value={newBookingTitle} onChange={(e) => setNewBookingTitle(e.target.value)}/>
            <div className="flex justify-between">
              <button className="w-1/2 bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition mr-2" onClick={handleBookingSubmit}>{selectedSlot.id ? "Update Booking" : "Submit Booking"}</button>
              {selectedSlot.id && (
                <button className="w-1/2 bg-red-600 text-white py-2 rounded-md font-bold hover:bg-red-700 transition" onClick={handleBookingDelete}>Delete Booking</button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;
