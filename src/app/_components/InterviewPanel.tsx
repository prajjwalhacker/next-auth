import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import WebcamWithAudioToText from './WeCam';
import Cookies from 'js-cookie';
import { notify } from "../signup/page";
import TestCompletionModal from "./MOdal";
import InterviewModal from "./StartInterview";

const InterviewPanel = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState("Initializing speech recognition...");
  const [solution, setSolution] = useState('');
  const [answerLoading, setAnswerLooading] = useState(false);
  const [startInterviewModal, setStartInterviewModal] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [error, setError] = useState(false)

  const closeModal = () => setIsOpen(false);

  const { interviewId, id } = useParams();

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1); // Increment question number
    }
    else {
      setIsOpen(true);
    }
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


   const onAnswerSubmit = async () => {
    if (!solution?.length) {
      setError(true);
    }
    else {
      setError(false);
    }
    setAnswerLooading(true);
    try {
    const token = Cookies.get('token');
    const res = await axios.post(`/api/interview/answerSubmit`, {
      solution,
      questionId: questions?.[currentQuestion]?._id,
      userId: id,
      interviewId
    }, {
      withCredentials: true, 
      headers: {
        Cookie: `token=${token}`,
      },
    })
    console.log("answer submit !!");
    console.log(res);
    if (res?.data) {
      if (currentQuestion < questions?.length-1) setCurrentQuestion((prev) => prev + 1);
      else {
        setIsOpen(true);
      }
      notify('Answer Submitted', 'success');
      setSolution('');
    }
    }
    catch(err) {
       console.log("err");
       console.log("Something went wrong");
       console.log(err);
    }
    finally {
      setAnswerLooading(false);
    }
   }

   const onBeginInterview = async () => {
    const token = Cookies.get('token');
    try {
      await axios.post(`/api/interview/update`, {
        interviewId, 
        open: true,
        close: false
      }, {
        withCredentials: true, 
        headers: {
          Cookie: `token=${token}`,
        },
      })
      alert('Dont refresh the page!');
    }
    catch (err) {
       console.log("err");
       console.log(err);
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
          value={solution}
          onChange={(e)=>{
             setError(false);
             setSolution(e.target.value);
          }}
        ></textarea>
        {!!error && <p className="text-sm text-red-500 font-semibold animate-pulse">{'Solution is required'}</p>}
         <button
          onClick={()=>{
            onAnswerSubmit();
          }}
          className="px-6 py-3 mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          {answerLoading ? 'Submitting...': 'Submit'}
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
      <TestCompletionModal isOpen={isOpen} closeModal={closeModal}/>
      <InterviewModal startInterviewModal={startInterviewModal} setStartInterviewModal={setStartInterviewModal} onBeginInterview={onBeginInterview}/>
    </div>
  );
};

export default InterviewPanel;
