'use client'

import { useState } from 'react'

export default function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [formData, setFormData] = useState({})
  const classes = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    alert("Video submitted!")
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Upload New Video</h1>

      {/* Video Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        {videoFile && (
          <div className="relative mt-4">
            <video
              className="w-full rounded-md"
              controls
              src={URL.createObjectURL(videoFile)}
            />
            <button
              onClick={() => setVideoFile(null)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
              title="Remove"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
        />
        {thumbnail && (
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail Preview"
            className="mt-4 w-48 rounded-md"
          />
        )}
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Class Selection */}
      <div>
        <input
          list="classes"
          name="prevClass"
          placeholder="Class"
          className="input w-full"
          onChange={handleChange}
        />
        <datalist id="classes">
          {classes.map(c => <option key={c} value={c} />)}
        </datalist>
      </div>

      {/* Subject Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Topic</label>
        <input
          type="text"
          placeholder="E.g., Biology - Genetics"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Publish
        </button>
        <button
          className="px-6 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
        >
          Save as Draft
        </button>
      </div>
    </div>
  )
}
