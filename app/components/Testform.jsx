'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
const TestimonialForm = ({ onSubmit, isEditing, testimonial }) => {
  const router=useRouter()
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
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
    if ( testimonial) {
      setName(testimonial.name);
      setTitle(testimonial.title);
    }
    if (typeof window !== 'undefined') {
      // Now it's safe to use localStorage in the browser
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData));
      }
    }
  }, [testimonial]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
   
    if (image) {
        formData.append('image', image); // Appending the image file
      }
    
    // Handle form submission logic here, e.g., API request
if(testimonial && testimonial.id){
  formData.append('id', testimonial.id);

  const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}update-test/`, {
    method: "POST",
    headers: {
  
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body: formData,  // Send the FormData as the request body
  });
  
  
  if (response.ok) {
    toast.success("Data saved successfully!");
    alert('Data saved successfully!');;
    router.push('/admin/test')
  } else {
    alert('Something went wrong!');
  }
}
else{
 
// Send the data to the backend API for saving
const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}add-testimonial/`, {
  method: "POST",
  headers: {

    'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
  },
  body: formData,  // Send the FormData as the request body
});


if (response.ok) {
  toast.success("Data saved successfully!");
  alert('Data saved successfully!');;
  router.push('/admin/test')
} else {
  alert('Something went wrong!');
}
}
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="title" className="block">Content</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="image" className="block">Upload Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
      </div>

{!image && testimonial && testimonial.image?(
  <img src={serverurl+testimonial.image} alt="" />
):''}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {testimonial && testimonial.id ? 'Update' : 'Add'} Testimonial
      </button>
    </form>
        <ToastContainer />
        </>

  );
};

export default TestimonialForm;