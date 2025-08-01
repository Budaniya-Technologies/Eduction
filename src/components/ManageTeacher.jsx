'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchTeachers = async () => {
      try {
        const res = await axios.get('https://api.mypratham.com/school/teacher/list/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setTeachers(res.data);
        } else {
          console.error('Unexpected teacher list structure:', res.data);
        }
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      }
    };

    fetchTeachers();
  }, [token]);

  const startEdit = (t) => {
    setEditingId(t.id);
    const nameParts = t.name.split(' ');
    setEditData({
      first_name: nameParts[0] || '',
      last_name: nameParts[1] || '',
      phone_number: t.phone || '',
      address: t.address || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({
      first_name: '',
      last_name: '',
      phone_number: '',
      address: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    if (!token || !editingId) return;

    try {
      const response = await axios.patch(
        `https://api.mypratham.com/school/teacher/update/${editingId}/`,
        editData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update local state
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? {
                ...t,
                name: `${editData.first_name} ${editData.last_name}`,
                phone: editData.phone_number,
                address: editData.address,
              }
            : t
        )
      );
      cancelEdit();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Manage Teachers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) =>
              editingId === t.id ? (
                <tr key={t.id} className="bg-yellow-50">
                  <td className="px-4 py-2 border">
                    <input
                      name="first_name"
                      value={editData.first_name}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm mb-1"
                      placeholder="First Name"
                    />
                    <input
                      name="last_name"
                      value={editData.last_name}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                      placeholder="Last Name"
                    />
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    <input
                      name="email"
                      value={t.email}
                      className="w-full border rounded px-2 py-1 text-sm"
                      disabled
                    />
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    <input
                      name="phone_number"
                      value={editData.phone_number}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <button onClick={saveChanges} className="text-green-600 hover:underline mr-2">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="text-gray-600 hover:underline">
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-sm">{t.name}</td>
                  <td className="px-4 py-2 border text-sm">{t.email}</td>
                  <td className="px-4 py-2 border text-sm">{t.phone}</td>
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
