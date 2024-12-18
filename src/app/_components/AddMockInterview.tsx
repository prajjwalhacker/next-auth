import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'next/navigation';
const frameworks = ["Node.js", "React.js", "Angular", "Vue.js", "Next.js", "Svelte", "Express.js", "NestJS"];

const AddMockInterviewModal = ({ isModalOpen, setIsModalOpen, toggleModal }) => {

  const [jobTitle, setJobTitle] = useState('');
  const [framework, setFramework] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');  
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleCreateInterview = async () => {

     setLoading(true);
      try {
        const token = Cookies.get('token'); 
        const response = await axios.post(`/api/interview/create`, {
          jobTitle,
          framework,
          yearsOfExperience,
          userId: id
        }, {
          withCredentials: true, 
          headers: {
            Cookie: `token=${token}`,
          },
        })
        console.log("response");
        console.log(response);
      }
      catch (err: any) {
         
      }
      finally {
        setLoading(false);
      }
  };

  if (!isModalOpen) return null;


  console.log("loading");
  console.log(loading);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-gray-800 flex justify-center items-center">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-800 via-black to-gray-900 p-8 rounded-lg shadow-2xl border border-purple-600 w-4/5 max-w-lg">
            {/* Modal Header */}
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Create a <span className="text-purple-400">Mock Interview</span>
            </h2>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Job Title */}
              <div>
                <label className="block text-gray-300 text-lg mb-2">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter Job Title"
                  className="w-full p-2 bg-black text-white border border-purple-500 rounded-md placeholder-gray-500"
                />
              </div>

              {/* Specific Framework */}
              <div>
                <label className="block text-gray-300 text-lg mb-2">Specific Framework</label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full p-2 bg-black text-white border border-purple-500 rounded-md"
                >
                  <option value="" disabled>Select Framework</option>
                  {frameworks.map((fw) => (
                    <option key={fw} value={fw} className="bg-black text-white">
                      {fw}
                    </option>
                  ))}
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-gray-300 text-lg mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  placeholder="Enter Years of Experience"
                  className="w-full p-2 bg-black text-white border border-purple-500 rounded-md placeholder-gray-500"
                />
              </div>
            </div>

            {/* Create Mock Interview Button */}
            <button
              onClick={handleCreateInterview}
              className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 transition-all text-white py-2 rounded-lg font-semibold"
            >
              {loading ? 'Creating interview ...' : 'Create Mock Interview' }
            </button>

            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="mt-4 w-full text-gray-400 text-sm hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMockInterviewModal;
