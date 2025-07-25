// components/ManageStudents.tsx
'use client';

import React, { useState, useMemo } from 'react';

const dummyStudents = [
  /* same dummy data */
  { id: 1, admissionNo: 'A102', studentName: 'Ravi Kumar', fatherName: 'Mukesh Kumar', motherName: 'Sita Devi', dob: '15/08/2012', gender: 'Male', caste: 'OBC', school: 'Govt. Sr. Sec. School', mobile: '9876543210', district: 'Jaipur', prevClass: '5th', stream: '', }, { id: 2, admissionNo: 'A103', studentName: 'Anjali Meena', fatherName: 'Sohan Meena', motherName: 'Poonam Devi', dob: '10/10/2010', gender: 'Female', caste: 'ST', school: 'State Private School', mobile: '8888899999', district: 'Udaipur', prevClass: '8th', stream: 'Science', }, { id: 3, admissionNo: 'A104', studentName: 'Suresh Yadav', fatherName: 'Mahesh Yadav', motherName: 'Radha Yadav', dob: '22/01/2011', gender: 'Male', caste: 'OBC', school: 'Shri Ram Public School', mobile: '9876512345', district: 'Ajmer', prevClass: '7th', stream: 'Commerce', }, { id: 4, admissionNo: 'A105', studentName: 'Priya Sharma', fatherName: 'Rakesh Sharma', motherName: 'Sunita Sharma', dob: '05/05/2013', gender: 'Female', caste: 'General', school: 'DAV School', mobile: '9823456789', district: 'Kota', prevClass: '6th', stream: '', }, { id: 5, admissionNo: 'A106', studentName: 'Amit Singh', fatherName: 'Devendra Singh', motherName: 'Kusum Singh', dob: '12/12/2009', gender: 'Male', caste: 'General', school: 'Army School', mobile: '9812345678', district: 'Jodhpur', prevClass: '9th', stream: 'Science', }, {
    id: 6,
    admissionNo: 'A107',
    studentName: 'Kajal Verma',
    fatherName: 'Manoj Verma',
    motherName: 'Kamla Verma',
    dob: '18/03/2012',
    gender: 'Female',
    caste: 'SC',
    school: 'Govt. Girls School',
    mobile: '9801234567',
    district: 'Bikaner',
    prevClass: '8th',
    stream: 'Arts',
  },
  {
    id: 7,
    admissionNo: 'A108',
    studentName: 'Rahul Jain',
    fatherName: 'Dinesh Jain',
    motherName: 'Renu Jain',
    dob: '30/06/2011',
    gender: 'Male',
    caste: 'General',
    school: 'Jain Public School',
    mobile: '9798765432',
    district: 'Alwar',
    prevClass: '7th',
    stream: '',
  },
  {
    id: 8,
    admissionNo: 'A109',
    studentName: 'Meena Devi',
    fatherName: 'Laxman Lal',
    motherName: 'Geeta Bai',
    dob: '25/09/2010',
    gender: 'Female',
    caste: 'ST',
    school: 'Govt. Kanya Vidyalaya',
    mobile: '9787654321',
    district: 'Barmer',
    prevClass: '9th',
    stream: 'Arts',
  },
  {
    id: 9,
    admissionNo: 'A110',
    studentName: 'Deepak Saini',
    fatherName: 'Omprakash Saini',
    motherName: 'Shanti Saini',
    dob: '14/04/2011',
    gender: 'Male',
    caste: 'OBC',
    school: 'Sunrise Public School',
    mobile: '9765432109',
    district: 'Sikar',
    prevClass: '8th',
    stream: 'Science',
  },
  {
    id: 10,
    admissionNo: 'A111',
    studentName: 'Nikita Choudhary',
    fatherName: 'Suresh Choudhary',
    motherName: 'Sarita Choudhary',
    dob: '07/11/2012',
    gender: 'Female',
    caste: 'General',
    school: 'Modern Girls School',
    mobile: '9754321098',
    district: 'Churu',
    prevClass: '6th',
    stream: '',
  },
  {
    id: 11,
    admissionNo: 'A112',
    studentName: 'Rohan Sharma',
    fatherName: 'Prakash Sharma',
    motherName: 'Meena Sharma',
    dob: '15/03/2013',
    gender: 'Male',
    caste: 'General',
    school: 'Sunrise Public School',
    mobile: '9876543210',
    district: 'Jaipur',
    prevClass: '6th',
    stream: '',
  },
  {
    id: 12,
    admissionNo: 'A113',
    studentName: 'Priya Singh',
    fatherName: 'Rajesh Singh',
    motherName: 'Anjali Singh',
    dob: '01/09/2012',
    gender: 'Female',
    caste: 'OBC',
    school: 'Greenwood High',
    mobile: '9123456789',
    district: 'Jodhpur',
    prevClass: '6th',
    stream: '',
  },
  {
    id: 13,
    admissionNo: 'A114',
    studentName: 'Amit Kumar',
    fatherName: 'Vijay Kumar',
    motherName: 'Seema Devi',
    dob: '22/06/2013',
    gender: 'Male',
    caste: 'SC',
    school: 'Sarvodaya School',
    mobile: '8765432109',
    district: 'Alwar',
    prevClass: '6th',
    stream: '',
  },
  {
    id: 14,
    admissionNo: 'A115',
    studentName: 'Shalini Gupta',
    fatherName: 'Anil Gupta',
    motherName: 'Poonam Gupta',
    dob: '03/02/2012',
    gender: 'Female',
    caste: 'General',
    school: 'City Montessori School',
    mobile: '7654321098',
    district: 'Udaipur',
    prevClass: '6th',
    stream: '',
  },
  {
    id: 15,
    admissionNo: 'A116',
    studentName: 'Mohit Yadav',
    fatherName: 'Ramprasad Yadav',
    motherName: 'Geeta Yadav',
    dob: '19/12/2012',
    gender: 'Male',
    caste: 'OBC',
    school: 'National Convent School',
    mobile: '9988776655',
    district: 'Kota',
    prevClass: '6th',
    stream: '',
  },
];

