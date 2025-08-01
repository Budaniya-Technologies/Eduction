'use client'
import React, { useState } from 'react'
import Select from 'react-select'

const classOptions = [
  { value: 1, label: 'Class 1' },
  { value: 2, label: 'Class 2' },
  // ... up to Class 12
]

const subjectOptions = [
  { value: 1, label: 'Math' },
  { value: 2, label: 'Science' },
  // ... up to 27 subjects
]

const AddTeacherForm = () => {
  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [formData, setFormData] = useState({
    teacherName: '',
    email: '',
    mobile: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const handleClassChange = (selected) => setSelectedClasses(selected)
  const handleSubjectChange = (selected) => setSelectedSubjects(selected)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token missing. Please log in again.')
      return
    }

    const [firstName, ...rest] = formData.teacherName.trim().split(' ')
    const lastName = rest.join(' ') || ''

    const payload = {
      username: formData.email.split('@')[0],
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      phone_number: formData.mobile,
      password: 'Pass@123', // Default password
      lecturer_profile: {
        qulification: 1,
        l_ctc: 400000,
        l_charges: 500,
        l_address: 'Jaipur',
        l_pin: '302001',
        solo_tution: true,
        is_nego: true,
        is_active: true,
        board:[1],
        course: [1],
        medium: 'BOTH',
        address: 'Some address',
        geolocation: '26.9124, 75.7873',
      },
    }

    try {
      const res = await fetch('https://api.mypratham.com/authapp/api/auth/admin/teacher/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Teacher registered successfully')
        setFormData({ teacherName: '', email: '', mobile: '' })
        setSelectedClasses([])
        setSelectedSubjects([])
        setErrors({})
      } else {
        setMessage(`❌ Error: ${data.message || 'Something went wrong'}`)
        console.error(data)
      }
    } catch (err) {
      console.error(err)
      setMessage('❌ Network error.')
    }
  }

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow rounded-md space-y-6">
      <h2 className="text-2xl font-bold">Add Teacher</h2>

      <div>
        <label className="block mb-1 font-medium">Teacher Name</label>
        <input
          type="text"
          name="teacherName"
          value={formData.teacherName}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter mobile number"
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Assign Classes</label>
        <Select
          isMulti
          name="classes"
          options={classOptions}
          value={selectedClasses}
          onChange={handleClassChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Assign Subjects</label>
        <Select
          isMulti
          name="subjects"
          options={subjectOptions}
          value={selectedSubjects}
          onChange={handleSubjectChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Teacher
      </button>

      {message && <div className="mt-4 text-blue-600 text-sm">{message}</div>}
    </div>
  )
}

export default AddTeacherForm
