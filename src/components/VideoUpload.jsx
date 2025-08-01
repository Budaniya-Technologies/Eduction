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


  const mapClassToId = (className) => {
    const classMap = {
      "Nursery": 0,
      "LKG": 0,
      "UKG": 0,
      "1st": 1,
      "2nd": 2,
      "3rd": 3,
      "4th": 4,
      "5th": 5,
      "6th": 6,
      "7th": 7,
      "8th": 8,
      "9th": 9,
      "10th": 10,
      "11th": 11,
      "12th": 12
    }
    return classMap[className] || 0
  }
  
  const mapSubjectToId = (subjectName) => {
    const subjectMap = {
      "Math": 1,
      "Science": 2,
      "English": 3,
      "Biology - Genetics": 2, // example mapping
      // add more as needed
    }
    return subjectMap[subjectName] || 0
  }
  

  const handleSubmit = async () => {
    if (!videoFile || !thumbnail || !title || !description || !formData.prevClass || !subject) {
      alert("Please fill in all required fields and upload both files.");
      return;
    }
  
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
    if (!token) {
      alert("You must be logged in to upload videos.");
      return;
    }
  
    const payload = new FormData();
    payload.append("title", title);
    payload.append("Description", description);
    payload.append("deleted", false);
    payload.append("draft", false);
    payload.append("owner", 6); // You can make this dynamic if needed
    payload.append("thumbnail", thumbnail);
    payload.append("video", videoFile);
    payload.append("class_obj", formData.prevClass);
    payload.append("subject", subject);
    // payload.append("class_obj", 1);
    // payload.append("subject", 1);

    try {
      const response = await fetch("https://api.mypratham.com/school/upload-video/", {
        method: "POST",
        headers: {
          Authorization: `token ${token}`
          // Authorization: `token 3e2f9dd75edc48bd36c8bc6434a2211c8d8f7a67`
          // Do NOT set 'Content-Type' manually when using FormData
        },
        body: payload
      });
  
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }
  
      const result = await response.json();
      console.log("Video uploaded:", result);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Video upload failed.");
    }
  };
  

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
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
