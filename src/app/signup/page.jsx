"use client"
import React, { useEffect } from 'react'
import Navbar from '../_components/Navbar'
import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePassword(password) {
    // Regex to check the conditions
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    // Test the password against the regex
    return passwordRegex.test(password);
}

const Signup = () => {

    const [formData, setFormData] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

  const validateForm = () => {
    const { email, password, username } = formData || {};

    const errorObj = {};
    if (!email?.length) {
       errorObj.email = 'Email is required';
    }
    else {
       if (!emailRegex.test(email)) {
         errorObj.email = 'Email is invalid';
       }
    }
    if(!password?.length) {
       errorObj.password = 'Password is required';
    }
    else {
       if (!validatePassword(password)) {
          errorObj.password = 'Password doesnt satisfy all criteria';
       }
    }
    if (!username?.length) {
       errorObj.username = 'Username is required';
    }

    return errorObj;
 }

 const onSubmit =async (e) => {
    e.preventDefault();
    const errorObj = validateForm();

    console.log("ErrorObj");
    console.log(errorObj);

    if (Object.keys(errorObj).length) {
       setError(errorObj);
       return;
    }
    try { 

        setLoading(true);
        const { email, username, password } = formData || {};
    
        const res = await axios.post('/api/users/signup', formData); // Relative URL for Next.js

        console.log("res");
        console.log(res);
    
        if (res?.data?.error) {
            notify(res?.data?.error, 'error');
        }
        else if (res?.data?.message) {
           notify(res?.data?.message, 'success');
           setTimeout(() => {
            router.push('/login');
           }, 3000);

        }
    }
    catch(err) {
        console.log(err);
    }
    finally {
        setLoading(false);
    }
}


  useEffect(() => {
      const errorObj  = validateForm();
      setError(errorObj);
  }, [JSON.stringify(formData)]);

  return (
    <div className="bg-primary-black min-h-screen overflow-hidden py-8">
        <ToastContainer/>
        <Navbar buttons={buttons}/>   
        <div className="flex justify-center w-full" >
  <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-8 bg-gradient-to-br from-purple-800 via-gray-900 to-black rounded-xl shadow-lg shadow-purple-500/50 border border-gray-700 hover:shadow-purple-600/50 transition-all duration-300 flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-white text-center mb-6">
    Enter the Realm
    </h2>
    <input 
      type="text" 
      placeholder="Email" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
      value={formData?.email || ''}
      onChange={(e) => {
         setFormData((val) => ({ ...val, email: e.target.value }))
      }}
    />
    {error?.email?.length && <p className="text-sm text-red-500 font-semibold animate-pulse">{error.email || 'This is required'}</p>}
    <input 
      type="text" 
      placeholder="Username" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
      value={formData?.username || ""}
      onChange={(e) => {
         setFormData((val) => ({ ...val, username: e.target.value }))
      }}
    />
    {error?.username?.length && <p className="text-sm text-red-500 font-semibold animate-pulse">{error.username || 'This is required'}</p>}
    <input 
      type="password" 
      placeholder="Password" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
      value={formData?.password || ""}
      onChange={(e) => {
        setFormData((valy) => ({ ...val, password: e.target.value }))
     }}
    />
    {error?.password?.length && <p className="text-sm text-red-500 font-semibold animate-pulse">{error.password || 'This is required'}</p>}
    <p className="mt-2 text-xs text-gray-400">
    Password must include: 
    <span className="text-red-500 font-semibold"> uppercase</span>, 
    <span className="text-green-500 font-semibold"> lowercase</span>, 
    <span className="text-blue-500 font-semibold"> numeric</span>, and 
    <span className="text-yellow-500 font-semibold"> special character</span>.
  </p>
     <button key={'register'} className="flex justify-center px-6 py-3 bg-white text-primary-black font-semibold rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={(e) => { 
        onSubmit(e);
     }}>
       {loading ? <div className="relative w-16 h-16">
    <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
    <div className="absolute inset-2 rounded-full border-4 border-purple-500 opacity-30"></div>
    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-800 via-gray-900 to-black"></div>
  </div> : 'Register'}
     </button>

  </div>
</div>
    </div>
  )
}

export default Signup