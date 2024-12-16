'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const PortfolioForm = ({ onSubmit, portfolioItem }) => {
  const router=useRouter()
  const [title, setTitle] = useState(portfolioItem?.title || '');
  const [heading, setHeading] = useState(portfolioItem?.heading || '');
  const [text, setText] = useState(portfolioItem?.text || '');
  const [buttonText, setButtonText] = useState(portfolioItem?.buttonText || '');
  const[description,setdescription]=useState(portfolioItem?.description || '')
  const[des,setdes]=useState(portfolioItem?.des || portfolioItem[0]?.description)

  const [image, setImage] = useState(null);
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
    }, []);  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('heading',heading);
    formData.append('link', text);
    formData.append('text_button', buttonText);
    formData.append('description', description);

    if (image) {
      formData.append('image', image); // Appending the image file
    }
    if(portfolioItem && portfolioItem.id){
      formData.append('id',portfolioItem.id);

      const response = await fetch(`${serverurl}update-portfolio/`, {
        method: "POST",
        headers: {
  
          'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
        },
        body: formData,  // Send the FormData as the request body
      });
      if (response.ok) {
        toast.success("Data saved successfully!");
        router.push('/admin/portfolio')
      } else {
        alert('Something went wrong!');
      }
    }
    else{
      const response = await fetch(`${serverurl}add-portfolio/`, {
        method: "POST",
        headers: {
  
          'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
        },
        body: formData,  // Send the FormData as the request body
      });
      if (response.ok) {
        toast.success("Data saved successfully!");
        router.push('/admin/portfolio')
      } else {
        alert('Something went wrong!');
      }
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
        <label htmlFor="text" className="block">Text</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="buttonText" className="block">Button Text</label>
        <input
          id="buttonText"
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {
      portfolioItem?.portfolioid && portfolioItem?.id===portfolioItem?.portfolioid?  ( <div>
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
{!image && portfolioItem?.image?(
  <img src={serverurl+portfolioItem.image} alt="" />
):''}
      {/* {image && <img src={URL.createObjectURL(image)} alt="Image Preview" className="mt-4 w-32 h-32 object-cover rounded" />} */}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default PortfolioForm;