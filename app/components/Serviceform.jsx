'use client';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the CSS!

const ServiceForm = ({ initialData = {} }) => {
    const router = useRouter();

  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [detailedDescription, setDetailedDescription] = useState(initialData.detailedDescription || '');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
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
  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      if (!keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };
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
  
  const handleImageChange2 = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (file) {
      // You can check the file type here if needed, e.g., only allow images
      if (file.type.startsWith('image/')) {
        setImage2(file);
        console.log('File selected:', file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData instance
    const formData = new FormData();
  
    // Append your form fields (title, description, etc.) to FormData
    formData.append("title", title);
    formData.append("description", description);
    // formData.append("detailedDescription", detailedDescription);
  
    // Append the image (ensure 'image' is a File object)
    if (image) {
      formData.append("image", image);  // 'image' is the File object
    }
    else{
      formData.append("image", initialData.image);  // 'image' is the File object


    }
    if (image2) {
      formData.append("image2", image2);  // 'image' is the File object
    }
    else{
      formData.append("image2", initialData.image2);  // 'image' is the File object


    }
  
    try {
      if(initialData.id){
        formData.append("id", initialData.id);

        const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}update-service/`, {
          method: "POST",
          headers: {
  
            'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
          },
          body: formData,  // Send the FormData as the request body
        });
        const data = await response.json();
        console.log(data.status)
            if (data.status==='success') {
              toast.success("Added successgully")

              router.push('/admin/services')
      

            } else {
      
              // Handle failure
            }
      }
      else{
        const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}add-service/`, {
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


  const [metadata, setMetadata] = useState({
    meta_title: "",
    meta_description: "",
    meta_keywords: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  // Fetch metadata on component mount
  useEffect(() => {
    if (language) {
    fetchMetadata();
    }
  }, [language]); // Runs whenever `language` changes
  
 // Ensure both are set before making the fetch request
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}service-metadata/`);
        if (response.ok) {
          const data = await response.json();
          setMetadata(data);
          setKeywords(data.meta_keywords.split(","));
        } else {
          setMessage("No metadata found");
        }
      } catch (error) {
        setMessage("Failed to fetch metadata");
      } finally {
        setLoading(false);
      }
    };
 

  // Handle form submission
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      ...metadata,
      meta_keywords:keywords.join(",") // Convert array to string
    });
    // {..metadata,keywords.join(",")}
    // metadata.append("meta_keywords", keywords.join(","));
    try {
      setLoading(true);
      const response =  await fetch(`${language==='en'?process.env.NEXT_PUBLIC_DJANGO_URLS:language==='es'?process.env.NEXT_PUBLIC_DJANGO_URLS_ES:language==='fr'?process.env.NEXT_PUBLIC_DJANGO_URLS_FR:''}post-metadata/`, {
        method: "POST",
        headers: {
          'x-super-admin': JSON.stringify(superAdmin),  // Send super admin info in headers
        },
        
        body: data,
      });
      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
      } else {
        setMessage("Failed to update metadata");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetadata({ ...metadata, [name]: value });
  };

  

  return (
    <>
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
                   <div>
        <label htmlFor="image2" className="block">Ground Image</label>
        <input
          id="image2"
          type="file"
          accept="image/*"
          onChange={handleImageChange2}
          className="w-full p-2 border rounded"
        />
      </div>
      {!image2 && initialData.image2 ? (
                  <img
                    src={serverurl+initialData.image2.replace("/media/media",'media/')}
                    // alt={service.title}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                ) : (
                  <span className="text-gray-500"></span>
                )}
     
     </div>
     

      <button type="submit"               className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >Save</button>
    </form>

                {/* End Service Area */}
                <div className="max-w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Manage Service Metadata(Dont add for everyservice its for main service page)
        </h3>
        {message && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
            {message}
          </div>
        )}

        
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit2}>
            <div className="mb-4">
              <label
                htmlFor="meta_title"
                className="block text-gray-700 font-medium mb-1"
              >
                Meta Title
              </label>
              <input
                type="text"
                id="meta_title"
                name="meta_title"
                value={metadata.meta_title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="Enter meta title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="meta_description"
                className="block text-gray-700 font-medium mb-1"
              >
                Meta Description
              </label>
              <textarea
                id="meta_description"
                name="meta_description"
                value={metadata.meta_description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="Enter meta description"
              ></textarea>
            </div>
        
            <div className=" flex flex-col border border-gray-300 rounded-xl p-3 bg-white shadow-lg max-h-40 overflow-y-auto transition-shadow duration-200 ease-in-out hover:shadow-xl">
            <label className="block text-sm font-medium text-gray-700">
              Keywords
            </label>

            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm transition-transform transform hover:scale-105"
                >
                  {keyword}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150"
                    onClick={() => removeKeyword(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyPress}
              placeholder="Add a keyword and press Enter"
              className="w-full mt-2 p-1 outline-none border-t border-gray-200 bg-transparent placeholder-gray-400 text-gray-700"
            />
          </div>
         
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Save Metadata
            </button>
          </form>
        )}
      </div>
    </div>
    <ToastContainer 
position="top-right" 
autoClose={5000} 
hideProgressBar={false} 
newestOnTop={true} 
closeOnClick 
rtl={false} 
pauseOnFocusLoss 
draggable 
pauseOnHover 
/>      </>


  );
};

export default ServiceForm;