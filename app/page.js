'use client';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import Login from './login/page';

export default function Home() {
  const router = useRouter();
  const [user,setUser]=useState()

  useEffect(() => {
    // Check if user data is available in localStorage (this indicates login)
    const user = localStorage.getItem('superAdmin');

    if (!user) {
      // If no user data is found, redirect to the login page
      router.push('/login');
    }
    else{
      setUser(user)
    }
  }, [router]);

  // If the user is logged in, show the Dashboard
  return( 
<>
{user && user?(
  <Dashboard />

):(
<Login />
)}
<ToastContainer /> {/* This will display your toasts */}

</>
  )
}
