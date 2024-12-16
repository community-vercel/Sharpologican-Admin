'use client';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const ServiceForm = ({ initialData = {} }) => {
    const router = useRouter();

  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [detailedDescription, setDetailedDescription] = useState(initialData.detailedDescription || '');
  const [image, setImage] = useState(null);
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (file) {
      // You can check the file type here if needed, e.g., only allow images
      if (file.type.startsWith('image/')) {
        setImage(file);
        console.log('File selected:', file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };
  
const [superAdmin, setSuperAdmin] = useState(null);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Now it's safe to use localStorage in the browser
        const superAdminData = localStorage.getItem("superAdmin");
        if (superAdminData) {
          setSuperAdmin(JSON.parse(superAdminData));
        }
      }
    }, []);console.log("super admin",superAdmin)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData instance
    const formData = new FormData();
  
    // Append your form fields (title, description, etc.) to FormData
    formData.append("title", title);
    formData.append("description", description);
    formData.append("detailedDescription", detailedDescription);
  
    // Append the image (ensure 'image' is a File object)
    if (image) {
      formData.append("image", image);  // 'image' is the File object
    }
    else{
      formData.append("image", initialData.image);  // 'image' is the File object


    }
  
    try {
      if(initialData.id){
        formData.append("id", initialData.id);

        const response = await fetch(`${serverurl}update-service/`, {
          method: "POST",
          headers: {
  
            'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
          },
          body: formData,  // Send the FormData as the request body
        });
        const data = await response.json();
        console.log(data.status)
            if (data.status==='success') {
              console
              router.push('/admin/services')
      
              toast.success("Added successgully")
      
            } else {
      
              // Handle failure
            }
      }
      else{
        const response = await fetch(`${serverurl}add-service/`, {
          method: "POST",
          headers: {
  
            'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
          },
          body: formData,  // Send the FormData as the request body
        });
        const data = await response.json();
        console.log(data.status)
            if (data.status==='success') {
              console
              router.push('/admin/services')
      
              toast.success("Added successgully")
      
            } else {
      
              // Handle failure
            }
      }
    
  
  
    } catch (error) {
      toast.error(error)
      console.error("Error during form submission:", error);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block">Title</label>
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
        <label htmlFor="detailedDescription" className="block">Detailed Description</label>
        <textarea
          id="detailedDescription"
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
       
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
      {!image && initialData.image ? (
                  <img
                    src={serverurl+initialData.image.replace("/media/media",'media/')}
                    // alt={service.title}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                ) : (
                  <span className="text-gray-500"></span>
                )}
     
     </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default ServiceForm;