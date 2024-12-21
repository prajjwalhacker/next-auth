import React from 'react';

const InterviewModal = ({ startInterviewModal, setStartInterviewModal, onBeginInterview }: { startInterviewModal: boolean, setStartInterviewModal: (val: any)=>void , onBeginInterview: ()=>void }) => {


  return (
    startInterviewModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="relative bg-black border border-purple-500 shadow-lg rounded-lg p-8 w-11/12 max-w-lg text-white">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 rounded-lg blur-md"></div>

          <div className="relative">
            {/* Header */}
            <h2 className="text-4xl font-bold text-center mb-4 neon-text">
              🚀 Start Your Interview
            </h2>

            {/* Subtext */}
            <p className="text-lg text-center mb-6">
              Step into the metaverse of opportunities. Ace your interview and shine brighter than ever!
            </p>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={() => { setStartInterviewModal(false); onBeginInterview(); }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-lg font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Lets Begin
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default InterviewModal;
