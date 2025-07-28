'use client'
import React, { useState } from 'react'
import Select from 'react-select'

const classOptions = [
  { value: 'Class 1', label: 'Class 1' },
  { value: 'Class 2', label: 'Class 2' },
  { value: 'Class 3', label: 'Class 3' },
  { value: 'Class 4', label: 'Class 4' },
  { value: 'Class 5', label: 'Class 5' },
  { value: 'Class 6', label: 'Class 6' },
  { value: 'Class 7', label: 'Class 7' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 12', label: 'Class 12' },
]

const subjectOptions = [
  { value: 'Math', label: 'Math' },
  { value: 'Science', label: 'Science' },
  { value: 'English', label: 'English' },
  { value: 'Social Studies', label: 'Social Studies' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'History', label: 'History' },
  { value: 'Geography', label: 'Geography' },
  { value: 'Civics', label: 'Civics' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Environmental Science', label: 'Environmental Science' },
  { value: 'General Knowledge', label: 'General Knowledge' },
  { value: 'Moral Science', label: 'Moral Science' },
  { value: 'Sanskrit', label: 'Sanskrit' },
  { value: 'Physical Education', label: 'Physical Education' },
  { value: 'Art', label: 'Art' },
  { value: 'Music', label: 'Music' },
  { value: 'Commerce', label: 'Commerce' },
  { value: 'Business Studies', label: 'Business Studies' },
  { value: 'Accountancy', label: 'Accountancy' },
  { value: 'Political Science', label: 'Political Science' },
  { value: 'Psychology', label: 'Psychology' },
  { value: 'Sociology', label: 'Sociology' },
  { value: 'Philosophy', label: 'Philosophy' },
]

const AddTeacherForm = () => {
  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [formData, setFormData] = useState({
    teacherName: '',
    email: '',
    mobile: '',
  })
  const [errors, setErrors] = useState({ email: '', mobile: '' })

  const handleClassChange = (selectedOptions) => setSelectedClasses(selectedOptions)
  const handleSubjectChange = (selectedOptions) => setSelectedSubjects(selectedOptions)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-full mx-auto p-4 bg-white shadow rounded-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Teacher Name</label>
        <input
          type="text"
          name="teacherName"
          value={formData.teacherName}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter mobile number"
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Assign Classes</label>
        <Select
          isMulti
          name="classes"
          options={classOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select classes..."
          value={selectedClasses}
          onChange={handleClassChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Assign Subjects</label>
        <Select
          isMulti
          name="subjects"
          options={subjectOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select subjects..."
          value={selectedSubjects}
          onChange={handleSubjectChange}
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Teacher
      </button>
    </div>
  )
}

export default AddTeacherForm
