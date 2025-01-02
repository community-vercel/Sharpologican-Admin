'use client'
import Layout from '@/app/components/Layout';
import { useState,useEffect } from 'react';

export default function BenefitForm() {
  const [superAdmin, setSuperAdmin] = useState(null);
  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData)); // Set state once with parsed value
      }
    }
  },
  []);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

  const handleSubmit = async (e) => {
    if ( !superAdmin) return;

    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(`${serverurls}add-enefits/`,{
      method: 'POST',
      headers: {
        "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Benefit created successfully!');
      setFormData({ title: '', description: '' });
    } else {
      alert('Failed to create benefit');
    }

    setIsSubmitting(false);
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold">Add New Benefit</h2>
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">Benefit Title</label>
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
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-3 text-white ${isSubmitting ? 'bg-gray-400' : 'bg-green-600'} rounded-lg`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Benefit'}
      </button>
    </form>
    </Layout>
  );
}