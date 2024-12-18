import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import WebcamWithAudioToText from './WeCam';

const InterviewPanel = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState("Initializing speech recognition...");

  const { interviewId } = useParams();

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length) return;
    setCurrentQuestion((prev) => prev + 1); // Increment question number
  };

   const getInterview = async () => {
      try {
        const response = await axios.get(`/api/interview/get?interviewId=${interviewId}`);

        console.log(response);

        setQuestions(response?.data?.interviewObj?.[0].questions || []);

      }
      catch (err) {

      }
      finally {
        setLoading(false);
      }
   }


   useEffect(() => {
       getInterview();
   }, []);

   if (loading) {
    return (
      <div className='flex h-screen justify-center items-center'>
      <div className="relative w-16 h-16">
  <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
  <div className="absolute inset-2 rounded-full border-4 border-purple-500 opacity-30"></div>
  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-800 via-gray-900 to-black"></div>
</div>
</div>
    )  
}

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Left Panel: Questions */}
      <div className="w-2/3 p-6 space-y-6">
        <div className="text-3xl font-bold mb-4">
          Question {currentQuestion + 1}
        </div>
        <p className="text-lg bg-primary-black p-4 rounded-lg shadow-md">
          {questions[currentQuestion]?.question || ''}
        </p>
        <button
          onClick={handleNextQuestion}
          className="px-6 py-3 mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          Skip Question
        </button>
        <textarea
          id="metaverseTextarea"
          className="w-full h-40 p-4 text-white bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
          placeholder="Your Solution..."
        ></textarea>
         <button
          onClick={()=>{}}
          className="px-6 py-3 mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </div>

      {/* Right Panel: Webcam Video */}
      <div className="w-1/3 p-6 flex items-center justify-center bg-gray-800 rounded-lg shadow-md">
        <div className="relative w-80 h-80 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <WebcamWithAudioToText/> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPanel;
