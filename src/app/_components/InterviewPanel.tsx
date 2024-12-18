import React, { useState } from "react";

const InterviewPanel = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1); // Increment question number
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Left Panel: Questions */}
      <div className="w-2/3 p-6 space-y-6">
        <div className="text-3xl font-bold mb-4">
          Question {currentQuestion}
        </div>
        <p className="text-lg bg-primary-black p-4 rounded-lg shadow-md">
          This is where the question text will appear. It will dynamically update as the user navigates through the questions.
        </p>
        <button
          onClick={handleNextQuestion}
          className="px-6 py-3 mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          Next Question
        </button>
      </div>

      {/* Right Panel: Webcam Video */}
      <div className="w-1/3 p-6 flex items-center justify-center bg-gray-800 rounded-lg shadow-md">
        <div className="relative w-80 h-80 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <p className="text-gray-200 font-semibold text-lg">Webcam Feed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPanel;
