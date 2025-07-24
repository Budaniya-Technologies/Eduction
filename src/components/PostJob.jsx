'use client';
import React, { useState } from 'react';

const PostJob = () => {
  const [jobType, setJobType] = useState('');
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [duration, setDuration] = useState('');
  const [vacancies, setVacancies] = useState();
  const [skills, setSkills] = useState(['']);
  const [requirements, setRequirements] = useState(['']);
  const [roleOverview, setRoleOverview] = useState(['']);
  const [questions, setQuestions] = useState([]);

  const handleSalaryChange = (type, field) => {
    const setter = field === 'min' ? setMinSalary : setMaxSalary;
    const value = field === 'min' ? minSalary : maxSalary;
    setter(type === 'inc' ? value + 1000 : Math.max(0, value - 1000));
  };

  const handleArrayChange = (setter, index, value, state) => {
    const updated = [...state];
    updated[index] = value;
    setter(updated);
  };

  const addItem = (setter, state) => setter([...state, '']);
  const removeItem = (setter, state, index) => setter(state.filter((_, i) => i !== index));

  const addQuestion = (type) => {
    setQuestions([...questions, { type, question: '', options: type !== 'input' ? [''] : [] }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push('');
    setQuestions(updated);
  };

  const removeOption = (qIdx, optIdx) => {
    const updated = [...questions];
    updated[qIdx].options.splice(optIdx, 1);
    setQuestions(updated);
  };

  const removeQuestion = (index) => setQuestions(questions.filter((_, i) => i !== index));

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-20 bg-white text-black rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Post a Job</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Job Title" className="input w-full" />

        <select className="input w-full" value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Internship">Internship</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>

        {(jobType === 'Internship' || jobType === 'Contract') && (
          <input
            type="number"
            placeholder="Duration in months"
            className="input w-full"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        )}

        <div className="flex items-center justify-between gap-2">
          <span>Min Salary: ₹{minSalary}</span>
          <div className="flex gap-2">
            <button className="btn-sm" onClick={() => handleSalaryChange('dec', 'min')}>-</button>
            <button className="btn-sm" onClick={() => handleSalaryChange('inc', 'min')}>+</button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span>Max Salary: ₹{maxSalary}</span>
          <div className="flex gap-2">
            <button className="btn-sm" onClick={() => handleSalaryChange('dec', 'max')}>-</button>
            <button className="btn-sm" onClick={() => handleSalaryChange('inc', 'max')}>+</button>
          </div>
        </div>

        <input
          type="number"
          placeholder="Vacancies"
          className="input w-full"
          value={vacancies}
          onChange={(e) => setVacancies(e.target.value)}
        />
      </div>

      <SectionList title="Role Overview" items={roleOverview} setItems={setRoleOverview} />
      <SectionList title="Requirements" items={requirements} setItems={setRequirements} />
      <SectionList title="Skills" items={skills} setItems={setSkills} />

      {/* Questions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Add Questions</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="btn-secondary" onClick={() => addQuestion('radio')}>+ Radio</button>
          <button className="btn-secondary" onClick={() => addQuestion('checkbox')}>+ Checkbox</button>
          <button className="btn-secondary" onClick={() => addQuestion('input')}>+ Input</button>
        </div>

        {questions.map((q, qIdx) => (
          <div key={qIdx} className="mb-4 border p-4 rounded bg-gray-50 shadow-sm">
            <input
              type="text"
              placeholder={`Question ${qIdx + 1}`}
              className="input w-full mb-2"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIdx, 'question', e.target.value)}
            />
            {q.type !== 'input' && q.options.map((opt, optIdx) => (
              <div key={optIdx} className="flex gap-2 items-center mb-1">
                <input
                  type="text"
                  className="input w-full"
                  placeholder={`Option ${optIdx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                />
                <button onClick={() => removeOption(qIdx, optIdx)} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            {q.type !== 'input' && (
              <button onClick={() => addOption(qIdx)} className="btn-sm mt-1">+ Option</button>
            )}
            <button onClick={() => removeQuestion(qIdx)} className="btn-sm text-red-600 mt-2 block">Remove Question</button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Job
        </button>
      </div>
    </div>
  );
};

// Reusable SectionList Component
const SectionList = ({ title, items, setItems }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-2 mb-2">
        <input
          type="text"
          value={item}
          placeholder={`${title} ${idx + 1}`}
          onChange={(e) => {
            const updated = [...items];
            updated[idx] = e.target.value;
            setItems(updated);
          }}
          className="input w-full"
        />
        <button onClick={() => setItems(items.filter((_, i) => i !== idx))} className="btn-sm text-red-600">Remove</button>
      </div>
    ))}
    <button onClick={() => setItems([...items, ''])} className="btn-sm">+ {title}</button>
  </div>
);

export default PostJob;
