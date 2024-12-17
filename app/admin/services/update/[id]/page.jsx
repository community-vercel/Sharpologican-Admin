'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';

Layout
const EditService = () => {
  const [service, setService] = useState(null);
  const params=useParams()
  const id  = params.id;
  console.log("id ",id)
  const [superAdmin, setSuperAdmin] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData)); // Set state once with parsed value
      }
    }
  }, [])  
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        console.log("Fetched superAdmin from localStorage:", superAdminData);
        setSuperAdmin(JSON.parse(superAdminData));
      }
    }
  }, []); // Empty dependency array ensures it runs only once

  // Fetch service data based on `id` and `superAdmin`
  useEffect(() => {
    if (!id || !superAdmin) return;  // Wait until both `id` and `superAdmin` are available
    if (service) return;  // Avoid re-fetching if the service is already set

    console.log("Fetching service data for id:", id, "superAdmin:", superAdmin);

    const fetchService = async () => {
      const formData = new FormData();
      formData.append('id', id);

      try {
        const response = await fetch(`${serverurls}get-service/`, {
          method: 'POST',
          headers: {
            'x-super-admin': JSON.stringify(superAdmin),
          },
          body: formData,
        });

        const data = await response.json();
        console.log("Fetched service data:", data);
        setService(data.data);  // Set service data state
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id,superAdmin,service]);

  return (
    <Layout>
      {service ? (
        <>
          <h2 className="text-3xl font-bold mb-6">Edit Service</h2>
          <ServiceForm initialData={service} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default EditService;