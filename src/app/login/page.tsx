import React from 'react'
import Navbar from '../_components/Navbar';

const Login = () => {
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
    </div>
  )
}

export default Login;