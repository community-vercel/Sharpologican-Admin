'use client'
import { useEffect, useState } from 'react';
import Layout from '@/app/components/Layout';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const serverurls = process.env.NEXT_PUBLIC_DJANGO_URLS; // Set your Django API URL
  const [superAdmin, setSuperAdmin] = useState(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData)); // Set state once with parsed value
      }
    }
  }, []);
  useEffect(() => {
    const fetchApplications = async () => {
        if(!superAdmin) return;

      try {
        const response = await fetch(`${serverurls}get-all-applications/`,{
            method: 'POST',
            headers: {
                "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
            },
        });
        const result = await response.json();
        if (response.ok) {
          setApplications(result.applications);
        } else {
          alert('Failed to load applications');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [superAdmin]);

  return (
    
        <Layout>
          <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Job Application</h1>
    
            {loading ? (
              <p className="text-lg text-gray-600">Loading applications...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.length === 0 ? (
                  <div className="col-span-full text-center text-gray-600">
                    <p className="text-xl font-medium">No applications yet.</p>
                  </div>
                ) : (
                  applications.map((application, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {application.Job__title}
                      </h3>
                      <h4 className="text-lg font-medium text-gray-700 mb-1">
                        {application.name}
                      </h4>
                      <p className="text-gray-600 mb-2">Email: {application.email}</p>
                      <p className="text-gray-600 mb-4">
                        CV:{" "}
                        <a
                          href={serverurls + application.cv.replace("/api/media/", "media/")}
                          target="_blank"
                          className="text-blue-600 underline hover:text-blue-800"
                          rel="noopener noreferrer"
                        >
                          View CV
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Applied At:{" "}
                        <span className="font-medium">
                          {new Date(application.applied_at).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </Layout>
  );
}