import React, { useState } from 'react';

const tabs = ['Overview', 'Offers', 'Photos', 'Services', 'Contact'];

const BusinessTabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Offers':
        return (
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {data.offers.map((offer, index) => (
              <div key={index} className="border rounded p-3 shadow-sm">
                <img src={offer.img} alt="Offer" className="h-40 w-full object-cover rounded" />
                <h3 className="font-semibold mt-2">{offer.title}</h3>
                <p className="text-sm text-gray-500">Last Date: {offer.expiry}</p>
                <button className="bg-green-600 text-white px-3 py-1 rounded mt-2">View Offer</button>
              </div>
            ))}
          </div>
        );
      case 'Photos':
        return (
          <div className="flex flex-wrap gap-4 mt-4">
            {data.photos.map((img, index) => (
              <img key={index} src={img} alt="Business" className="w-48 h-32 object-cover rounded" />
            ))}
          </div>
        );
      case 'Services':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            {data.services.map((s, index) => (
              <div key={index} className="text-center p-2 border rounded shadow-sm">
                <div className="text-2xl">{s.icon}</div>
                <div className="text-sm mt-1">{s.title}</div>
              </div>
            ))}
          </div>
        );
      case 'Contact':
        return (
          <div className="mt-4">
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Contact:</strong> {data.contact}</p>
            <p><strong>Established:</strong> {data.businessSince}</p>
          </div>
        );
      default:
        return <div className="mt-4 text-gray-600">Select a tab to see more info.</div>;
    }
  };

  return (
    <div>
      <div className="flex gap-4 mt-6 border-b pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 ${activeTab === tab ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default BusinessTabs;
