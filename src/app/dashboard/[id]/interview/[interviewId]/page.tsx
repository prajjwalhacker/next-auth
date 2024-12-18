"use client"
import React from 'react'
import Navbar from '@/app/_components/Navbar'
import { notify } from '@/app/signup/page';
import axios from 'axios';

const page = () => {

    const onLogout = async () => {
        try {
          await axios.post('/api/users/logout');
          notify('lgout successfull', 'success');
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
      <Navbar buttons={buttons} />
    </div>
  )
}

export default page



