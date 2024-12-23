'use client';
import React, { useState,useEffect } from 'react';
import PortfolioForm from '@/app/components/portfolioform';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
const PortfolioManage = () => {

  const [portfolioData, setPortfolioData] = useState();
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
  const [superAdmin, setSuperAdmin] = useState(null);

 
  useEffect(() => {
    const fetchportfolioData = async () => {
      try {
        const response = await fetch(`${serverurls}portfolio/`);
        const data = await response.json();
        setPortfolioData(data.data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };
    if (typeof window !== 'undefined') {
      // Now it's safe to use localStorage in the browser
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData));
      }
    }
   
    fetchportfolioData();
  }, []);

  const handlePortfolioSubmit = (formData, index) => {
    if (index !== undefined) {
      // Edit existing portfolio item
      const updatedPortfolio = [...portfolioData];
      updatedPortfolio[index] = formData;
      setPortfolioData(updatedPortfolio);
    } else {
      // Add new portfolio item
      setPortfolioData((prevData) => [...prevData, formData]);
    }
  };


  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('id',id);
    const response = await fetch(`${serverurls}delete-portfolio/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

  const data = await response.json();
  // const response = await fetch(`${serverurls}/services/${id}`, { method: 'DELETE' });
    if (response.ok) {
      toast.success("Date deleted Sucessfully")

      setPortfolioData(portfolioData.filter((portfolio) => portfolio.id !== id)); 
       }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Manage Portfolio</h2>
      <div className="mb-4">
        <Link href="/admin/portfolio/add" className="bg-blue-500 text-white px-4 py-2 rounded">
       Add New 
        </Link>
      </div>
      {/* Portfolio Form */}

      {/* Portfolio List */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Portfolio List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {portfolioData?.map((item, index) => (
            <div key={index} className="border p-4 rounded">
                 <Image
                   src={serverurl+item.image} 
                   alt={item.title} 
                      width={164}  // Corresponds to w-16 (16 * 4px)
                      height={164} // Corresponds to h-16 (16 * 4px)
                      // priority={true}
                      loading="lazy"
                quality={55} // Optional: redu
                      // Optional: Prioritize this image for loading
                    />
              {/* <img src={serverurl+item.image} alt={item.title} className="w-full h-40 object-cover rounded mb-4" /> */}
              <h4 className="text-xl font-bold">{item.title}</h4>
              <h5 className="text-lg">{item.heading}</h5>
              <p>{item.text}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                  >
                  Delete
                </button>
                <Link href={`/admin/portfolio/update/${item.id}`}>
                    <p className="text-blue-500 hover:text-blue-700 font-medium">Edit</p>
                  </Link>
                  <Link href={`/admin/portfolio/detail/${item.slug}`}>
                    <p className="text-blue-500 hover:text-blue-700 font-medium">Add Detai</p>
                  </Link>
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManage;