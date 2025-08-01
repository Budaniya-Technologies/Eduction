'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import classNames from 'classnames';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('https://api.mypratham.com/school/questions/', {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setQuestions(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionSelect = (questionId, optionText, isMulti) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isMulti) {
        if (current.includes(optionText)) {
          return { ...prev, [questionId]: current.filter((text) => text !== optionText) };
        } else {
          return { ...prev, [questionId]: [...current, optionText] };
        }
      } else {
        return { ...prev, [questionId]: [optionText] };
      }
    });
  };

  const checkAnswer = (question, option) => {
    const correct = question.options.find((o) => o.text === option)?.is_correct;
    return correct;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4">
      <div className="max-w-full mx-auto bg-white shadow-2xl rounded-lg p-8 space-y-10">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Student Quiz</h1>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-indigo-500" size={32} />
          </div>
        ) : (
          <>
            {questions.map((question, index) => (
              <div key={question.id} className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  {index + 1}. {question.question_text}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((option, i) => {
                    const selected = answers[question.id]?.includes(option.text);
                    const correct = checkAnswer(question, option.text);

                    return (
                      <button
                        key={i}
                        onClick={() =>
                          !submitted &&
                          handleOptionSelect(question.id, option.text, question.question_type === 'MSQ')
                        }
                        className={classNames(
                          'px-4 py-3 rounded-lg border text-left transition duration-300',
                          {
                            'bg-indigo-100 border-indigo-500': selected && !submitted,
                            'bg-green-100 border-green-600 text-green-700':
                              submitted && selected && correct,
                            'bg-red-100 border-red-600 text-red-700':
                              submitted && selected && !correct,
                            'hover:shadow-md': !submitted,
                            'cursor-not-allowed': submitted,
                          }
                        )}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!submitted ? (
              <div className="text-center mt-6">
                <button
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
                  onClick={handleSubmit}
                >
                  Submit Quiz
                </button>
              </div>
            ) : (
              <div className="text-center mt-6">
                <CheckCircle className="text-green-500 mx-auto mb-2" size={32} />
                <p className="text-green-700 font-semibold text-lg">Quiz submitted successfully!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
