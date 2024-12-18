import React from "react";

const UnauthorizedAccess = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-black">
      <div className="text-center p-6 rounded-lg bg-black bg-opacity-70 shadow-lg">
        <h1 className="text-5xl font-bold text-white mb-4">
          Unauthorized Access
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Oops! Looks like you dont have permission to access this area.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Go to Home
          </button>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
