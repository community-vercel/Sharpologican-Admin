'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';

const Services = () => {
  const [services, setServices] = useState([]);
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
  const [superAdmin, setSuperAdmin] = useState(null);


  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch(`${serverurls}services/`);
      const data = await response.json();
      setServices(data.data);
    };
    if (typeof window !== 'undefined') {
      // Now it's safe to use localStorage in the browser
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData));
      }
    }
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('id',id);
    const response = await fetch(`${serverurls}delete-service/`, {
    method: 'POST',
    headers: {
    
      'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
    },
    body:formData
  });

  const data = await response.json();
  // const response = await fetch(`${serverurls}/services/${id}`, { method: 'DELETE' });
    if (response.ok) {
      toast.success("Date deleted Sucessfully")
      setServices(services.filter((service) => service.id !== id));
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Manage Services</h2>
      <div className="mb-4">
        <Link href="/admin/services/new" className="bg-blue-500 text-white px-4 py-2 rounded">
       Add New Service
        </Link>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table-auto w-full text-sm text-left text-gray-700 border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 font-semibold text-gray-600">Title</th>
            <th className="py-3 px-6 font-semibold text-gray-600">Description</th>
            <th className="py-3 px-6 font-semibold text-gray-600">Image</th>
            <th className="py-3 px-6 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services?.map((service) => (
            <tr key={service.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6">{service.title}</td>
              <td className="py-4 px-6">{service.description}</td>
              <td className="py-4 px-6">
                {service.image ? (
                  <img
                  src={serverurl + service.image.replace('/media/media/', '/media/')}
                  alt={service.title}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-4">
                  <Link href={`/admin/services/update/${service.id}`}>
                    <p className="text-blue-500 hover:text-blue-700 font-medium">Edit</p>
                  </Link>
                  <Link href={`/admin/services/detail/${service.slug}`}>
                    <p className="text-blue-500 hover:text-blue-700 font-medium">Add Detai</p>
                  </Link>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default Services;