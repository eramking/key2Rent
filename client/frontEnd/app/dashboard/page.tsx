"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    date: "2025-04-15",
    status: "Upcoming",
    pickupLocation: "123 Main St, City A",
    dropoffLocation: "456 Oak St, City B",
    items: ["Sofa Set", "Dining Table"],
    price: 299,
  },
  {
    id: "2",
    date: "2025-03-10",
    status: "Completed",
    pickupLocation: "789 Pine St, City A",
    dropoffLocation: "321 Elm St, City C",
    items: ["Bed", "Wardrobe"],
    price: 349,
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredBookings = mockBookings.filter((booking) =>
    activeTab === "upcoming" ? booking.status === "Upcoming" : booking.status === "Completed",
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <div className="mb-6">
          <Image
            src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=2070&auto=format&fit=crop"
            alt="Dashboard Banner"
            width={1200}
            height={300}
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
        </div>
        <p className="text-gray-600">Manage your bookings and account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow rounded-lg p-4">
          <nav className="space-y-1">
            <Link href="/dashboard" className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
              My Bookings
            </Link>
            <Link
              href="/dashboard/profile"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Profile Settings
            </Link>
            <Link
              href="/dashboard/notifications"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Notifications
            </Link>
            <Link
              href="/dashboard/payment"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Payment Methods
            </Link>
            <button className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "upcoming"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Upcoming Bookings
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "past"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Past Bookings
                </button>
              </nav>
            </div>

            <div className="p-4">
              {filteredBookings.length > 0 ? (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Booking #{booking.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            booking.status === "Upcoming" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">From</p>
                          <p className="text-sm">{booking.pickupLocation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">To</p>
                          <p className="text-sm">{booking.dropoffLocation}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs text-gray-500">Items</p>
                        <p className="text-sm">{booking.items.join(", ")}</p>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-medium">${booking.price}</p>
                        <div className="space-x-2">
                          {booking.status === "Upcoming" && (
                            <>
                              <button className="px-3 py-1 text-xs font-medium text-blue-700 border border-blue-700 rounded-md hover:bg-blue-50">
                                Edit
                              </button>
                              <button className="px-3 py-1 text-xs font-medium text-red-700 border border-red-700 rounded-md hover:bg-red-50">
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === "Completed" && (
                            <button className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-700 rounded-md hover:bg-gray-50">
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No {activeTab} bookings found.</p>
                  <Link
                    href="/booking"
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Book a Move
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
