'use client'
import React, { useState } from 'react'

const AddService = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    tags: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Service Submitted:', formData)
    alert('✅ Service Submitted!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-raisin-black">Add New Service</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-jungle-green"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-jungle-green"
            required
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (₹)"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-jungle-green"
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (e.g., 1 hr)"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-jungle-green"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Service Description"
          rows="4"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-jungle-green"
        />

        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-jungle-green"
        />

        <button
          type="submit"
          className="w-full bg-jungle-green text-white py-3 rounded-md hover:bg-cambridge-blue transition-all"
        >
          Submit Service
        </button>
      </form>
    </div>
  )
}

export default AddService
