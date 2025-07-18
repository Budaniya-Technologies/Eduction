"use client";

import { useState } from "react";
import { apiPost } from "../../Utils/http"; // Adjust path as needed

const Location = ({ children }) => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const requestLocation = async () => {
    setLoading(true);
    setErrorMsg("");

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const payload = { latitude, longitude };

        try {
          await apiPost("authapp/api/auth/get-locations/", payload);
          setLocationGranted(true);
        } catch (error) {
          console.error("API Error:", error);
          setErrorMsg("Failed to send location.");
        } finally {
          setLoading(false);
          setShowConfirmPopup(false);
        }
      },
      (error) => {
        if (error.code === 1) {
          setErrorMsg("Permission denied. Please allow location access.");
        } else {
          setErrorMsg("Unable to access location.");
        }
        setLoading(false);
        setShowConfirmPopup(false);
      }
    );
  };

  const handleTryAgain = () => {
    setShowConfirmPopup(true);
    setErrorMsg("");
  };

  const handleConfirmYes = () => {
    requestLocation();
  };

  const handleConfirmNo = () => {
    setShowConfirmPopup(false);
    setErrorMsg("Location access was declined.");
  };

  if (!locationGranted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 z-50 flex flex-col items-center justify-center text-center px-6">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full border-4 border-dashed border-blue-300 animate-fadeIn">
          <h2 className="text-3xl font-extrabold text-pink-600 mb-4 font-[Comic Sans MS]">Hello! 📚</h2>
          <p className="text-lg text-blue-800 mb-4 font-semibold">We need your location to help you explore cool things nearby!</p>

          {errorMsg && <p className="text-red-500 font-bold mb-4">{errorMsg}</p>}

          {loading ? (
            <p className="text-purple-500 animate-pulse text-md font-semibold mb-4">🛰️ Finding your location...</p>
          ) : showConfirmPopup ? (
            <div className="flex flex-col items-center">
              <p className="mb-4 text-blue-700 font-medium">Would you like to allow location access?</p>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmYes}
                  className="px-6 py-2 bg-green-400 hover:bg-green-500 text-white rounded-full shadow-md transition-all font-bold"
                >
                  ✅ Yes!
                </button>
                <button
                  onClick={handleConfirmNo}
                  className="px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded-full shadow-md transition-all font-bold"
                >
                  ❌ No
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleTryAgain}
              className="mt-2 px-8 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full font-bold shadow-lg transition-all"
            >
              🚀 Try Again!
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Location;
