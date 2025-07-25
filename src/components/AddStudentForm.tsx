'use client';
import React, { useState } from 'react';

const districts = ['Ajmer', 'Jaipur', 'Udaipur', 'Jodhpur', 'Sirohi', 'Kota', 'Bikaner'];
const blocks = ['Block A', 'Block B', 'Block C'];
const classes = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const castes = ['General', 'OBC', 'SC', 'ST'];
const schoolTypes = ['Govt. School', 'State Private', 'Other State School', 'First Time Study', 'Aayu Anusaar'];
const streams = ['Science', 'Commerce', 'Arts'];

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
    mobile: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [dob, setDob] = useState('');
  const [regDate, setRegDate] = useState('');

  const validateDate = (dateStr) => {
    // Basic check for DD/MM/YYYY format using regex
    return /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr);
  };


  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700">Student Admission Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="admissionNo" placeholder="Admission No." className="input" onChange={handleChange} />
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className={`w-full border rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none
              ${dob === ''
              ? 'border-gray-300'
              : validateDate(dob)
                ? 'border-green-500'
                : 'border-red-500'}`}
        />

        <input type="text" name="studentName" placeholder="Student Name" className="input" onChange={handleChange} />
        <input type="text" name="fatherName" placeholder="Father's Name" className="input" onChange={handleChange} />
        <input type="text" name="motherName" placeholder="Mother's Name" className="input" onChange={handleChange} />

        <input type="date" name="dob" className="input" onChange={handleChange} />

        <select name="gender" className="input" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select name="category" className="input" onChange={handleChange}>
          <option value="">Select Category</option>
          {castes.map(caste => <option key={caste}>{caste}</option>)}
        </select>
      </div>

      <textarea name="ability" placeholder="Special Ability of Child" className="input w-full" onChange={handleChange} />

      {/* School Related Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input list="districts" name="district" placeholder="District" className="input" onChange={handleChange} />
          <datalist id="districts">
            {districts.map((d, i) => <option key={i} value={d} />)}
          </datalist>
        </div>

        <input type="text" name="school" placeholder="School Name" className="input" onChange={handleChange} />
      </div>

      {/* School Type */}
      <div>
        <label className="font-medium">Previous School Type:</label>
        <div className="flex flex-wrap gap-4 mt-2">
          {schoolTypes.map((type, i) => (
            <label key={i} className="flex items-center space-x-2">
              <input type="radio" name="schoolType" value={type} onChange={handleChange} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Result Status */}
      <div>
        <label className="font-medium">Previous Result:</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="resultStatus" value="Pass" onChange={handleChange} />
            Pass
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="resultStatus" value="Fail" onChange={handleChange} />
            Fail
          </label>
        </div>
      </div>

      {/* Previous Class */}
      <div>
        <input list="classes" name="prevClass" placeholder="Previous Class" className="input w-full" onChange={handleChange} />
        <datalist id="classes">
          {classes.map(c => <option key={c} value={c} />)}
        </datalist>
      </div>

      {/* Stream */}
      <div>
        <label className="font-medium">Stream for XI (if applicable)</label>
        <select name="stream" className="input w-full" onChange={handleChange}>
          <option value="">Select Stream</option>
          {streams.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Mobile */}
      <div>
        <input type="text" name="mobile" placeholder="Parent's Mobile Number" className="input w-full" onChange={handleChange} />
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full font-semibold">
        Submit Admission
      </button>
    </div>
  );
};

export default StudentAdmissionForm;
