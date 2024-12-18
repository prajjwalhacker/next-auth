"use client";
import React, { useEffect, useState } from 'react'
import Navbar from '../../_components/Navbar';
import axios from 'axios';
import { notify } from '@/app/signup/page';
import MetaverseModal from '@/app/_components/MetaverseModal';
import AddMockInterviewModal from '@/app/_components/AddMockInterview';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import UnauthorizedAccess from '@/app/_components/ErrorPage';

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();



  const toggleModal=()=> {
     setIsModalOpen(!isModalOpen);
  }
    

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

  const interviews = [
    {
      id: 1,
      title: "Frontend Developer Interview",
      date: "2024-12-15",
      time: "10:00 AM",
      status: "Completed",
      description: "Interview focused on React.js and CSS techniques."
    },
    {
      id: 2,
      title: "Backend Developer Interview",
      date: "2024-12-16",
      time: "2:00 PM",
      status: "Scheduled",
      description: "Focus on Node.js and database management."
    },
    {
      id: 3,
      title: "Fullstack Developer Interview",
      date: "2024-12-17",
      time: "11:00 AM",
      status: "Pending",
      description: "Includes MERN stack topics and system design."
    },
    {
      id: 4,
      title: "UI/UX Designer Interview",
      date: "2024-12-18",
      time: "3:00 PM",
      status: "Cancelled",
      description: "Discussion about Figma and user experience design."
    },
    {
      id: 5,
      title: "DevOps Engineer Interview",
      date: "2024-12-19",
      time: "9:00 AM",
      status: "Completed",
      description: "Topics include CI/CD pipelines and cloud architecture."
    },
  ];


  const getDashboardData = async () => {
    try {
    const token = Cookies.get('token'); 
    const response = await axios.get(`/api/users/usersData`,{
      withCredentials: true, 
      headers: {
        Cookie: `token=${token}`,
      },
    })
    console.log("response");
    console.log(response)
    }
    catch (err: any) {
       console.log("err");
       if (err?.response?.data?.message === 'UnAuthorizedError') {
          setError(true);
       }
    }
    finally {
       setLoading(false);
    }
  }


  useEffect(() => {
     getDashboardData();
  }, []);


  if (loading) {
      return (
        <div className='flex h-screen justify-center items-center'>
        <div className="relative w-16 h-16">
    <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
    <div className="absolute inset-2 rounded-full border-4 border-purple-500 opacity-30"></div>
    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-800 via-gray-900 to-black"></div>
  </div>
  </div>
      )  
  }

  if (error) {
      return (
        <UnauthorizedAccess/>
      )
  }  

  return (
    <div className="bg-primary-black h-screen overflow-hidden">
       <Navbar buttons={buttons}/>   
       <MetaverseModal/>
       <AddMockInterviewModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} toggleModal={toggleModal}/>

      <div className="flex flex-wrap justify-center gap-6 max-w-5xl px-4">
        {/* Previous Interviews */}
        {interviews.map((interview, index) => (
          <div
            key={index}
            className="cursor-pointer w-72 p-4 bg-gradient-to-br from-purple-800 via-black to-gray-900 rounded-lg shadow-lg border border-purple-500 hover:scale-105 transform transition-all"
            onClick={()=>{
              router.push(`/dashboard/67626ee77cd248cbdd77b0f4/interview/123`);
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {interview.title}
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Framework: <span className="text-purple-400">{interview.description}</span>
            </p>
            <p className="text-gray-300 text-sm">
              Years of Experience:{" "}
              <span className="text-purple-400">{interview.status}</span>
            </p>
          </div>
        ))}
        {/* Create New Interview */}
        <div
          className="w-72 h-44 flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-pink-500 rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition-all"
          onClick={() => toggleModal()}
        >
          <div className="text-6xl text-white font-bold">+</div>
          <p className="mt-4 text-lg text-white font-semibold">
            Create New Interview
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;