const ManageStudents: React.FC = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [filterClass, setFilterClass] = useState<string>('All');

  const startEdit = (s: any) => {
    setEditingId(s.id);
    setEditData({ ...s });
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };
  const saveChanges = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editingId ? { ...editData, id: s.id } : s
      )
    );
    setEditingId(null);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((p: any) => ({ ...p, [name]: value }));
  };

  // derive unique classes for filter dropdown
  const classOptions = useMemo(() => {
    const setClasses = new Set(students.map((s) => s.prevClass || ''));
    return ['All', ...Array.from(setClasses).filter((c) => c)];
  }, [students]);

  // apply filter
  const filtered = useMemo(() => {
    return filterClass === 'All'
      ? students
      : students.filter((s) => s.prevClass === filterClass);
  }, [students, filterClass]);

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
        Manage Students
      </h2>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label
          htmlFor="classFilter"
          className="text-sm font-medium text-gray-700"
        >
          Filter by Class:
        </label>
        <select
          id="classFilter"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filtered.map((st) => (
          <div
            key={st.id}
            className="bg-white rounded-lg shadow p-4"
          >
            {editingId === st.id ? (
              <>
                <div className="space-y-2">
                  {[
                    'admissionNo',
                    'studentName',
                    'fatherName',
                    'motherName',
                    'dob',
                    'gender',
                    'caste',
                    'district',
                    'school',
                    'prevClass',
                    'stream',
                    'mobile',
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-medium text-gray-600">
                        {field}
                      </label>
                      {field === 'gender' ? (
                        <select
                          name={field}
                          value={editData[field]}
                          onChange={handleChange}
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      ) : (
                        <input
                          name={field}
                          value={editData[field]}
                          onChange={handleChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={saveChanges}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Admission No</p>
                    <p className="font-medium">{st.admissionNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">{st.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Prev Class</p>
                    <p className="font-medium">{st.prevClass}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="font-medium">{st.mobile}</p>
                  </div>
                  {/* add any two more key fields as needed */}
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => startEdit(st)}
                    className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {[
                'Admission No',
                'Student Name',
                'Father Name',
                'Mother Name',
                'DOB',
                'Gender',
                'Caste',
                'District',
                'School',
                'Prev Class',
                'Stream',
                'Mobile',
                'Action',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-gray-600 uppercase px-3 py-2"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((st) =>
              editingId === st.id ? (
                <tr key={st.id} className="bg-yellow-50">
                  {[
                    'admissionNo',
                    'studentName',
                    'fatherName',
                    'motherName',
                    'dob',
                    'gender',
                    'caste',
                    'district',
                    'school',
                    'prevClass',
                    'stream',
                    'mobile',
                  ].map((field) => (
                    <td
                      key={field}
                      className="px-2 py-1 border-t text-sm"
                    >
                      {field === 'gender' ? (
                        <select
                          name={field}
                          value={editData[field]}
                          onChange={handleChange}
                          className="w-full border rounded px-1 py-1 text-sm"
                        >
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      ) : (
                        <input
                          name={field}
                          value={editData[field]}
                          onChange={handleChange}
                          className="w-full border rounded px-1 py-1 text-sm"
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-2 py-1 border-t text-sm space-x-1">
                    <button
                      onClick={saveChanges}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={st.id} className="hover:bg-gray-50">
                  {[
                    st.admissionNo,
                    st.studentName,
                    st.fatherName,
                    st.motherName,
                    st.dob,
                    st.gender,
                    st.caste,
                    st.district,
                    st.school,
                    st.prevClass,
                    st.stream || '–',
                    st.mobile,
                  ].map((val, idx) => (
                    <td
                      key={idx}
                      className="px-3 py-2 border-t text-sm text-gray-700"
                    >
                      {val}
                    </td>
                  ))}
                  <td className="px-3 py-2 border-t text-sm">
                    <button
                      onClick={() => startEdit(st)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
