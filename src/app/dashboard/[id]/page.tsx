"use client";
import React from 'react'
import Navbar from '../../_components/Navbar';
import axios from 'axios';
import { notify } from '@/app/signup/page';

const Dashboard = () => {

  const onLogout = async () => {
      try {
        await axios.post('/api/users/logout');
        notify('Logout successfull', 'success');
      }
      catch (err) {
        console.log("err");
        console.log(err);
      }
  }
  const buttons = [
    {
        name: "logout",
        title: "Logout",
        href:'/login',
        onClick: () => {
           onLogout();
        }
    },
  ]
  return (
    <div className="bg-primary-black h-screen overflow-hidden">
       <Navbar buttons={buttons}/>   
    </div>
  )
}

export default Dashboard;