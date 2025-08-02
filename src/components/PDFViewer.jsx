'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaFilePdf } from 'react-icons/fa'; // PDF icon

const PDFViewer = () => {
  const [pdfList, setPdfList] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const API_BASE_URL = 'https://api.mypratham.com';
  // const API_BASE_URL = 'https://ng9fx7z3-8000.inc1.devtunnels.ms/';

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const token = localStorage.getItem('token');
        // const token = "token 3e2f9dd75edc48bd36c8bc6434a2211c8d8f7a67";
        const res = await axios.get(`${API_BASE_URL}/school/files`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        // console.log(res.data);
        if (res.data.length === 0) {
          toast.error('No PDF files found.');
        } else {
          setPdfList(res.data);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch PDF files.');
      }
      // console.log(error);
    };

    fetchPDFs();
  }, []);

  return (
    <div className="w-full h-full px-4 py-6">
      <h2 className="text-2xl font-semibold text-blue-700 text-center mb-6">📚 PDF Notes</h2>

      {/* File List - Only show if no PDF is selected */}
      {!selectedPDF && (
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {pdfList.map((pdf) => (
            <div
              key={pdf.id}
              onClick={() => setSelectedPDF(API_BASE_URL + pdf.file)}
              className="w-48 h-40 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:border-blue-400 transition duration-200"
            >
              <FaFilePdf className="text-red-600 text-4xl mb-2" />
              <p className="text-center px-2 text-sm font-medium text-gray-800">{pdf.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* PDF Viewer */}
      {selectedPDF && (
        <div className="bg-white shadow-xl rounded-xl p-2 max-w-5xl mx-auto overflow-hidden h-[500px]">
          <iframe
            src={selectedPDF}
            title="PDF Viewer"
            className="w-full h-full rounded-lg border"
          />
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
