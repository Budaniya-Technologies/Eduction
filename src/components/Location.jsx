"use client";

import { useEffect, useState } from "react";
import { apiPost } from "../../Utils/http";

const Location = ({ children }) => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  useEffect(() => {
    const granted = sessionStorage.getItem("locationAccessGranted");
    if (granted === "true") {
      setLocationGranted(true);
    } else {
      handleConfirm();
    }
  }, []);

  const handleConfirm = async () => {
    const confirmed = window.confirm("Do you want to allow location access?");
    setHasConfirmed(true);

    if (!confirmed) {
      return; // Do not proceed
    }

    if (!navigator.geolocation) {
      console.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const payload = { latitude, longitude };

        try {
          await apiPost("authapp/api/auth/get-locations/", payload);
          sessionStorage.setItem("locationAccessGranted", "true");
          setLocationGranted(true);
        } catch (error) {
          console.error("API Error:", error);
        }
      },
      (error) => {
        console.error("Location access denied or failed.", error);
      }
    );
  };

  // Block access with blur if location not granted
  if (!locationGranted) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-50 flex items-center justify-center">
          {!hasConfirmed && (
            <p className="text-xl font-semibold text-gray-700">
              Requesting location access...
            </p>
          )}
          {hasConfirmed && (
            <p className="text-xl font-semibold text-red-600 text-center px-6">
              Location access is required to use this site. Please refresh and allow location.
            </p>
          )}
        </div>
        {/* Render children but keep them blurred */}
        <div className="pointer-events-none blur-sm select-none">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Location;
