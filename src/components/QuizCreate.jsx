'use client'

import { useState } from 'react'

export default function QuizCreate() {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [formData, setFormData] = useState({})
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctIndex: null },
  ])

  const classes = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuestionChange = (index, value) => {
    const updated = [...questions]
    updated[index].question = value
    setQuestions(updated)
  }

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions]
    updated[qIndex].options[optIndex] = value
    setQuestions(updated)
  }

  const handleCorrectAnswer = (qIndex, optIndex) => {
    const updated = [...questions]
    updated[qIndex].correctIndex = optIndex
    setQuestions(updated)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctIndex: null },
    ])
  }

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    alert("Quiz Created!")
  }

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Create Quiz</h1>

      {/* Quiz Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., Basic Algebra Quiz"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Class Selector */}
      <div>
        <input
          list="classes"
          name="prevClass"
          placeholder="Class"
          className="input w-full"
          onChange={handleChange}
        />
        <datalist id="classes">
          {classes.map(c => <option key={c} value={c} />)}
        </datalist>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="E.g., Mathematics"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="p-4 border rounded-md bg-gray-50 relative">
            <button
              onClick={() => removeQuestion(qIndex)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
              title="Remove question"
            >
              ×
            </button>

            <label className="block text-sm font-medium text-gray-700 mb-1">Question {qIndex + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder="Enter question"
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((opt, optIndex) => (
                <div key={optIndex}>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctIndex === optIndex}
                      onChange={() => handleCorrectAnswer(qIndex, optIndex)}
                      className="text-blue-600"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                      placeholder={`Option ${optIndex + 1}`}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question */}
      <button
        onClick={addQuestion}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        + Add Question
      </button>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Publish Quiz
        </button>
      </div>
    </div>
  )
}
