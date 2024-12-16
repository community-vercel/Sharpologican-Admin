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
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await fetch(`${serverurls}about-us/`);
        const data = await response.json();
        setAboutUsData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
        setIsLoading(false);
      }
    };
   
    fetchAboutUsData();
  }, []);

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
