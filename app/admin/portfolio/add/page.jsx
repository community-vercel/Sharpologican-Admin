'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';
import PortfolioForm from '@/app/components/portfolioform';


const Editportfolio = () => {
  const [portfolio, setportfolio] = useState(null);
 
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;

  useEffect(() => {
   

    const fetchService = async () => {
      const formData = new FormData();
    const response = await fetch(`${serverurl}portfolio/`);

      const data = await response.json();
      setportfolio(data.data);
    };

    fetchService();
  }, []);

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