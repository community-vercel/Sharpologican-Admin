'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';
import PortfolioForm from '@/app/components/portfolioform';


const Editportfolio = () => {
  const [portfolio, setportfolio] = useState(null);
  const params=useParams()
  const id  = params.id;
  console.log("id ",id)
const [superAdmin, setSuperAdmin] = useState(null);

 

  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData)); // Set state once with parsed value
      }
    }
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {
    if (!id || !superAdmin) return; // Ensure both are set before making the fetch request

    const fetchService = async () => {
      const formData = new FormData();
    formData.append('id',id);
    const response = await fetch(`${serverurls}get-portfolio/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

      const data = await response.json();
      setportfolio(data.data);
    };

    fetchService();
  }, [id,superAdmin]);

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