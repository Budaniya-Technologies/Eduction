"use client";

import { useEffect, useState } from "react";
import { apiPost } from "../../Utils/http";

const Location = ({ children }) => {
  const [locationChecked, setLocationChecked] = useState(false);

  useEffect(() => {
    const granted = sessionStorage.getItem("locationAccessGranted");
    const denied = sessionStorage.getItem("locationAccessDenied");

    // If user already responded before, skip prompt
    if (granted === "true" || denied === "true") {
      setLocationChecked(true);
      return;
    }

    // Ask only once
    handleConfirm();
  }, []);

  const handleConfirm = async () => {
    const confirmed = window.confirm("Do you want to allow location access?");

    if (!confirmed) {
      sessionStorage.setItem("locationAccessDenied", "true");
      setLocationChecked(true);
      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation not supported.");
      sessionStorage.setItem("locationAccessDenied", "true");
      setLocationChecked(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const payload = { latitude, longitude };

        try {
          await apiPost("authapp/api/auth/get-locations/", payload);
          sessionStorage.setItem("locationAccessGranted", "true");
        } catch (error) {
          console.error("API Error:", error);
        } finally {
          setLocationChecked(true);
        }
      },
      (error) => {
        console.error("Location access denied or failed.", error);
        sessionStorage.setItem("locationAccessDenied", "true");
        setLocationChecked(true);
      }
    );
  };

  // Show a loader/message while location check is happening
  if (!locationChecked) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-gray-700">
        Checking location permission...
      </div>
    );
  }

  return <>{children}</>;
};

export default Location;
