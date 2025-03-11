'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';
import TeamForm from '@/app/components/TeamForm';

const AddTeam = () => {
  const [team, setTeam] = useState(null);
 
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
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
  useEffect(() => {
    if (language) {
    fetchteam();
    }
  }, [language]); // Runs whenever `language` changes
  

    const fetchteam = async () => {
      const formData = new FormData();
    const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}team/`);

      const data = await response.json();
      setTeam(data.data);
    };

 

  return (
    <Layout>
      {team ? (
        <>
          <h2 className="text-3xl font-bold mb-6">Edit Team</h2>
          <TeamForm teamMember={team} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default AddTeam;