'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import ServiceForm from '@/app/components/Serviceform';
import TeamForm from '@/app/components/TeamForm';

const EditTeam = () => {
  const [team, setTeam] = useState(null);
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
  }, []);  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;

  useEffect(() => {
    if (!id) return;

    const fetchteam = async () => {
      const formData = new FormData();
    formData.append('id',id);
    const response = await fetch(`${serverurl}get-team/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

      const data = await response.json();
      setTeam(data.data);
    };

    fetchteam();
  }, [id]);

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

export default EditTeam;