
'use client';
import { useState, useEffect } from 'react';
import AboutUsForm from '@/app/components/Aboutusform';
import Layout from '@/app/components/Layout';
import { useRouter } from 'next/navigation';

const ManageAboutUs = () => {

  const [aboutUsData, setAboutUsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;

  const [language, setLanguage] = useState(); // Default language is English

 




const [superAdmin, setSuperAdmin] = useState(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    console.log("language before setting:", language);

    const superAdminData = localStorage.getItem("superAdmin");
    if (superAdminData) {
      setSuperAdmin(JSON.parse(superAdminData)); // Set admin state
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage); // This will trigger the next useEffect
      console.log("Saved language:", savedLanguage);
    }
  }
}, []);

// Run fetch when `language` is updated
useEffect(() => {
  if (language) {
    fetchAboutUsData();
  }
}, [language]); // Runs whenever `language` changes


 
    const fetchAboutUsData = async () => {
      // if(!language) return;

      try {
        if (language ) {
          const response = await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:process.env.NEXT_PUBLIC_DJANGO_URLS}about-us/`);
          const data = await response.json();
          setAboutUsData(data.data);
          setIsLoading(false);        }
        
      } catch (error) {
        console.error("Error fetching About Us data:", error);
        setIsLoading(false);
      }
    };
   
  
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    
    
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Manage About Us</h2>
        {aboutUsData ? (
          <AboutUsForm initialData={aboutUsData} />
        ) : (
          <AboutUsForm initialData={[]} />
        )}
      </div>
    </Layout>
  );
};

export default ManageAboutUs;


