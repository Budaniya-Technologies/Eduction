'use client';
import React, { useEffect, useState } from 'react';

const initialProfile = {
  name: 'Punit Dhakad',
  email: 'punit@example.com',
  phone: '9004841267',
  address: 'Jaipur, Rajasthan',
  profilePicture: null,
  preferences: [],
};

const services = ['Student', 'Job Seeker', 'Business Seeker'];

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [previewImage, setPreviewImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempProfile({ ...tempProfile, profilePicture: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const togglePreference = (service) => {
    const current = tempProfile.preferences.includes(service);
    const updated = current
      ? tempProfile.preferences.filter((s) => s !== service)
      : [...tempProfile.preferences, service];
    setTempProfile({ ...tempProfile, preferences: updated });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setPreviewImage(null);
  };

  const handleLocationAccept = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setShowLocationModal(false);
        },
        (error) => {
          console.error('Location error:', error);
          setShowLocationModal(false);
        }
      );
    } else {
      console.error('Geolocation is not supported.');
      setShowLocationModal(false);
    }
  };

  const handleLocationDecline = () => {
    setShowLocationModal(false);
  };

  return (
    <>
      {/* Location Prompt Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Allow Location Access</h2>
            <p className="text-gray-600 mb-6">To personalize your experience, we’d like to access your location.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLocationAccept}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Allow
              </button>
              <button
                onClick={handleLocationDecline}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile UI */}
      <div className="max-w-full text-black  bg-white shadow-md p-6 py-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">My Profile</h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={
                previewImage
                  ? previewImage
                  : profile.profilePicture
                  ? URL.createObjectURL(profile.profilePicture)
                  : 'https://via.placeholder.com/150'
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 border-blue-500"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            )}
          </div>
          <p className="text-sm text-gray-600">Click image to upload</p>
        </div>

        {/* Profile Info */}
        <form className="space-y-4">
          {['name', 'email', 'phone', 'address'].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize text-gray-700">{field}</label>
              <input
                type="text"
                name={field}
                value={tempProfile[field]}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 border ${
                  isEditing ? 'border-blue-400' : 'border-gray-300'
                } rounded focus:outline-none focus:ring-2 ${
                  isEditing ? 'focus:ring-blue-400' : 'bg-gray-100'
                }`}
              />
            </div>
          ))}
        </form>

        {/* Preferences */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const subscribed = tempProfile.preferences.includes(service);
              return (
                <div
                  key={service}
                  className="border border-gray-300 rounded p-4 text-center shadow-sm"
                >
                  <p className="font-medium text-gray-700 mb-3">{service}</p>
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={() => togglePreference(service)}
                      className={`px-4 py-2 rounded text-white ${
                        subscribed
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {subscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                  ) : (
                    <p className="text-sm text-gray-600">
                      {subscribed ? 'Subscribed ✅' : 'Not Subscribed'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 text-center">
          {isEditing ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
