// components/AddBundleStudentsEditable.tsx
'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  FiUploadCloud,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';

interface StudentData {
  admissionNo: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  caste: string;
  school: string;
  mobile: string;
  district: string;
  prevClass: string;
  stream: string;
}

const formatKey = (key: string) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase());

const AddBundleStudentsEditable: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<StudentData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'processing' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<Partial<StudentData>>({});

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const f = e.target.files?.[0] ?? null;
    if (f && !f.name.endsWith('.xlsx')) {
      setMessage('Please upload a .xlsx file.');
      setUploadStatus('error');
      setFile(null);
      setData([]);
      return;
    }
    setFile(f);
    setMessage('');
    setUploadStatus('idle');
  };

  const processExcelFile = () => {
    if (!file) {
      setMessage('Select an Excel file first.');
      setUploadStatus('error');
      return;
    }
    setUploading(true);
    setUploadStatus('processing');
    setMessage('Processing...');

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const arr = ev.target?.result as ArrayBuffer;
        const wb = XLSX.read(arr, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json: StudentData[] = XLSX.utils.sheet_to_json(ws);
        const valid = json.every(
          (s) => s.studentName && s.admissionNo && s.fatherName
        );
        if (!valid) {
          setMessage('Missing required fields.');
          setUploadStatus('error');
        } else {
          setData(json);
          setMessage(`Loaded ${json.length} records.`);
          setUploadStatus('success');
        }
      } catch {
        setMessage('Error parsing file.');
        setUploadStatus('error');
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      setMessage('File read error.');
      setUploadStatus('error');
      setUploading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadStudentsToBackend = async () => {
    if (!data.length) {
      setMessage('No data to upload.');
      setUploadStatus('error');
      return;
    }
    setUploading(true);
    setUploadStatus('processing');
    setMessage('Uploading...');
    try {
      const res = await fetch('/api/students/bulk-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Upload failed');
      setUploadStatus('success');
      setMessage('Uploaded successfully!');
      setData([]);
      setFile(null);
    } catch (err: any) {
      setMessage(err.message || 'Unexpected error.');
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const newData = [...data];
    newData[editingIndex] = {
      ...newData[editingIndex],
      ...(editRow as StudentData),
    };
    setData(newData);
    setEditingIndex(null);
    setEditRow({});
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Bulk Student Admission
      </h1>
      <p className="text-gray-600 mb-6">
        Upload an Excel (.xlsx) to add many students at once.
      </p>

      {/* File Uploader */}
      <label
        htmlFor="fileUpload"
        className="flex flex-col sm:flex-row items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-colors rounded-lg h-36 cursor-pointer mb-4"
      >
        <FiUploadCloud className="text-4xl text-blue-500" />
        <span className="mt-2 sm:mt-0 sm:ml-3 text-gray-500">
          {file ? file.name : 'Click here to upload Exel file'}
        </span>
        <input
          id="fileUpload"
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          onClick={processExcelFile}
          disabled={!file || uploading}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition"
        >
          Process File
        </button>
        <button
          onClick={uploadStudentsToBackend}
          disabled={!data.length || uploading}
          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition"
        >
          Upload Students
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`
            mb-4 p-3 rounded-lg text-sm flex items-center space-x-2
            ${
              uploadStatus === 'error'
                ? 'bg-red-100 text-red-700'
                : uploadStatus === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }
          `}
        >
          {uploadStatus === 'success' && (
            <FiCheckCircle className="flex-shrink-0" />
          )}
          {uploadStatus === 'error' && (
            <FiXCircle className="flex-shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.map((student, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            {Object.entries(student).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between mb-1 text-sm"
              >
                <span className="font-medium text-gray-700">
                  {formatKey(k)}
                </span>
                <span className="text-gray-800">{v}</span>
              </div>
            ))}
            <div className="flex justify-end space-x-2 mt-2">
              {editingIndex === idx ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditingIndex(idx);
                    setEditRow(student);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      {data.length > 0 && (
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatKey(col)}
                  </th>
                ))}
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((student, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {Object.entries(student).map(([k, v]) => (
                    <td
                      key={k}
                      className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                    >
                      {editingIndex === idx ? (
                        <input
                          name={k}
                          value={
                            (editRow as any)[k] ?? (student as any)[k]
                          }
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {editingIndex === idx ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingIndex(idx);
                          setEditRow(student);
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddBundleStudentsEditable;
