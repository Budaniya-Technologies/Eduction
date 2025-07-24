"use client";

import { useState, useMemo } from "react";

export default function TeacherContentManager() {
  // Dummy data
  const [resources, setResources] = useState([
    {
      id: 1,
      filename: "matrix.pdf",
      className: "10",
      subject: "Mathematics",
      title: "Matrices Basics",
      topic: "Introduction to Matrices",
      type: "PDF",
      status: "Published",
    },
    {
      id: 2,
      filename: "cell-division.mp4",
      className: "9",
      subject: "Biology",
      title: "Cell Division",
      topic: "Mitosis & Meiosis",
      type: "Video",
      status: "Draft",
    },
    {
      id: 3,
      filename: "algebra-quiz.json",
      className: "8",
      subject: "Mathematics",
      title: "Algebra Quick Quiz",
      topic: "Linear Equations",
      type: "Quiz",
      status: "Draft",
    },
    {
      id: 4,
      filename: "live-class-physics",
      className: "10",
      subject: "Physics",
      title: "Kinematics Live Class",
      topic: "Motion in a Straight Line",
      type: "Live Class",
      status: "Published",
    },
    {
        id: 5,
        filename: "grammar_basics.webm",
        class: "8",
        subject: "English",
        title: "Basic Grammar Rules",
        topic: "Parts of Speech",
        type: "Video",
        status: "Published",
      },
      {
        id: 6,
        filename: "chemical_reactions.html",
        class: "10",
        subject: "Science",
        title: "Types of Chemical Reactions",
        topic: "Chemical Changes",
        type: "Web Page",
        status: "Published",
      },
      {
        id: 7,
        filename: "python_intro.py",
        class: "12",
        subject: "Computer Science",
        title: "Introduction to Python",
        topic: "Programming Fundamentals",
        type: "Code",
        status: "Draft",
      },
    // ...more items
  ]);

  // Filter state
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");

  // Unique class & subject lists
  const classOptions = useMemo(() => {
    const setClasses = new Set(resources.map((r) => r.className));
    return ["All", ...Array.from(setClasses).sort()];
  }, [resources]);

  const subjectOptions = useMemo(() => {
    const setSubjects = new Set(resources.map((r) => r.subject));
    return ["All", ...Array.from(setSubjects).sort()];
  }, [resources]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchClass = filterClass === "All" || r.className === filterClass;
      const matchSubject =
        filterSubject === "All" || r.subject === filterSubject;
      return matchClass && matchSubject;
    });
  }, [resources, filterClass, filterSubject]);

  // Action handlers
  const handleUpload = (id) =>
    setResources((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Published" } : r
      )
    );
  const handleView = (id) => alert(`Viewing resource #${id}`);
  const handleEdit = (id) => alert(`Editing resource #${id}`);
  const handleUpdate = (id) => alert(`Updating resource #${id}`);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Content Library
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-4 md:space-y-0">
        {/* Class Filter */}
        <label className="flex-1">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Class
          </span>
          <select
            className="w-full md:w-auto border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </label>

        {/* Subject Filter */}
        <label className="flex-1">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Subject
          </span>
          <select
            className="w-full md:w-auto border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            {subjectOptions.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Filename</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Topic</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredResources.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {res.filename}
                </td>
                <td className="px-4 py-3">{res.className}</td>
                <td className="px-4 py-3">{res.subject}</td>
                <td className="px-4 py-3">{res.title}</td>
                <td className="px-4 py-3">{res.topic}</td>
                <td className="px-4 py-3">{res.type}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    res.status === "Draft"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {res.status}
                </td>
                <td className="px-4 py-3 flex justify-center space-x-2">
                  {res.status === "Draft" && (
                    <button
                      onClick={() => handleUpload(res.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Upload
                    </button>
                  )}
                  <button
                    onClick={() => handleView(res.id)}
                    className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(res.id)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleUpdate(res.id)}
                    className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">
                {res.filename}
              </span>
              <span
                className={`font-semibold ${
                  res.status === "Draft"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {res.status}
              </span>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Class:</span>{" "}
                {res.className}
              </p>
              <p>
                <span className="font-medium">Subject:</span>{" "}
                {res.subject}
              </p>
              <p>
                <span className="font-medium">Title:</span>{" "}
                {res.title}
              </p>
              <p>
                <span className="font-medium">Topic:</span>{" "}
                {res.topic}
              </p>
              <p>
                <span className="font-medium">Type:</span> {res.type}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {res.status === "Draft" && (
                <button
                  onClick={() => handleUpload(res.id)}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white text-center rounded hover:bg-blue-600"
                >
                  Upload
                </button>
              )}
              <button
                onClick={() => handleView(res.id)}
                className="flex-1 px-3 py-1 bg-indigo-500 text-white text-center rounded hover:bg-indigo-600"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(res.id)}
                className="flex-1 px-3 py-1 bg-yellow-400 text-white text-center rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleUpdate(res.id)}
                className="flex-1 px-3 py-1 bg-gray-600 text-white text-center rounded hover:bg-gray-700"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
