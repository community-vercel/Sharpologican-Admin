'use client';
import TeamForm from '@/app/components/TeamForm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';

const TeamManage = () => {
  const [teamData, setTeamData] = useState();
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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
    fetchteamData();
    }
  }, [language]); // Runs whenever `language` changes
  
 // Ensure both are set before making the fetch request
    const fetchteamData = async () => {
      try {
        const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}team/`);
        const data = await response.json();
        setTeamData(data.data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };
   
  
  // Handle form submit (add or edit team member)
  const handleTeamSubmit = (formData, index) => {
    if (index !== undefined) {
      // Edit existing team member
      const updatedTeam = [...teamData];
      updatedTeam[index] = formData;
      setTeamData(updatedTeam);
    } else {
      // Add new team member
      setTeamData((prevData) => [...prevData, formData]);
    }
    setIsEditing(false);
    setEditIndex(null);
  };
 
  // Handle delete team member
 
  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('id',id);
    const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}delete-team/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

  const data = await response.json();
  // const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}/services/${id}`, { method: 'DELETE' });
    if (response.ok) {
      toast.success("Date deleted Sucessfully")

      setTeamData(teamData.filter((team) => team.id !== id)); 
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
      <h2 className="text-3xl font-bold mb-6">Manage Team</h2>

      {/* Button to add new team member */}
      <div className="mb-4">
        <Link href="/admin/team/add" className="bg-blue-500 text-white px-4 py-2 rounded">
       Add New 
        </Link>
        </div>

      {/* Team Form: Add or Edit Team Member */}
      

      {/* Team List */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Team List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {teamData?.map((item, index) => (
            <div key={index} className="border p-4 rounded">
            
        <Image
     src={serverurl+item.image}
     alt={item.name}
        width={164}  // Corresponds to w-16 (16 * 4px)
        height={164} // Corresponds to h-16 (16 * 4px)
        // priority={true}
        loading="lazy"
  quality={55} // Optional: redu
        // Optional: Prioritize this image for loading
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
               
                <Link href={`/admin/team/update/${item.id}`}>
                    <p className="text-blue-500 hover:text-blue-700 font-medium">Edit</p>
                  </Link>
                  <Link href={`/admin/team/update/${item.id}`}>
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

export default TeamManage;