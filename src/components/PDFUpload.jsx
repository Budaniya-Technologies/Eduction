'use client'

import { useState } from 'react'

export default function PdfUpload() {
  const [pdfFiles, setPdfFiles] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [formData, setFormData] = useState({})
  const classes = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']

  const handlePdfChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setPdfFiles(files)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    alert("PDF study material submitted!")
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Upload PDF Study Material</h1>

      {/* PDF Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">PDF Files</label>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handlePdfChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        />
        {pdfFiles.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {pdfFiles.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-4 py-2 border rounded-md bg-gray-50"
              >
                <span className="truncate flex items-center gap-2">
                  📄 <span className="max-w-xs truncate">{file.name}</span>
                </span>
                <button
                  onClick={() => setPdfFiles(prev => prev.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700 text-xl font-bold leading-none"
                  title="Remove"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          placeholder="E.g., Chapter 2 Notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Write a short summary or context of this material..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
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

      {/* Subject */}
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

      {/* Action Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
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
