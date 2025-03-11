'use client';
import NewsForm from '@/app/components/Newsform';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
NewsForm
const NewsMangage = () => {
  const [newsData, setnewsData] = useState();
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
fetchnewsData();    }
  }, [language]); // Runs whenever `language` changes
  
 
    const fetchnewsData = async () => {
      try {
        const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}news/`);
        const data = await response.json();
        setnewsData(data.data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
      
    };
   
   


  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  const handleDelete = async (id) => {
    if ( !superAdmin || !language) return; // Ensure both are set before making the fetch request

    const formData = new FormData();
    formData.append('id',id);
    const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}delete-news/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

  const data = await response.json();
  // const response = await fetch(`${serverurl}/services/${id}`, { method: 'DELETE' });
    if (response.ok) {
      toast.success("Date deleted Sucessfully")

      setnewsData(newsData.filter((team) => team.id !== id)); 
       }
  };

  // Handle edit button click
  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
  };

  // Handle add new team member
  const handleAdd = () => {
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Manage News</h2>

      {/* Button to add new team member */}
      <div className="mb-4">
        <Link href="/admin/news/add" className="bg-blue-500 text-white px-4 py-2 rounded">
       Add New 
        </Link>
        </div>

    
      <div className="mt-8">
        <h3 className="text-2xl font-bold">News List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {newsData?.map((item, index) => (
            <div key={index} className="border p-4 rounded">
              <Image
              width={166}
              height={166}
              loading="lazy"
              quality={55} 
              src={serverurl+item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-4"
              />
              <h4 className="text-xl font-bold">{item.name}</h4>
              <h5 className="text-lg">{item.title}</h5>
              <div className="mt-4">
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
                {/* Edit button */}
               
                <Link href={`/admin/news/update/${item.id}`}>
                    <p className="text-blue-500 hover:text-blue-700 font-medium">Edit</p>
                  </Link>
                  <Link href={`/admin/news/detail/${item.slug}`}>
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

export default NewsMangage;