// pages/code-editor.js
"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

// Dynamically import MonacoEditor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const CodeEditorPage = () => {
  const [code, setCode] = useState('// Write your code here');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [languages, setLanguages] = useState([]);

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleSubmit = () => {
    // Placeholder for handling the test case submission
    setOutput(`Output for input: ${input}`);
  };

  const getCodingLanguages = async () => {

    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/languages',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        setLanguages(response?.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
      getCodingLanguages();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Side: Monaco Code Editor with Problem Statement */}
      <div className="h-full w-1/2 p-4 bg-gray-800 overflow-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Problem Statement</h2>
        <p className="text-white mb-4">
          <strong>Problem:</strong> Given an array of integers, find the sum of all elements in the array.
        </p>
        <p className="text-white mb-4">
          <strong>Example:</strong><br />
          Input: [1, 2, 3, 4, 5]<br />
          Output: 15
        </p>
        <p className="text-white mb-4">
          <strong>Test Case Example:</strong><br />
          Input: [10, 20, 30]<br />
          Output: 60
        </p>

        <h2 className="text-2xl font-bold text-white mt-4 mb-2">Code Editor</h2>
        <div className="mt-4">
          <label className="block text-white">Select Language:</label>
          <select
            className="mt-2 p-2 rounded bg-gray-700 text-white"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((item: any) => {
                return (
                    <option key={item.id} value={`${item.name}`}>{item.name}</option>
                )
            })}

          </select>
        </div>
        <MonacoEditor
          height="calc(100vh - 200px)" // Adjust the height based on the problem statement section
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark" // You can change this to different themes like 'light' or 'vs'
          options={{
            selectOnLineNumbers: true,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />

      </div>
      {/* Right Side: Test Cases and Submit Button */}
      <div className="w-1/2 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Cases</h2>

        {/* Input Test Case */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Input Test Case</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your input test case"
          />
        </div>

        {/* Output Test Case */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Output Test Case</label>
          <textarea
            value={output}
            readOnly
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200"
            placeholder="Output will appear here"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CodeEditorPage;
