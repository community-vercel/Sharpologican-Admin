'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
const TeamForm = ({ teamMember }) => {
const router=useRouter()

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setdescription] = useState('');
  const [des, setdes] = useState('');
  const [index, setindex] = useState();

  useEffect(() => {
    if (teamMember) {
      setName(teamMember.name);
      setTitle(teamMember.title);
      setindex(teamMember.index);

      setdescription(teamMember.description ||  teamMember[0]?.description || '' );
      setdes(teamMember?.des || teamMember[0]?.description  || '')
    }
  }, [teamMember]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const serverurl=process.env.NEXT_PUBLIC_DJANGO_URL;
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name',name);
    formData.append('title', title);
    formData.append('description',description);
    formData.append('index',index);


    if (image) {
        formData.append('image', image); // Appending the image file
      }
    
    // Handle form submission logic here, e.g., API request
if(teamMember && teamMember.id){
  formData.append('id',teamMember.id);

  const response = await fetch(`${serverurls}update-team/`, {
    method: "POST",
    headers: {
  
      'x-super-admin': JSON.stringify(superAdmin),  
    },
    body: formData,  // Send the FormData as the request body
  });
  if (response.ok) {
    toast.success("Data saved successfully!");
    // alert('Data saved successfully!');;
    router.push('/admin/team')
  } else {
    alert('Something went wrong!');
  }
}
 else{

 
// Send the data to the backend API for saving
const response = await fetch(`${serverurls}add-team/`, {
  method: "POST",
  headers: {

    'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
  },
  body: formData,  // Send the FormData as the request body
});
if (response.ok) {
  toast.success("Data saved successfully!");
  // alert('Data saved successfully!');;
  router.push('/admin/team')
} else {
  alert('Something went wrong!');
}}
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
        <label htmlFor="title" className="block">Index (Priority)</label>
        <input
          id="index"
          type="number"
          value={index}
          onChange={(e) => setindex(e.target.value)}
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
      {
      teamMember?.teamid && teamMember?.id===teamMember?.teamid?  ( <div>
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
  

{!image && teamMember?.image?(
<img src={serverurl+teamMember.image} alt="" />
):''}

      {/* {image && <img src={URL.createObjectURL(image)} alt="Image Preview" className="mt-4 w-32 h-32 object-cover rounded" />} */}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {teamMember && teamMember.id ? 'Update' : 'Add'} Team Member
      </button>
    </form>

<ToastContainer />

</>
  );
};

export default TeamForm;