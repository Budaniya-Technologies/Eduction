'use client';
import React, { useState } from "react";

const boards = ["CBSE", "ICSE", "RBSE", "NCERT"];
const subjects = ["Maths", "Science", "English", "Social Science", "Hindi"];
const classes = ["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const competitiveExams = ["UPSC", "SSC", "RJS", "Banking", "Railways"];
const collegeCourses = ["B.Sc", "B.A", "B.Com", "B.Tech", "MBBS"];
const instituteCourses = ["Digital Marketing", "Full Stack Dev", "Ethical Hacking", "Tally", "Spoken English"];

const StudentDashboard = () => {
  const [section, setSection] = useState("school");
  const [step, setStep] = useState(1);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [mode, setMode] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    if (item.type === "class" && cart.some((i) => i.type === "class")) return;
    if (item.type === "subject" && cart.some((i) => i.name === item.name)) return;
    setCart([...cart, item]);
  };

  const removeFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const handleSubjectSelect = (subject) => {
    if (!selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject]);
      addToCart({ name: subject, type: "subject" });
    }
  };

  const renderSchoolOptions = () => (
    <div className="space-y-6">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Select Your Board</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {boards.map((board) => (
              <button
                key={board}
                onClick={() => { setSelectedBoard(board); setStep(2); }}
                className="bg-white border border-blue-500 text-blue-700 px-4 py-2 rounded hover:bg-blue-100 transition"
              >
                {board}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Select Mode</h2>
          <div className="flex gap-6">
            {["Tuition", "School"].map((m) => (
              <div
                key={m}
                onClick={() => { setMode(m); setStep(3); }}
                className="cursor-pointer w-40 p-4 text-center border border-blue-500 rounded hover:bg-blue-100 shadow"
              >
                <p className="font-medium text-blue-700">{m}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-4 text-sm text-gray-600 underline">← Back</button>
        </div>
      )}
      {step === 3 && mode === "Tuition" && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Select Subjects</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => handleSubjectSelect(subj)}
                className="bg-white px-4 py-2 border border-blue-500 rounded hover:bg-blue-100 text-sm"
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 3 && mode === "School" && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Select Class</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => addToCart({ name: cls, type: "class" })}
                className="bg-white px-4 py-2 border border-blue-500 rounded hover:bg-blue-100 text-sm"
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderList = (items, type) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => addToCart({ name: item, type })}
          className="bg-white px-4 py-2 border border-blue-500 rounded hover:bg-blue-100 text-sm"
        >
          {item}
        </button>
      ))}
    </div>
  );

  const renderSection = () => {
    switch (section) {
      case "school": return renderSchoolOptions();
      case "competitive": return (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Select Competitive Exam</h2>
          {renderList(competitiveExams, "exam")}
        </div>
      );
      case "college": return (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Select College Course</h2>
          {renderList(collegeCourses, "course")}
        </div>
      );
      case "institute": return (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Select Training Course</h2>
          {renderList(instituteCourses, "course")}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Explore Learning Options</h1>

      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => { setSection("school"); setStep(1); }} className={`px-4 py-2 rounded ${section === "school" ? "bg-blue-700 text-white" : "bg-white border text-blue-700"}`}>School</button>
        <button onClick={() => setSection("competitive")} className={`px-4 py-2 rounded ${section === "competitive" ? "bg-blue-700 text-white" : "bg-white border text-blue-700"}`}>Competitive</button>
        <button onClick={() => setSection("college")} className={`px-4 py-2 rounded ${section === "college" ? "bg-blue-700 text-white" : "bg-white border text-blue-700"}`}>College</button>
        <button onClick={() => setSection("institute")} className={`px-4 py-2 rounded ${section === "institute" ? "bg-blue-700 text-white" : "bg-white border text-blue-700"}`}>Institute</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          {renderSection()}
        </div>

        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">No items added</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {cart.map((item) => (
                <li key={item.name} className="flex justify-between items-center border-b pb-1">
                  <span>{item.name} <span className="text-gray-500">({item.type})</span></span>
                  <button onClick={() => removeFromCart(item.name)} className="text-red-500 hover:underline">Remove</button>
                </li>
              ))}
            </ul>
          )}
          <button disabled={cart.length === 0} className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-300">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
