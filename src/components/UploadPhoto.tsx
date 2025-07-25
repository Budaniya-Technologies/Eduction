'use client'

import { useState } from 'react'

export default function PhotoUpload() {
  const [images, setImages] = useState<File[]>([])
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const classes = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setImages(files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

//   const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setPdfFile(e.target.files[0])
//     }
//   }

  const handleSubmit = () => {
    // Logic to upload to server
    alert("Study material submitted!")
  }

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Upload Study Material</h1>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images (you can select multiple)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
        />
   {images.length > 0 && (
  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
    {images.map((img, index) => (
      <div
        key={index}
        className="relative group rounded-md overflow-hidden border"
      >
        <img
          src={URL.createObjectURL(img)}
          alt={`Preview ${index + 1}`}
          className="w-full h-32 object-cover"
        />
        <button
          onClick={() =>
            setImages((prev) => prev.filter((_, i) => i !== index))
          }
          className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
          title="Remove"
        >
          ×
        </button>
      </div>
    ))}
  </div>
)}

      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter a title for this material"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Brief description or context of the material..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
      </div>

      <div>
        <input list="classes" name="prevClass" placeholder="Class" className="input w-full" onChange={handleChange} />
        <datalist id="classes">
          {classes.map(c => <option key={c} value={c} />)}
        </datalist>
      </div>

      {/* Subject/Topic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Topic</label>
        <input
          type="text"
          placeholder="E.g., Physics - Thermodynamics"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
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
