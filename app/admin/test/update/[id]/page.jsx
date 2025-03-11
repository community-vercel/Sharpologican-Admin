'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';
import TeamForm from '@/app/components/TeamForm';
import TestimonialForm from '@/app/components/Testform';

const EditTeam = () => {
  const [test, setTest] = useState(null);
  const params=useParams()
  const id  = params.id;
  console.log("id ",id)

const [language, setLanguage] = useState(); // Default language is English
const [superAdmin, setSuperAdmin] = useState(null);

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
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  useEffect(() => {
    if (language) {
    fetchteam();
    }
  }, [language]); // Runs whenever `language` changes
  

      const fetchteam = async () => {
      const formData = new FormData();
    formData.append('id',id);
    const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}get-test/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

      const data = await response.json();
      setTest(data.data);
    };



  return (
    <Layout>
      {test ? (
        <>
          <h2 className="text-3xl font-bold mb-6">Edit Test</h2>
          <TestimonialForm testimonial={test} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default EditTeam;