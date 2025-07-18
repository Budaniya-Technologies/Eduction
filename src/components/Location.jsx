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
      <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Enable Location Access</h2>
        <p className="mb-4">Please enable location to continue using the website.</p>

        {errorMsg && <p className="text-red-400 mb-4">{errorMsg}</p>}

        {loading ? (
          <p className="animate-pulse mb-4">Requesting location...</p>
        ) : showConfirmPopup ? (
          <div className="flex flex-col items-center">
            <p className="mb-4">Do you want to enable location access?</p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmYes}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
              >
                Allow
              </button>
              <button
                onClick={handleConfirmNo}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
              >
                Don't Allow
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleTryAgain}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default Location;
