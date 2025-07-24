'use client';
import React, { useState, useRef, useCallback } from 'react';
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

const MapSelector = ({ onLocationSelect }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBhp-ITrRHV-ZP6eauxYlTQU-1WvZHA2hM',
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const autocompleteRef = useRef(null);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleLocationChange = (latVal, lngVal, locLabel = '') => {
    setLat(latVal.toFixed(6));
    setLng(lngVal.toFixed(6));
    setMarker({ lat: latVal, lng: lngVal });
    setCenter({ lat: latVal, lng: lngVal });
    onLocationSelect && onLocationSelect(latVal.toFixed(6), lngVal.toFixed(6), locLabel);
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
    const latVal = location.lat();
    const lngVal = location.lng();
    const locLabel = place.formatted_address || place.name;
    handleLocationChange(latVal, lngVal, locLabel);
  };

  if (!isLoaded) return <p className="text-center text-gray-600">Loading Map...</p>;

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
          center={center}
          onClick={onMapClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </div>
    </section>
  );
};

export default MapSelector;
