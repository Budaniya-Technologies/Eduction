// components/ManageTeachers.jsx
'use client';

import React, { useState } from 'react';
import Select from 'react-select';

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
];

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
  { value: 'Commerce', label: 'Commerce' },
  { value: 'Business Studies', label: 'Business Studies' },
  { value: 'Accountancy', label: 'Accountancy' },
  { value: 'Political Science', label: 'Political Science' },
  { value: 'Psychology', label: 'Psychology' },
  { value: 'Sociology', label: 'Sociology' },
  { value: 'Philosophy', label: 'Philosophy' },
];

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      teacherName: 'Anita Sharma',
      email: 'anita.sharma@example.com',
      mobile: '9876543210',
      classes: [
        { value: 'Class 10', label: 'Class 10' },
        { value: 'Class 9', label: 'Class 9' },
      ],
      subjects: [
        { value: 'Math', label: 'Math' },
        { value: 'Science', label: 'Science' },
      ],
    },
    {
      id: 2,
      teacherName: 'Ravi Mehta',
      email: 'ravi.mehta@example.com',
      mobile: '9123456780',
      classes: [{ value: 'Class 11', label: 'Class 11' }],
      subjects: [
        { value: 'Physics', label: 'Physics' },
        { value: 'Chemistry', label: 'Chemistry' },
      ],
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditData({ ...t });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveChanges = () => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === editingId ? { ...editData, id: t.id } : t))
    );
    cancelEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
        Manage Teachers
      </h2>

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-4">
        {teachers.map((t) => (
          <div key={t.id} className="bg-white rounded-lg shadow p-4 space-y-3">
            {editingId === t.id ? (
              <>
                <input
                  name="teacherName"
                  value={editData.teacherName}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <input
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <input
                  name="mobile"
                  value={editData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <div>
                  <label className="block text-sm font-medium mb-1">Classes</label>
                  <Select
                    isMulti
                    options={classOptions}
                    value={editData.classes}
                    onChange={(sel) =>
                      setEditData((p) => ({ ...p, classes: sel }))
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subjects</label>
                  <Select
                    isMulti
                    options={subjectOptions}
                    value={editData.subjects}
                    onChange={(sel) =>
                      setEditData((p) => ({ ...p, subjects: sel }))
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={saveChanges}
                    className="bg-green-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-4 py-2 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-lg font-medium">{t.teacherName}</div>
                <div className="text-sm text-gray-600">{t.email}</div>
                <div className="text-sm text-gray-600">{t.mobile}</div>
                <div className="flex flex-wrap gap-1">
                  {t.classes.map((c) => (
                    <span
                      key={c.value}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {t.subjects.map((s) => (
                    <span
                      key={s.value}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => startEdit(t)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['Name', 'Email', 'Mobile', 'Classes', 'Subjects', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) =>
              editingId === t.id ? (
                <tr key={t.id} className="bg-yellow-50">
                  <td className="px-3 py-2 border">
                    <input
                      name="teacherName"
                      value={editData.teacherName}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      name="mobile"
                      value={editData.mobile}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2 border min-w-[200px]">
                    <Select
                      isMulti
                      options={classOptions}
                      value={editData.classes}
                      onChange={(sel) =>
                        setEditData((p) => ({ ...p, classes: sel }))
                      }
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </td>
                  <td className="px-3 py-2 border min-w-[200px]">
                    <Select
                      isMulti
                      options={subjectOptions}
                      value={editData.subjects}
                      onChange={(sel) =>
                        setEditData((p) => ({ ...p, subjects: sel }))
                      }
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </td>
                  <td className="px-3 py-2 border space-x-2">
                    <button
                      onClick={saveChanges}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-600 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-sm">{t.teacherName}</td>
                  <td className="px-4 py-2 border text-sm">{t.email}</td>
                  <td className="px-4 py-2 border text-sm">{t.mobile}</td>
                  <td className="px-4 py-2 border text-sm">
                    {t.classes.map((c) => c.label).join(', ')}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    {t.subjects.map((s) => s.label).join(', ')}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    <button
                      onClick={() => startEdit(t)}
                      className="text-blue-600 hover:underline"
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
}
