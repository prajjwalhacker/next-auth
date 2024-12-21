import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const TestCompletionModal = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: ()=>void }) => {
 
  const { id } = useParams();
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 text-white rounded-xl shadow-lg w-11/12 md:w-1/3 p-6 transform transition-all scale-105">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Your AI Interview is Over</h2>
              <p className="text-sm text-gray-300">
                Thank you for participating in this Metaverse-inspired AI interview experience.
              </p>
              <button
                onClick={() => {  closeModal();  router.push(`/dashboard/${id}`)  }}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg text-white shadow-md hover:scale-105 transition-transform"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestCompletionModal;
