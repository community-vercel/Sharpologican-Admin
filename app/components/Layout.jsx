'use client';

import Sidebar from './Side';
import Header from './Header';
import {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
import Login from '../login/page';
const Layout = ({ children }) => {
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
  return (
    <>
    {user && user?(
      <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
    
    ):''}
  </>
  )
};

export default Layout;