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


  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
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
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {
    if (language) {
      fetchService();
    }
  }, [language]); // Runs whenever `language` changes
  

    const fetchService = async () => {
      const formData = new FormData();
      formData.append('id', id);

      try {
        const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}get-service/`, {
          method: 'POST',
          headers: {
            'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
          },
          body: formData,
        });

        const data = await response.json();
        setService(data.data);  // Set service data state
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

  
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