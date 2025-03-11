'use client';
import { useState,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CountForm = ({ initialData = {} }) => {
  const router=useRouter();
  
  const [description, setDescription] = useState(initialData.description || '');
  const [title, setFirstTitle] = useState(initialData.title || 'Our Fun Facts');
  const [num, setSecondTitle] = useState(initialData.num || '');
 
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
      const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}add-count/`, {
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
    const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}add-count/`, {
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
    <>
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
    
        <ToastContainer />
</>

  );
};

export default CountForm;