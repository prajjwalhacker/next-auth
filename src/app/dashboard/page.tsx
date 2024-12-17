import React from 'react'
import Navbar from '../_components/Navbar';

const Dashboard = () => {
  const buttons = [
    {
        name: "logout",
        title: "Logout",
        href:'/login'
    },
  ]
  return (
    <div className="bg-primary-black h-screen overflow-hidden">
       <Navbar buttons={buttons}/>   
    </div>
  )
}

export default Dashboard;