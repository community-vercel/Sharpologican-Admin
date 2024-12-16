'use client'
import Layout from '@/app/components/Layout';
import { useEffect, useState } from 'react';

const QuoteRequests = ({ quoteRequests }) => {
  const [requests, setRequests] = useState(quoteRequests);
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
const [superAdmin, setSuperAdmin] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Now it's safe to use localStorage in the browser
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData));
      }
    }
  }, []);
  useEffect(() => {


    // This hook will run on the client side if you want to refetch the data.
    // For example, to implement polling or dynamic refresh:

const getDetails=async ()=>{
    const res = await fetch(`${serverurls}quote-requests/`,{
        method: 'POST',
        headers: {
            "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
          },
      });
      const data = await res.json();
      setRequests(data.quote_requests);
}

 getDetails()   
  }, []);

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quote Requests</h1>
      
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-gray-700">Name</th>
            <th className="px-4 py-2 border-b text-left text-gray-700">Email</th>
            <th className="px-4 py-2 border-b text-left text-gray-700">Services Required</th>
            <th className="px-4 py-2 border-b text-left text-gray-700">Project Overview</th>
            <th className="px-4 py-2 border-b text-left text-gray-700">Amount</th>

            <th className="px-4 py-2 border-b text-left text-gray-700">When to Start</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-gray-700">{request.first_name}{request.last_name}</td>
              <td className="px-4 py-2 border-b text-gray-700">{request.email}</td>
              <td className="px-4 py-2 border-b text-gray-700">
                <ul>
                  {request.services_required.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border-b text-gray-700">{request.project_overview}</td>
              <td className="px-4 py-2 border-b text-gray-700">{request.budget}</td>

              <td className="px-4 py-2 border-b text-gray-700">{request.ready_to_start}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};



export default QuoteRequests;