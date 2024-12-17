"use client"
import React from 'react'
import Navbar from '../_components/Navbar'

const Signup = () => {
    const buttons = [
        {
            name: "login",
            title: "Login",
            href:'/login'
        },
        {
            name: "signup",
            title: "Signup",
            href: "/signup"
        }
  ]
  return (
    <div className="bg-primary-black h-screen overflow-hidden">
        <Navbar buttons={buttons}/>   
        <div className="flex justify-center pt-10 w-full" >
  <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-8 bg-gradient-to-br from-purple-800 via-gray-900 to-black rounded-xl shadow-lg shadow-purple-500/50 border border-gray-700 hover:shadow-purple-600/50 transition-all duration-300 flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-white text-center mb-6">
    Enter the Realm
    </h2>
    <input 
      type="text" 
      placeholder="Email" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
    />
    <input 
      type="text" 
      placeholder="Username" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
    />
    <input 
      type="text" 
      placeholder="Password" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
    />
     <button key={'register'} className="px-6 py-3 bg-white text-primary-black font-semibold rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => { }}>
         Register
     </button>
  </div>
</div>
    </div>
  )
}

export default Signup