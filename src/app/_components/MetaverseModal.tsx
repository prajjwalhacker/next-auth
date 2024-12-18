import React, { useState } from 'react';

const MetaverseModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-800 via-black to-gray-900 p-8 rounded-lg shadow-2xl border border-purple-600 w-4/5 max-w-lg">
        {/* Modal Header */}
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Welcome to <span className="text-purple-400">AI Mock Interview</span> Dashboard
        </h2>

        {/* Modal Content */}
        <p className="text-gray-300 text-lg text-center mb-6">
          Create your <span className="text-purple-400 font-semibold">Mock Interview</span> and take your skills to the next level!
        </p>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 transition-all text-white py-2 rounded-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MetaverseModal;
