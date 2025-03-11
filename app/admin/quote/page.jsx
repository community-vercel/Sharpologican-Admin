'use client'
import Layout from '@/app/components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const QuoteRequests = ({ quoteRequests }) => {
  const [requests, setRequests] = useState(quoteRequests);
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
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
      getDetails();
    }
  }, [language]); // Runs whenever `language` changes
  


    // This hook will run on the client side if you want to refetch the data.
    // For example, to implement polling or dynamic refresh:

const getDetails=async ()=>{
    const res =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}quote-requests/`,{
        method: 'POST',
        headers: {
            "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
          },
      });
      const data = await res.json();
      setRequests(data.quote_requests);
}



  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quote Requests</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">Name</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">Email</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">Services Required</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">Amount</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">When to Start</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">Date</th>

          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">Action</th>
        </tr>
      </thead>
      <tbody>
        {requests?.map((request) => (
          <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-300">
            <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{request.first_name} {request.last_name}</td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{request.email}</td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">
              <ul className="list-disc pl-5">
                {request.services_required.map((service, index) => (
                  <li key={index} className="text-sm">{service}</li>
                ))}
              </ul>
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{request.budget}</td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{request.ready_to_start}</td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{request.published_date}</td>

            <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">
              <Link className="text-blue-600 hover:text-blue-800" href={`/admin/quote/${request.id}`}>
        View Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
 
    </div>
    </Layout>
  );
};



export default QuoteRequests;