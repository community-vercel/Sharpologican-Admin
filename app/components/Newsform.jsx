'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
const NewsForm = ({teamMember }) => {

  const router=useRouter()
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const [description, setdescription] = useState('');
  const [des, setdes] = useState('');
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
      fetchnewsData();
      }
    }, [language]); // Runs whenever `language` changes
    
  
      const fetchnewsData = async () => {
        try {
          const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}news/`);
          const data = await response.json();
          setnewsData(data.data);
          setdes(newsData.des || teamMember.description || '')

        } catch (error) {
          console.error("Error fetching About Us data:", error);
        }
        
      };
    
    
  useEffect(() => {
    if ( teamMember) {
      setName(teamMember.name);
      setTitle(teamMember.title);
      setdescription(teamMember.description  || '' );
      setdes(teamMember.description || '')

    }
  }, [ teamMember]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };


  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage2(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description',description);

   
    if (image) {
        formData.append('image', image); // Appending the image file
      }
      if (image2) {
        formData.append('image2', image2); // Appending the image file
      }
    
    // Handle form submission logic here, e.g., API request
if(teamMember && teamMember.id){
  formData.append('id',teamMember.id);

  const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}update-news/`, {
    method: "POST",
    headers: {
  
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body: formData,  // Send the FormData as the request body
  });
  
if (response.ok) {
  toast.success("Data saved successfully!");
  router.push('/admin/news')
} else {
  alert('Something went wrong!');
}
}
else{
// Send the data to the backend API for saving
const response =   await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:language==='de'?process.env.NEXT_PUBLIC_DJANGO_URLS_DE:language==='nl'?process.env.NEXT_PUBLIC_DJANGO_URLS_NL:''}add-news/`, {
  method: "POST",
  headers: {

    'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
  },
  body: formData,  // Send the FormData as the request body
});


if (response.ok) {
  toast.success("Data saved successfully!");
  // alert('Data saved successfully!');;
  router.push('/admin/news')
} else {
  alert('Something went wrong!');
}}
  };


  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Content</label>
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
        <label htmlFor="title" className="block">Heading</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {
      teamMember?.newsid && teamMember?.id===teamMember?.newsid?  ( <div>
        <label htmlFor="heading" className="block">Description(Home)</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>): des && des?(
        <span></span>
      ) :(
      <div>
      <label htmlFor="heading" className="block">Description(Home)</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
    </div>
    )}

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

{!image && teamMember && teamMember.image?(
  <img src={serverurl+teamMember.image} alt="" />
):''}

<div>
        <label htmlFor="image" className="block">Ground Image</label>
        <input
          id="image2"
          type="file"
          accept="image/*"
          onChange={handleImageChange2}
          className="w-full p-2 border rounded"
        />
      </div>

{!image2 && teamMember && teamMember.image2?(
  <img src={serverurl+teamMember.image2} alt="" />
):''}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {teamMember && teamMember.id ? 'Update' : 'Add'} News
      </button>
    </form>
    <ToastContainer />

    </>
  );
};

export default NewsForm;