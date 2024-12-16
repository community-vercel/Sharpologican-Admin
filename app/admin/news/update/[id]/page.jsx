'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';
import NewsForm from '@/app/components/Newsform';

Layout
const EditService = () => {
  const [news, setnews] = useState(null);
  const params=useParams()
  const id  = params.id;
  console.log("id ",id)
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
    const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
    const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
  
  useEffect(() => {
    if (!id) return;

    const fetchdata = async () => {
      const formData = new FormData();
    formData.append('id',id);
    const response = await fetch(`${serverurls}get-news/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

      const data = await response.json();
      setnews(data.data);
    };

    fetchdata();
  }, [id]);

  return (
    <Layout>
      {news ? (
        <>
          <h2 className="text-3xl font-bold mb-6">Edit News</h2>
          <NewsForm teamMember={news} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default EditService;