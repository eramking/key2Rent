"use client"

import { useState } from "react"
import Image from "next/image"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    customerName: "John Doe",
    date: "2025-04-15",
    status: "Pending",
    pickupLocation: "123 Main St, City A",
    dropoffLocation: "456 Oak St, City B",
    items: ["Sofa Set", "Dining Table"],
    price: 299,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    date: "2025-04-16",
    status: "Assigned",
    pickupLocation: "789 Pine St, City A",
    dropoffLocation: "321 Elm St, City C",
    items: ["Bed", "Wardrobe"],
    price: 349,
    assignedTo: "Mover Team A",
  },
  {
    id: "3",
    customerName: "Robert Johnson",
    date: "2025-04-10",
    status: "Completed",
    pickupLocation: "555 Cedar St, City B",
    dropoffLocation: "777 Maple St, City A",
    items: ["Sofa Set", "Wardrobe", "Dining Table"],
    price: 399,
  },
]

// Mock data for movers
const mockMovers = [
  { id: "1", name: "Mover Team A", status: "Available" },
  { id: "2", name: "Mover Team B", status: "Busy" },
  { id: "3", name: "Mover Team C", status: "Available" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredBookings =
    selectedStatus === "all"
      ? mockBookings
      : mockBookings.filter((booking) => booking.status.toLowerCase() === selectedStatus)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mb-6">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            alt="Admin Dashboard Banner"
            width={1200}
            height={300}
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
        </div>
        <p className="text-gray-600">Manage bookings, movers, and users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow rounded-lg p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeTab === "bookings"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("movers")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeTab === "movers"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Movers
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeTab === "users"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeTab === "settings"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-4">
          {activeTab === "bookings" && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Manage Bookings</h2>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="status-filter" className="text-sm text-gray-500">
                      Filter by status:
                    </label>
                    <select
                      id="status-filter"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="text-sm border-gray-300 rounded-md"
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="assigned">Assigned</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Booking ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{booking.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              booking.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "Assigned"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                            {booking.status === "Pending" && (
                              <button className="text-green-600 hover:text-green-900">Assign</button>
                            )}
                            {booking.status !== "Completed" && (
                              <button className="text-red-600 hover:text-red-900">Cancel</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "movers" && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Manage Movers</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                    Add New Mover
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockMovers.map((mover) => (
                      <tr key={mover.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{mover.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mover.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              mover.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {mover.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">User Management</h2>
              <p className="text-gray-500">User management functionality would be implemented here.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Admin Settings</h2>
              <p className="text-gray-500">Admin settings functionality would be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
