"use client";
import React from 'react'
import Navbar from '../../_components/Navbar';
import axios from 'axios';
import { notify } from '@/app/signup/page';
import MetaverseModal from '@/app/_components/MetaverseModal';
import AddMockInterviewModal from '@/app/_components/AddMockInterview';

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
       <MetaverseModal/>
       <AddMockInterviewModal/>
    </div>
  )
}

export default Dashboard;