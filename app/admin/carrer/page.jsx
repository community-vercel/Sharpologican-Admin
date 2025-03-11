'use client'
import Layout from '@/app/components/Layout';
import { useState,useEffect } from 'react';

export default function JobForm() {
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
  useEffect(() => {
    if (language) {
      getDetails();
      
    }
  }, [language]); // Runs whenever `language` changes
  
  const [formData2, setFormData2] = useState({
   
    heading: "",
    description: "",
    meta_title: "",
    meta_description: "",
    description: "",

    keywords: "",
 
  });
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    description: '',
    apply_link: 'https://sharplogicians.com/career',
    deadline:Date.now().toString,

 
  });

      if(!superAdmin && !language) return;
  
  
      // This hook will run on the client side if you want to refetch the data.
      // For example, to implement polling or dynamic refresh:
  
  const getDetails=async ()=>{
      const res =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}get-carrers/`,{
          method: 'POST',
          headers: {
              "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
            },
        });
        const data = await res.json();
        setFormData2(data.data);
  }
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setFormData2((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit3 = async (e) => {
            if(!superAdmin && !language) return;


    e.preventDefault();
    setIsSubmitting(true);

    const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}add-metajobs/`, {
      method: 'POST',
      headers: {
        "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
      },
      body: JSON.stringify(formData2),
    });

    if (response.ok) {
      alert('Job created successfully!');
    
    } else {
      alert('Failed to create job');
    }

    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
            if(!superAdmin || !language) return;


    e.preventDefault();
    setIsSubmitting(true);

    const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}add-jobs/`, {
      method: 'POST',
      headers: {
        "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Job created successfully!');
      setFormData({
        title: '',
        location: '',
        category: '',
        description: '',
        apply_link: '',
    
      });
    } else {
      alert('Failed to create job');
    }

    setIsSubmitting(false);
  };
  return (
    <Layout>
 
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold">Add New Job</h2>
    
      
        <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">Job Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        ></textarea>
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">Deadline</label>
        <input
        type='date'
          name="deadline"
          id="description"
          value={formData.deadline}
          onChange={handleChange}
          rows="4"
          ty
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        ></input>
      </div>
      <div className="space-y-2">
        <label htmlFor="apply_link" className="block text-sm font-medium">Apply email</label>
        <input
          type="url"
          name="apply_link"
          id="apply_link"
          value={formData.apply_link?formData.apply_link:'https://sharplogicians.com/career'}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-3 text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'} rounded-lg`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Job'}
      </button>
    </form>


    <form onSubmit={handleSubmit3} className="space-y-4 mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold">Add Career Seo</h2>
    
      <div>
          <label className="block text-gray-700 font-medium">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData2?.heading}
            onChange={handleChange3}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData2?.description}
            onChange={handleChange3}
            rows="3"
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Meta Title</label>
          <input
            type="text"
            name="meta_title"
            value={formData2?.meta_title}
            onChange={handleChange3}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Meta Description</label>
          <textarea
            name="meta_description"
            value={formData2?.meta_description}
            onChange={handleChange3}
            rows="3"
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Keywords</label>
          <input
            type="text"
            name="keywords"
            value={formData2?.keywords}
            onChange={handleChange3}
            className="w-full border rounded px-4 py-2"
          />
        </div>
     
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-3 text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'} rounded-lg`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Seo'}
      </button>
    </form>
    </Layout>
  );
}