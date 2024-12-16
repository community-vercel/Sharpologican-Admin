
'use client';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('superAdmin');

    // Optionally, you can clear other session data if needed
    // sessionStorage.removeItem('userSession'); 

    // Redirect the user to the login page
    router.push('/login');
  };
    return (
      <header className="bg-white shadow-md flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center">
          <p className="mr-4">Welcome, Admin</p>
          <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>        </div>
      </header>
    );
  };
  
  export default Header;