'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';
import PortfolioForm from '@/app/components/portfolioform';


const Editportfolio = () => {
  const [portfolio, setportfolio] = useState(null);
 
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;

 const [language, setLanguage] = useState(); // Default language is English
  const [superAdmin, setSuperAdmin] = useState(null);

useEffect(() => {
  // Check if user data is available in localStorage (this indicates login)
 const superAdminData = localStorage.getItem("superAdmin");
if (superAdminData) {
  setSuperAdmin(JSON.parse(superAdminData));
}
const savedLanguage = localStorage.getItem('language');

if (savedLanguage) {
  
  setLanguage(savedLanguage); // Set the language from localStorage
}

})
useEffect(() => {
  if (language) {
    fetchService();
  }
}, [language]); // Runs whenever `language` changes


  

    const fetchService = async () => {
      const formData = new FormData();
    const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}portfolio/`);

      const data = await response.json();
      setportfolio(data.data);
    };

   

  return (
    <Layout>
      {portfolio ? (
        <>
          <h2 className="text-3xl font-bold mb-6">Edit Portfolio</h2>
          <PortfolioForm portfolioItem={portfolio} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default Editportfolio;
