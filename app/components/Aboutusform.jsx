'use client';
import { useState,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AboutUsForm = ({ initialData = {} }) => {
  const router=useRouter();
  const [heading, setHeading] = useState(initialData?.heading || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [firstTitle, setFirstTitle] = useState(initialData?.firstTitle || '');
  const [secondTitle, setSecondTitle] = useState(initialData?.secondTitle || '');
  const [firstDescription, setFirstDescription] = useState(initialData?.firstDescription || '');
  const [secondDescription, setSecondDescription] = useState(initialData?.secondDescription || '');
  const [image, setImage] = useState(null);
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  const [superAdmin, setSuperAdmin] = useState(null);

  const [language, setLanguage] = useState(); // Default language is English

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
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('firstTitle', firstTitle);
        formData.append('secondTitle', secondTitle);
        formData.append('firstDescription', firstDescription);
        formData.append('secondDescription', secondDescription);
        if (image) {
            formData.append('image', image); 
          }
        
        // Handle form submission logic here, e.g., API request
    
     
    // Send the data to the backend API for saving
    const response = await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}add-about-us/`, {
      method: "POST",
      headers: {

        'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
      },
      body: formData,  // Send the FormData as the request body
    });
   

    if (response.ok) {
      toast.success("Data saved successfully!");
      alert('Data saved successfully!');;
      router.push('/admin/aboutus')
    } else {
      alert('Something went wrong!');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="heading" className="block">Heading</label>
        <input
          id="heading"
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full p-2 border rounded"
          required
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
        <label htmlFor="firstTitle" className="block">First Title</label>
        <input
          id="firstTitle"
          type="text"
          value={firstTitle}
          onChange={(e) => setFirstTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="secondTitle" className="block">Second Title</label>
        <input
          id="secondTitle"
          type="text"
          value={secondTitle}
          onChange={(e) => setSecondTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="firstDescription" className="block">First Description</label>
        <textarea
          id="firstDescription"
          value={firstDescription}
          onChange={(e) => setFirstDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="secondDescription" className="block">Second Description</label>
        <textarea
          id="secondDescription"
          value={secondDescription}
          onChange={(e) => setSecondDescription(e.target.value)}
          className="w-full p-2 border rounded"
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
      {!image && initialData.image?(
        <img src={serverurl+initialData.image}></img>
      ):''}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
    <ToastContainer />

</>

  );
};

export default AboutUsForm;
