'use client';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CountForm = ({ initialData = {} }) => {
  const router=useRouter();
  
  const [description, setDescription] = useState(initialData.description || '');
  const [title, setFirstTitle] = useState(initialData.title || 'Our Fun Facts');
  const [num, setSecondTitle] = useState(initialData.num || '');
 
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;

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
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
        const formData = new FormData();
        formData.append('description', description);
        formData.append('title', title);
        formData.append('num', num);
     
        
        // Handle form submission logic here, e.g., API request
    
    if(initialData && initialData.id){
      formData.append('id',initialData.id)
      const response = await fetch(`${serverurl}add-count/`, {
        method: "POST",
        headers: {
  
          'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
        },
        body: formData,  // Send the FormData as the request body
      });
      if (response.ok) {
        
        toast.success("Data saved successfully!");
        alert('Data saved successfully!');;
        router.push('/admin/count')
      } else {
        alert('Something went wrong!');
      }

    } 
    
    else{
    const response = await fetch(`${serverurl}add-count/`, {
      method: "POST",
      headers: {

        'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
      },
      body: formData,  // Send the FormData as the request body
    });
   



    if (response.ok) {
      toast.success("Data saved successfully!");
      alert('Data saved successfully!');;
      router.push('/admin/count')
    } else {
      alert('Something went wrong!');
    }
  }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
   <div>
        <label htmlFor="firstTitle" className="block"> Title</label>
        <input
          id="firstTitle"
          type="text"
          readOnly
          value={title}
          onChange={(e) => setFirstTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

   

      <div>
        <label htmlFor="secondTitle" className="block">Total Count</label>
        <input
          id="secondTitle"
          type="text"
          value={num}
          onChange={(e) => setSecondTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

 
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{initialData && initialData?"Update":'Save'}</button>
    </form>
  );
};

export default CountForm;