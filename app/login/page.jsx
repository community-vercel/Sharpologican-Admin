'use client';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
 const [language, setLanguage] = useState('en'); // Default language is English
 useEffect(() => {
    // Check if user data is available in localStorage (this indicates login)
    const user = localStorage.getItem('superAdmin');
    const savedLanguage = localStorage.getItem('language');
console.log("savedLanguage",savedLanguage);
    if (savedLanguage) {
      setLanguage(savedLanguage); // Set the language from localStorage
    }
    else{
      localStorage.setItem('language','en'); // Save the selected language

    }

    if (!user) {
      // If no user data is found, redirect to the login page
      router.push('/login');
    } 
  }, [router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const payload = {
        username: username,
        password: password,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URLS}super-admin-login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      // Parse the response as JSON
      const data = await response.json();
  
      console.log("data", data); // Log the parsed response data
  
      // Check for a successful response and status
      if (data.status === 200 && data.status === 200) {
        console.log("hiii");
        // Assuming you want to save the user information in localStorage/sessionStorage or a global state like Redux
        localStorage.setItem('superAdmin', JSON.stringify(data.user)); // Save user data to localStorage
        router.push('/'); // Redirect to the dashboard or admin area
      } else {
        // Handle other statuses or errors
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value || 'en';
    setLanguage(selectedLanguage);
    localStorage.setItem('language',selectedLanguage); // Save the selected language
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Super Admin Login</h2>
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="de">Germany</option>
          <option value="fr">French</option>
          <option value="nl">Netherland(Dutch)</option>

        </select>
      </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
