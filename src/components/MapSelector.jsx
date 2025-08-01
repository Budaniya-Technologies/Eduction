'use client';
import React, { useRef, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '300px',
};
const defaultCenter = {
  lat: 26.9124,
  lng: 75.7873,
};
const zoom = 13;

const MapSelector = ({ lat, lng, setLat, setLng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const autocompleteRef = useRef(null);

  const handleLocationChange = (latVal, lngVal) => {
    setLat(latVal.toFixed(6));
    setLng(lngVal.toFixed(6));
  };

  const onMapClick = useCallback((e) => {
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();
    handleLocationChange(clickedLat, clickedLng);
  }, []);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place?.geometry?.location) {
      alert('Invalid location selected.');
      return;
    }
    const location = place.geometry.location;
    handleLocationChange(location.lat(), location.lng());
  };

  if (!isLoaded) return <p className="text-center text-gray-600">Loading Map...</p>;

  const currentLat = parseFloat(lat) || defaultCenter.lat;
  const currentLng = parseFloat(lng) || defaultCenter.lng;

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <Autocomplete
        onLoad={(autoC) => (autocompleteRef.current = autoC)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
      </Autocomplete>

      <div className="w-full h-[300px] rounded-md overflow-hidden border border-gray-200">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={{ lat: currentLat, lng: currentLng }}
          onClick={onMapClick}
        >
          {lat && lng && (
            <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
          )}
        </GoogleMap>
      </div>
    </section>
  );
};

export default MapSelector;
