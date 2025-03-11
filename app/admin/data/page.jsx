'use client'
import Layout from '@/app/components/Layout';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [data, setData] = useState({
    jobs: [],
    benefits: []
  });
  const [loading, setLoading] = useState(true);
  const serverurls = process.env.NEXT_PUBLIC_DJANGO_URLS;
  const [superAdmin, setSuperAdmin] = useState(null);


    const [language, setLanguage] = useState(); // Default language is English

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData)); // Set state once with parsed value
      }
      const savedLanguage = localStorage.getItem('language');

      if (savedLanguage) {
        
        setLanguage(savedLanguage); // Set the language from localStorage
      }
    }
  }, []);
    useEffect(() => {
      if (language) {
        fetchData();
      }
    }, [language]); // Runs whenever `language` changes
    

    const fetchData = async () => {
      const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}get-data/`);
      const result = await response.json();

      setData(result);
      setLoading(false);
    };

    fetchData();


  const deleteItem = async (type, id) => {
    if ( !superAdmin || !language) return; // Ensure both are set before making the fetch request

    try {
      const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}delete-data/`, {
        method: 'DELETE',
        headers: {
            "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
        },
        body: JSON.stringify({ type, id }),
      });
  
      if (response.ok) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
        setData((prevData) => ({
          ...prevData,
          [type]: prevData[type].filter((item) => item.id !== id),
        }));
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete');
      }
    } catch (error) {
      alert('Error deleting item');
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Jobs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Jobs</h2>
          <ul>
            {data.jobs.map((job) => (
              <li key={job.id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p>{job.location}</p>
                  <p>{job.category}</p>
                </div>
                <button
                  onClick={() => deleteItem('jobs', job.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Benefits</h2>
          <ul>
            {data.benefits.map((benefit) => (
              <li key={benefit.id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
                <button
                  onClick={() => deleteItem('benefits', benefit.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}