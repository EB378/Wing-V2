"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { format, isAfter, isBefore, isEqual, addHours } from "date-fns";

interface Booking {
  id: string;
  resourceId: string;
  startDateTime: string; // Combined start date and time
  endDateTime: string;   // Combined end date and time
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

  const [currentDate, setCurrentDate] = useState<Date | null>(null); // Client-side date handling
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      resourceId: "aircraft1",
      startDateTime: format(new Date(), "yyyy-MM-dd'T'09:00"),
      endDateTime: format(new Date(), "yyyy-MM-dd'T'10:00"),
      title: "Flight 101",
    },
    {
      id: "2",
      resourceId: "aircraft2",
      startDateTime: format(new Date(), "yyyy-MM-dd'T'11:00"),
      endDateTime: format(new Date(), "yyyy-MM-dd'T'12:00"),
      title: "Navigation Practice",
    },
  ]);

  const [selectedSlot, setSelectedSlot] = useState<{
    resourceId: string;
    startDateTime: string;
    endDateTime: string;
    bookingId?: string; // Optional, used for editing existing bookings
  } | null>(null);

  const [newBookingTitle, setNewBookingTitle] = useState("");

  const timeslots = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  useEffect(() => {
    // Ensure currentDate is initialized only in the client
    setCurrentDate(new Date());
  }, []);

  const handleSlotClick = (resourceId: string, time: string) => {
    if (!currentDate) return;

    const selectedStart = new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`);
    const selectedEnd = addHours(selectedStart, 1); // Default to 1 hour later

    setSelectedSlot({
      resourceId,
      startDateTime: format(selectedStart, "yyyy-MM-dd'T'HH:mm"),
      endDateTime: format(selectedEnd, "yyyy-MM-dd'T'HH:mm"),
    });
    setNewBookingTitle(""); // Clear the booking title for new slots
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedSlot({
      resourceId: booking.resourceId,
      startDateTime: booking.startDateTime,
      endDateTime: booking.endDateTime,
      bookingId: booking.id, // Include booking ID for editing
    });
    setNewBookingTitle(booking.title); // Pre-fill title with existing booking
  };

  const handleBookingSubmit = () => {
    if (!selectedSlot || !newBookingTitle || !selectedSlot.startDateTime || !selectedSlot.endDateTime) {
      alert("Please provide a booking title and specify both start and end times.");
      return;
    }

    const { resourceId, startDateTime, endDateTime, bookingId } = selectedSlot;

    // Validate that the end time is after the start time
    const parsedStart = new Date(startDateTime);
    const parsedEnd = new Date(endDateTime);

    if (isBefore(parsedEnd, parsedStart) || isEqual(parsedEnd, parsedStart)) {
      alert("End time must be after the start time.");
      return;
    }

    // Check for overlapping bookings
    const isOverlap = bookings.some(
      (booking) =>
        booking.resourceId === resourceId &&
        booking.id !== bookingId && // Ignore the current booking being edited
        (isBefore(parsedStart, new Date(booking.endDateTime)) &&
          isAfter(parsedEnd, new Date(booking.startDateTime)))
    );

    if (isOverlap) {
      alert("The selected time range overlaps with an existing booking.");
      return;
    }

    if (bookingId) {
      // Edit existing booking
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, startDateTime, endDateTime, title: newBookingTitle }
            : b
        )
      );
    } else {
      // Add new booking
      const newBooking: Booking = {
        id: String(bookings.length + 1),
        resourceId,
        startDateTime,
        endDateTime,
        title: newBookingTitle,
      };
      setBookings([...bookings, newBooking]);
    }

    setSelectedSlot(null);
    setNewBookingTitle("");
  };

  const handleBookingDelete = () => {
    if (!selectedSlot?.bookingId) return;

    setBookings((prev) => prev.filter((b) => b.id !== selectedSlot.bookingId));
    setSelectedSlot(null);
    setNewBookingTitle("");
  };

  const navigateDate = (direction: "prev" | "next") => {
    if (!currentDate) return;

    setCurrentDate((prev) => {
      if (!prev) return null;
      const newDate =
        direction === "prev"
          ? new Date(prev.getTime() - 86400000) // Subtract 1 day
          : new Date(prev.getTime() + 86400000); // Add 1 day
      return newDate;
    });
  };

  const isPastSlot = (time: string) => {
    if (!currentDate) return false;

    const currentDateTime = new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`);
    return !isAfter(currentDateTime, new Date()); // Disable past slots for today
  };

  if (!currentDate) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar locale={""} />
      <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Booking System</h1>

        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-4 w-full max-w-5xl">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
            onClick={() => navigateDate("prev")}
          >
            Previous Day
          </button>
          <h2 className="text-xl font-bold text-gray-700">
            {format(currentDate, "EEEE, MMMM d, yyyy")}
          </h2>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
            onClick={() => navigateDate("next")}
          >
            Next Day
          </button>
        </div>

        {/* Calendar */}
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-4">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-gray-300 pb-2 mb-4">
            <div className="font-bold text-gray-700">Time</div>
            {resources.map((resource) => (
              <div key={resource.id} className="font-bold text-gray-700 text-center">
                {resource.title}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {timeslots.map((time) => (
            <div
              key={time}
              className="grid grid-cols-4 border-b border-gray-200 items-center"
            >
              <div className="py-2 font-medium text-gray-600">{time}</div>

              {resources.map((resource) => {
                const booking = bookings.find(
                  (b) =>
                    b.resourceId === resource.id &&
                    isAfter(new Date(b.endDateTime), new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`)) &&
                    isBefore(new Date(b.startDateTime), new Date(`${format(currentDate, "yyyy-MM-dd")}T${time}`))
                );

                return (
                  <div
                    key={`${resource.id}-${time}`}
                    className={`py-2 text-center cursor-pointer ${
                      booking
                        ? "bg-blue-500 text-white font-bold"
                        : isPastSlot(time)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() =>
                      booking
                        ? handleBookingClick(booking)
                        : !isPastSlot(time) && handleSlotClick(resource.id, time)
                    }
                  >
                    {booking ? booking.title : isPastSlot(time) ? "Unavailable" : "Available"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Booking Form */}
        {selectedSlot && (
          <div className="mt-6 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedSlot.bookingId ? "Edit Booking" : "New Booking"}
            </h2>
            <label className="block text-gray-600 font-medium mb-2">Start Date & Time:</label>
            <input
              type="datetime-local"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={selectedSlot.startDateTime}
              onChange={(e) =>
                setSelectedSlot((prev) => prev && { ...prev, startDateTime: e.target.value })
              }
            />
            <label className="block text-gray-600 font-medium mb-2">End Date & Time:</label>
            <input
              type="datetime-local"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={selectedSlot.endDateTime}
              onChange={(e) =>
                setSelectedSlot((prev) => prev && { ...prev, endDateTime: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Booking Title"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={newBookingTitle}
              onChange={(e) => setNewBookingTitle(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="w-1/2 bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition mr-2"
                onClick={handleBookingSubmit}
              >
                {selectedSlot.bookingId ? "Update Booking" : "Submit Booking"}
              </button>
              {selectedSlot.bookingId && (
                <button
                  className="w-1/2 bg-red-600 text-white py-2 rounded-md font-bold hover:bg-red-700 transition"
                  onClick={handleBookingDelete}
                >
                  Delete Booking
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;