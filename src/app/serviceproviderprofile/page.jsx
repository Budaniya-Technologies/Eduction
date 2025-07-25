'use client';
import React, { useState, Suspense, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapSelector = dynamic(() => import('@/components/MapSelector'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const initialProfile = {
  username: 'puniDhakad',
  email: 'punit@example.com',
  phone: '9004841267',
  address: 'Jaipur, India',
  user_type: 'student',
  preferences: ['student'],
  franchises: [{ name: 'Pratham Jaipur', location: 'Jaipur' }],
  logo: null,
};

export default function UserProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [newFranchise, setNewFranchise] = useState({ name: '', location: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const preferencesList = ['student', 'job seeker', 'business seeker'];

  const handleInput = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
      setProfile((prev) => ({ ...prev, logo: file }));
    }
  };

  const togglePreference = useCallback((pref) => {
    setProfile((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
  }, []);

  const addOrUpdateFranchise = () => {
    if (!newFranchise.name || !newFranchise.location) return;

    setProfile((prev) => {
      const updated = [...prev.franchises];
      if (editingIndex !== null) {
        updated[editingIndex] = newFranchise;
      } else {
        updated.push(newFranchise);
      }
      return { ...prev, franchises: updated };
    });

    setNewFranchise({ name: '', location: '' });
    setEditingIndex(null);
  };

  const removeFranchise = (index) =>
    setProfile((prev) => ({
      ...prev,
      franchises: prev.franchises.filter((_, i) => i !== index),
    }));

  const editFranchise = (index) => {
    setNewFranchise(profile.franchises[index]);
    setEditingIndex(index);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingIndex(null);
    console.log('Saved Profile:', profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setNewFranchise({ name: '', location: '' });
  };

  return (
    <div className="max-w-full bg-white text-black mx-auto p-10 space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
        <Image
          src={previewLogo || '/default-user.webp'}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full object-cover border"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="text-sm"
          />
        )}
      </div>

      {/* Basic Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['username', 'email', 'phone', 'address'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">{field}</label>
            {isEditing ? (
              <input
                type="text"
                value={profile[field]}
                onChange={handleInput(field)}
                className="w-full border rounded px-3 py-1 mt-1"
              />
            ) : (
              <p className="text-gray-700 mt-1">{profile[field]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Preferences</h3>
        <div className="flex gap-3 flex-wrap">
          {preferencesList.map((pref) => {
            const active = profile.preferences.includes(pref);
            return (
              <button
                key={pref}
                onClick={() => isEditing && togglePreference(pref)}
                className={`px-3 py-1 rounded border ${
                  active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {active ? '✓ ' : ''}{pref}
              </button>
            );
          })}
        </div>
      </div>

      {/* Franchises Section */}
      <div>
        <h3 className="text-lg font-semibold">Franchises</h3>
        {isEditing ? (
          <div className="space-y-4">
            {/* Form */}
            <div className="space-y-3 bg-gray-50 border p-4 rounded">
              <input
                type="text"
                placeholder="Franchise Name"
                value={newFranchise.name}
                onChange={(e) =>
                  setNewFranchise((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border rounded px-3 py-1"
              />
              <Suspense fallback={<p>Loading map...</p>}>
                <MapSelector
                  onLocationSelect={(lat, lng, loc) =>
                    setNewFranchise((prev) => ({ ...prev, location: loc }))
                  }
                />
              </Suspense>
              <button
                onClick={addOrUpdateFranchise}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                {editingIndex !== null ? 'Update Franchise' : 'Add Franchise'}
              </button>
            </div>

            {/* Franchise List */}
            {profile.franchises.map((f, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-2 rounded bg-gray-100"
              >
                <div>
                  <p><strong>Name:</strong> {f.name}</p>
                  <p><strong>Location:</strong> {f.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editFranchise(i)} className="text-blue-600 underline">Edit</button>
                  <button onClick={() => removeFranchise(i)} className="text-red-600 underline">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {profile.franchises.map((f, i) => (
              <div key={i} className="border p-2 rounded bg-gray-100">
                <p><strong>Name:</strong> {f.name}</p>
                <p><strong>Location:</strong> {f.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save / Edit Buttons */}
      <div className="flex justify-end gap-3">
        {isEditing ? (
          <>
            <button onClick={handleCancel} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
