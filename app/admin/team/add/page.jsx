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

  useEffect(() => {


    const fetchteam = async () => {
      const formData = new FormData();
    const response = await fetch(`${serverurls}team/`);

      const data = await response.json();
      setTeam(data.data);
    };

    fetchteam();
  }, []);

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