'use client'
import React, { useState, useMemo } from 'react'

const districts = ['Ajmer', 'Jaipur', 'Udaipur', 'Jodhpur', 'Sirohi', 'Kota', 'Bikaner']
const blocks = ['Block A', 'Block B', 'Block C']
const classes = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
const castes = ['General', 'OBC', 'SC', 'ST']
const streams = ['Science', 'Commerce', 'Arts']

const StudentAdmissionForm = () => {
  const [formData, setFormData] = useState({
    admissionNo: '',
    registrationDate: '',
    studentName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    category: '',
    caste: '',
    religion: '',
    nationality: '',
    siblings: ['', ''],
    ability: '',
    district: '',
    block: '',
    school: '',
    schoolType: '',
    prevClass: '',
    resultStatus: '',
    stream: '',
    mobile: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateDate = (dateStr) => /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Session expired. Please log in again.')
      return
    }

    if (!formData.studentName || !formData.mobile) {
      alert('Student name and mobile are required.')
      return
    }

    const [firstName = '', lastName = ''] = formData.studentName.trim().split(' ')
    const email = `${formData.studentName.toLowerCase().replace(/\s+/g, '')}@example.com`

    const payload = {
      username: formData.admissionNo || `student_${Date.now()}`,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: formData.mobile,
      address: formData.district || 'Unknown',
      password: 'Student@123',
      user_role_selected: ['student'],
    }

    try {
      const res = await fetch('https://api.mypratham.com/authapp/api/auth/admin/teacher/student/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (res.ok) {
        alert('✅ Student created successfully.\nUser ID: ' + result.user_id)
      } else {
        console.error(result)
        alert('❌ Failed: ' + (result.message || 'Unknown error'))
      }
    } catch (error) {
      console.error(error)
      alert('❌ Network error. Please try again later.')
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow space-y-8">
      <h2 className="text-3xl font-bold text-blue-700 text-center">Student Admission Form</h2>

      {/* Personal Details */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label>Admission No.
            <input type="text" name="admissionNo" className="input w-full mt-1" onChange={handleChange} />
          </label>

          <label>Date of Registration (DD/MM/YYYY)
            <input
              type="text"
              name="registrationDate"
              placeholder="DD/MM/YYYY"
              className={`input w-full mt-1 ${
                formData.registrationDate === '' ? 'border-gray-300' : validateDate(formData.registrationDate) ? 'border-green-500' : 'border-red-500'
              }`}
              onChange={handleChange}
            />
          </label>

          <label>Student Name
            <input type="text" name="studentName" className="input w-full mt-1" onChange={handleChange} />
          </label>

          <label>Father's Name
            <input type="text" name="fatherName" className="input w-full mt-1" onChange={handleChange} />
          </label>

          <label>Mother's Name
            <input type="text" name="motherName" className="input w-full mt-1" onChange={handleChange} />
          </label>

          <label>Date of Birth
            <input type="date" name="dob" className="input w-full mt-1" onChange={handleChange} />
          </label>

          <label>Gender
            <select name="gender" className="input w-full mt-1" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>

          <label>Category
            <select name="category" className="input w-full mt-1" onChange={handleChange}>
              <option value="">Select Category</option>
              {castes.map((caste) => <option key={caste}>{caste}</option>)}
            </select>
          </label>
        </div>
      </section>

      {/* Special Ability */}
      <section>
        <label>Special Ability
          <textarea name="ability" className="input w-full mt-1" rows={3} onChange={handleChange} />
        </label>
      </section>

      {/* Academic Info */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>
        <label>Class
          <input list="classes" name="prevClass" className="input w-full mt-1" onChange={handleChange} />
          <datalist id="classes">{classes.map((c) => <option key={c} value={c} />)}</datalist>
        </label>

        <label className="mt-4">Stream for Class XI (if applicable)
          <select name="stream" className="input w-full mt-1" onChange={handleChange}>
            <option value="">Select Stream</option>
            {streams.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </section>

      {/* Contact Info */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
        <label>Parent's Mobile Number
          <input type="text" name="mobile" className="input w-full mt-1" onChange={handleChange} />
        </label>
      </section>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full font-semibold mt-8"
        onClick={handleSubmit}
      >
        Submit Admission
      </button>
    </div>
  )
}

export default StudentAdmissionForm
