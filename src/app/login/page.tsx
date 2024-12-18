/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect } from 'react'
import Navbar from '../_components/Navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePassword(password: string) {
    // Regex to check the conditions
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    // Test the password against the regex
    return passwordRegex.test(password);
}
  

const Login = () => {

  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
     const { email, password } = formData || {};

     const errorObj: any = {};
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

     return errorObj;
  }

   const notify = (msg, type) => {
          if (type === 'success') {
              toast.success(msg, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  draggable: true,
                  pauseOnHover: true,
                  style: {
                    background: 'linear-gradient(to right, #8e2de2, #4a00e0)', // neon purple gradient
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // glowing effect
                    padding: '12px 20px',
                    fontFamily: "'Roboto', sans-serif",
                  }
                });
                return;
          }
          toast.error(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            style: {
              background: 'linear-gradient(to right, #8e2de2, #4a00e0)', // neon purple gradient
              color: 'white',
              borderRadius: '8px',
              fontSize: '16px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // glowing effect
              padding: '12px 20px',
              fontFamily: "'Roboto', sans-serif",
            }
          });
    };

  const onSubmit = async (e:any) => {
      e.preventDefault();
      const errorObj = validateForm();


      if (Object.keys(errorObj).length) {
         setError(errorObj);
         return;
      }

      try {
           setLoading(true);
            const res = await axios.post('/api/users/login', formData);
            if (res?.data?.error) {
                notify(res?.data?.error, 'error');
            }
            if (res?.data?.user?._id) {
                notify('Login Successfull', "success");
                setTimeout(() => {
                    router.push(`/dashboard/${res?.data?.user?._id}`);
                }, 3000);
            }
      }
      catch(err: any) {
        console.log("err");
        console.log(err);
        notify("something went wrong", "error");
      }
      finally {
        setLoading(false);
      }

  }


  useEffect(() => {
        const errorObj = validateForm();
        setError(errorObj);
  }, [JSON.stringify(formData || {})])

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
       <ToastContainer/>   
       <Navbar buttons={buttons}/>   
       <div className="flex justify-center  w-full" >
  <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-8 bg-gradient-to-br from-purple-800 via-gray-900 to-black rounded-xl shadow-lg shadow-purple-500/50 border border-gray-700 hover:shadow-purple-600/50 transition-all duration-300 flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-white text-center mb-6">
    Enter the Realm
    </h2>
    <input 
      type="text" 
      placeholder="Email" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
      value={formData.email || ""}
      onChange={(e) => {
        setFormData((val: any) => ({ ...val, email: e.target.value }))
      }}
    />
    {error?.email?.length && <p className="text-sm text-red-500 font-semibold animate-pulse">{error.email || 'This is required'}</p>}
    <input 
      type="password" 
      placeholder="Password" 
      className="w-full px-4 py-3 bg-primary-black text-white placeholder-gray-400 font-medium rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
      value={formData.password || ''}
      onChange={(e: any) => {
         setFormData((val: any) => ({ ...val, password: e.target.value }))
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
     <button key={'register'} className="px-6 py-3 bg-white text-primary-black font-semibold rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={(e) => { 
        onSubmit(e);
     }}>
          {loading ? <div className="relative w-16 h-16">
    <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
    <div className="absolute inset-2 rounded-full border-4 border-purple-500 opacity-30"></div>
    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-800 via-gray-900 to-black"></div>
  </div> : 'Login'}
     </button>
  </div>
</div>
    </div>
  )
}

export default Login;