'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
const RequestDetails = () => {
    const params=useParams()
  const id  = params.id;
  console.log("id",id)
  const [request, setRequest] = useState(null);
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  useEffect(() => {
    if (id) {
      // Fetch the request details from an API or database
      fetch(`${serverurls}quote-requests/${id}`)
        .then((response) => response.json())
        .then((data) => setRequest(data))
        .catch((error) => console.error('Error fetching request details:', error));
    }
  }, [id]);

  if (!request) return <div>Loading...</div>;

  return (
    <Layout>
 <div className="container mx-auto p-6">
  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Request Details</h1>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700 text-lg w-1/3">Name:</span>
        <span className="text-gray-800 text-lg">{request.first_name} {request.last_name}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700 text-lg w-1/3">Email:</span>
        <span className="text-gray-800 text-lg">{request.email}</span>
      </div>
      <div className="flex items-start justify-between">
        <span className="font-semibold text-gray-700 text-lg w-1/3">Services Required:</span>
        <ul className="text-gray-800 text-lg space-y-1">
          {request.services_required.map((service, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-4 h-4 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 12.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {service}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-start justify-between">
        <span className="font-semibold text-gray-700 text-lg w-1/3">Project Overview:</span>
        <p className="text-gray-800 text-lg">{request.project_overview}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700 text-lg w-1/3">Budget:</span>
        <span className="text-gray-800 text-lg">{request.budget}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700 text-lg w-1/3">When to Start:</span>
        <span className="text-gray-800 text-lg">{request.ready_to_start}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700 text-lg w-1/3">Date:</span>
        <span className="text-gray-800 text-lg">{new Date(request.published_date).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default RequestDetails;