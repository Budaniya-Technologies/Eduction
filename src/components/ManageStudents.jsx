'use client';

import React, { useEffect, useState } from 'react';

const API_BASE = 'https://api.mypratham.com';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [token, setToken] = useState(null);

  // Get token from localStorage on client
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch students when token is available
  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/school/student/list/`, {
      headers: {
        Authorization: `Token ${token}`,
        // Authorization: `Token 986318674d7bb427e94dfc02ee3ce6ccf09b5632`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else if (Array.isArray(data.students)) {
          setStudents(data.students);
        } else {
          console.error('Unexpected student list response:', data);
          setStudents([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching students:', err);
        setStudents([]);
      });
  }, [token]);

  const startEdit = (s) => {
    setEditingId(s.id);
    setEditData({
      first_name: s.name.split(' ')[0] || '',
      last_name: s.name.split(' ')[1] || '',
      phone_number: s.phone || '',
      address: s.address || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveChanges = () => {
    if (!token || !editingId) return;

    fetch(`${API_BASE}/school/student/update/${editingId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(editData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === editingId
              ? {
                  ...s,
                  name: `${updated.first_name} ${updated.last_name}`,
                  phone: updated.phone_number,
                  address: updated.address,
                }
              : s
          )
        );
        cancelEdit();
      })
      .catch((err) => console.error('Update failed:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Manage Students</h2>

      <div className="space-y-4">
        {students.map((st) => (
          <div key={st.id} className="bg-white shadow p-4 rounded">
            {editingId === st.id ? (
              <div className="space-y-2">
                <input
                  name="first_name"
                  placeholder="First Name"
                  value={editData.first_name || ''}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-full"
                />
                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={editData.last_name || ''}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-full"
                />
                <input
                  name="phone_number"
                  placeholder="Phone Number"
                  value={editData.phone_number || ''}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-full"
                />
                <input
                  name="address"
                  placeholder="Address"
                  value={editData.address || ''}
                  onChange={handleChange}
                  className="border rounded px-3 py-1 w-full"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveChanges}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">{st.name}</p>
                  <p className="text-xs text-gray-600">{st.email}</p>
                  <p className="text-xs text-gray-600">{st.phone}</p>
                </div>
                <button
                  onClick={() => startEdit(st)}
                  className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudents;
