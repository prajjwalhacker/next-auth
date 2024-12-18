import React, { useEffect, useRef, useState } from "react";

const WebcamWithAudioToText = () => {
  const videoRef = useRef(null);
  const [transcript, setTranscript] = useState("");

  const startMediaStream = async () => {
    try {
      // Capture video and audio
      const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

      // Start speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setTranscript("SpeechRecognition API is not supported in your browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Keep listening
      recognition.interimResults = true; // Show partial results

      recognition.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          console.log(event.results[i][0].transcript, "transcript");
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + " " + transcriptPart);
          } else {
            interimTranscript += transcriptPart;
          }
        }

        // Show interim results
        setTranscript((prev) => prev + " " + interimTranscript);
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error: ", err);
        setTranscript("Error during speech recognition.");
      };

      recognition.start();
    } catch (err) {
      console.error("Error accessing media devices: ", err);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg max-w-3xl text-center">
      <button
          onClick={startMediaStream}
          className="px-6 py-3 mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          Speak
        </button>
        {!!transcript?.length && <h2 className="text-xl font-semibold mb-2">Transcribed Audio</h2>}
        <p className="text-lg">{transcript}</p>
      </div>
    </div>
  );
};

export default WebcamWithAudioToText;
