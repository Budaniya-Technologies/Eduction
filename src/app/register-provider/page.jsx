'use client';
import React, { useState, useRef, useEffect } from 'react';
// import MapSelector from '@/components/MapSelector';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ServiceProviderRegistration = () => {
  const router = useRouter();

  const MapSelector = dynamic(() => import('@/components/MapSelector'), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  useEffect(() => {
    router.push('/register-provider');
  }, [router]);

  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [idPreview, setIdPreview] = useState(null);
  const idFileInputRef = useRef(null);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    address: '',
    docType: '',
    identityNumber: '',
    accountEmail: '',
    accountPhone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [mobileStep, setMobileStep] = useState(1);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateMobileStep = () => {
    let newErrors = {};
    if (mobileStep === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Required';
      if (!formData.phone.trim()) newErrors.phone = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
      if (!formData.address.trim()) newErrors.address = 'Required';
    } else if (mobileStep === 2) {
      if (!formData.docType.trim()) newErrors.docType = 'Required';
      if (!formData.identityNumber.trim()) newErrors.identityNumber = 'Required';
      if (!idPreview) newErrors.idPreview = 'ID Image Required';
    } else if (mobileStep === 3) {
      if (!formData.accountEmail.trim()) newErrors.accountEmail = 'Required';
      if (!formData.accountPhone.trim()) newErrors.accountPhone = 'Required';
      if (!formData.password.trim()) newErrors.password = 'Required';
      if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Required';
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match';
      if (!lat || !lng) newErrors.latlng = 'Select location';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDesktopForm = () => {
    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'Required';
    });
    if (!lat || !lng) newErrors.latlng = 'Select a location on the map';
    if (!idPreview) newErrors.idPreview = 'ID Image Required';
    if (!logoPreview) newErrors.logoPreview = 'Logo Image Required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (isMobile) {
      if (validateMobileStep()) setMobileStep((prev) => prev + 1);
    } else {
      if (validateDesktopForm()) setStep(2);
    }
  };

  const handleBack = () => {
    if (isMobile) {
      if (mobileStep > 1) setMobileStep((prev) => prev - 1);
      else router.push('/');
    } else {
      if (step > 1) setStep(1);
      else router.push('/');
    }
  };

  const handleSubmit = () => {
    const profession = localStorage.getItem('selectedProfession');
    if (validateMobileStep()) {
      switch (profession) {
        case 'school': router.push('/school-dashboard'); break;
        case 'tutor': router.push('/tutor-dashboard'); break;
        case 'business': router.push('/business-dashboard'); break;
        case 'job': router.push('/job-dashboard'); break;
        default: alert('Invalid profession selected.');
      }
    }
    localStorage.removeItem('selectedProfession');
  };

  const renderInput = (label, name, type = 'text', full = false) => (
    <div className={`flex flex-col ${full ? 'col-span-2' : ''}`}>
      <label className="font-medium text-gray-800">{label}</label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
      />
    </div>
  );

  const renderImageUpload = (label, preview, setPreview, inputRef) => (
    <div>
      <label className="font-medium text-gray-800">{label}</label>
      <div className="mt-2">
        {preview ? (
          <div className="relative w-48">
            <img src={preview} alt="Preview" className="rounded shadow-md border" />
            <button
              onClick={() => {
                setPreview(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              title="Remove"
            >×</button>
          </div>
        ) : (
          <label className="block w-full cursor-pointer border border-dashed border-gray-400 rounded p-4 text-center hover:bg-gray-100">
            <span className="text-sm text-gray-600">Click to upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size <= 2 * 1024 * 1024) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPreview(reader.result);
                  reader.readAsDataURL(file);
                } else alert("Max 2MB image only");
              }}
              ref={inputRef}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );

  const renderSection = (section) => {
    switch (section) {
      case 'general':
        return (
          <section>
            <h3 className="text-xl font-bold text-blue-700 mt-8 mb-4">General Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {renderInput('Company / Individual Name *', 'companyName')}
              {renderInput('Phone Number *', 'phone')}
              {renderInput('Email *', 'email')}
              {renderInput('Full Address *', 'address', 'text', true)}
            </div>
          </section>
        );
      case 'logo':
        return (
          <section className="mt-6">
            {renderImageUpload('Company Logo *', logoPreview, setLogoPreview, fileInputRef)}
          </section>
        );
      case 'business':
        return (
          <section className="mt-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Business Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {renderInput('Document Type *', 'docType')}
              {renderInput('Identity Number *', 'identityNumber')}
            </div>
          </section>
        );
      case 'idproof':
        return (
          <section className="mt-6">
            {renderImageUpload('Upload ID Proof *', idPreview, setIdPreview, idFileInputRef)}
          </section>
        );
      case 'account':
        return (
          <section className="mt-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Account Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {renderInput('Email *', 'accountEmail', 'email')}
              {renderInput('Phone *', 'accountPhone')}
              {renderInput('Password *', 'password', 'password')}
              {renderInput('Confirm Password *', 'confirmPassword', 'password')}
            </div>
          </section>
        );
      case 'map':
        return (
          <section className="mt-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Choose Location on Map</h3>
            <MapSelector lat={lat} setLat={setLat} lng={lng} setLng={setLng} />
          </section>
        );
      default:
        return null;
    }
  };

  const getMobileSections = () => {
    switch (mobileStep) {
      case 1: return ['general', 'logo'];
      case 2: return ['business', 'idproof'];
      case 3: return ['account', 'map'];
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 md:px-10 py-20">
      <div className="space-y-6">
        {isMobile
          ? getMobileSections().map((s) => renderSection(s))
          : ['general', 'logo', 'business', 'idproof', 'account', 'map'].map((s) => renderSection(s))}
      </div>

      <div className="flex gap-3 mt-10">
        <button
          onClick={handleBack}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          ← Back
        </button>

        {(isMobile ? mobileStep < 4 : step < 2) ? (
          <button
            onClick={handleProceed}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Proceed →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit ✔
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderRegistration;
