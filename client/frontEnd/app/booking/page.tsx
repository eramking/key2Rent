"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function BookingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    movingDate: "",
    items: {
      sofaSet: false,
      bed: false,
      diningTable: false,
      wardrobe: false,
      otherFurniture: false,
    },
  })

  const [estimatedPrice, setEstimatedPrice] = useState(299)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      items: {
        ...formData.items,
        [name]: checked,
      },
    })

    // Update price based on selected items
    calculatePrice({
      ...formData.items,
      [name]: checked,
    })
  }

  const calculatePrice = (items: typeof formData.items) => {
    const basePrice = 199
    let additionalCost = 0

    if (items.sofaSet) additionalCost += 50
    if (items.bed) additionalCost += 40
    if (items.diningTable) additionalCost += 30
    if (items.wardrobe) additionalCost += 60
    if (items.otherFurniture) additionalCost += 20

    setEstimatedPrice(basePrice + additionalCost)
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      pickupLocation: "",
      dropoffLocation: "",
      movingDate: "",
      items: {
        sofaSet: false,
        bed: false,
        diningTable: false,
        wardrobe: false,
        otherFurniture: false,
      },
    })
    setEstimatedPrice(299)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Booking submitted:", formData)

    // Redirect to confirmation page
    router.push("/booking/confirmation")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Move</h1>

      <div className="flex justify-center mb-6">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
          alt="Moving boxes"
          width={300}
          height={200}
          className="rounded-lg shadow-md object-cover"
        />
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Location Details */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>
          </div>

          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Pick-Up Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter pick-up address"
              required
            />
          </div>

          <div>
            <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Drop-Off Location
            </label>
            <input
              type="text"
              id="dropoffLocation"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter drop-off address"
              required
            />
          </div>

          {/* Items & Schedule */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Items & Schedule</h2>
          </div>

          <div>
            <label htmlFor="movingDate" className="block text-sm font-medium text-gray-700 mb-1">
              Moving Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="movingDate"
                name="movingDate"
                value={formData.movingDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Items</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sofaSet"
                  name="sofaSet"
                  checked={formData.items.sofaSet}
                  onChange={handleItemChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sofaSet" className="ml-2 text-sm text-gray-700">
                  Sofa Set
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bed"
                  name="bed"
                  checked={formData.items.bed}
                  onChange={handleItemChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="bed" className="ml-2 text-sm text-gray-700">
                  Bed
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diningTable"
                  name="diningTable"
                  checked={formData.items.diningTable}
                  onChange={handleItemChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="diningTable" className="ml-2 text-sm text-gray-700">
                  Dining Table
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wardrobe"
                  name="wardrobe"
                  checked={formData.items.wardrobe}
                  onChange={handleItemChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="wardrobe" className="ml-2 text-sm text-gray-700">
                  Wardrobe
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="otherFurniture"
                  name="otherFurniture"
                  checked={formData.items.otherFurniture}
                  onChange={handleItemChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="otherFurniture" className="ml-2 text-sm text-gray-700">
                  Other Furniture
                </label>
              </div>
            </div>
          </div>

          {/* Price Estimate */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Price Estimate</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Estimated Total</span>
                <span className="text-2xl font-bold text-blue-600">${estimatedPrice}</span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
