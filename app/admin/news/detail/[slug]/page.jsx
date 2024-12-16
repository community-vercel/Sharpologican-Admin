"use client";
import Layout from "@/app/components/Layout";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const AddportfolioDetails = () => {
  const [title, setTitle] = useState("");
  
  const [textField1, setTextField1] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");

  const [metaDescription, setMetaDescription] = useState("");

  const params = useParams();
  const router = useRouter();
  const serverurl = process.env.NEXT_PUBLIC_DJANGO_URL;
  const [service, setServices] = useState();
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
  useEffect(() => {
    const getDetails = async () => {
      const formData = new FormData();
      formData.append("slug", params.slug);

      try {
        const response = await fetch(`${serverurl}get-newsdetails/`, {
          method: "POST",

          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          setServices(data);
          setTitle(params.slug);
         

          setTextField1(data.detail);
          setMetaTitle(data.metaname);
          setKeywords(data.keywords.split(","))
          setMetaDescription(data.metades)
    
        
        }
      } catch (error) {
        console.error("Error adding service:", error);
      }
    };
    if (typeof window !== 'undefined') {
      // Now it's safe to use localStorage in the browser
      const superAdminData = localStorage.getItem("superAdmin");
      if (superAdminData) {
        setSuperAdmin(JSON.parse(superAdminData));
      }
    }
    getDetails();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const keywordsString = keywords.join(",");

    const formData = new FormData();
    formData.append("slug", params.slug);

    formData.append("metaname", metaTitle);

    formData.append("metades", metaDescription);
    formData.append("keywords", keywordsString);
    formData.append("detail", textField1);


    try {
      if (service && service) {
        formData.append("id", service.id);

        const response = await fetch(`${serverurl}update-newsdetails/`, {
          method: "POST",
          headers: {
            "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
          },
          body: formData,
        });

        if (response.ok) {
          router.push("/admin/news");
        }
      } else {
        const response = await fetch(`${serverurl}add-newsdetails/`, {
          method: "POST",
          headers: {
            "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
          },
          body: formData,
        });

        if (response.ok) {
          router.push("/admin/news");
        }
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };
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
  

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add News Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
         </div>
         <div >
            <label className="block text-sm font-medium text-gray-700">
              Meta Title
            </label>
            <input
              type="text"
              name="metatitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)} // Update metaTitle state
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div >
            <label className="block text-sm font-medium text-gray-700">
              Meta Description
            </label>
            <input
              type="text"
              name="metades"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)} // Update metaDescription state
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:outline-none"
            />
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
         
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Field 1:
            </label>
            <Editor
              apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE
              value={textField1}
              onEditorChange={(newText) => setTextField1(newText)}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'a11ychecker','advlist','advcode','advtable','autolink','checklist','markdown',
                  'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                  'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
               ],
               toolbar: 'undo redo | casechange blocks | bold italic backcolor image | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                  image_title: true,
                automatic_uploads: true, // Enable automatic image uploads
                file_picker_types: "image",
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype === "image") {
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");
                    input.click();

                    input.onchange = function () {
                      const file = input.files[0];
                      const reader = new FileReader();
                      reader.onload = function () {
                        const base64 = reader.result;
                        callback(base64, { alt: file.name });
                      };
                      reader.readAsDataURL(file); // Convert image to base64
                    };
                  }
                },
              }}
            />
          </div>
       

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {service && service ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddportfolioDetails;
