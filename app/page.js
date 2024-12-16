'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user data is available in localStorage (this indicates login)
    const user = localStorage.getItem('superAdmin');

    if (!user) {
      // If no user data is found, redirect to the login page
      router.push('/login');
    }
  }, [router]);

  // If the user is logged in, show the Dashboard
  return( 
<>
<Dashboard />;
<ToastContainer /> {/* This will display your toasts */}

</>
  )
}
