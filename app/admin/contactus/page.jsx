"use client";
import Layout from "@/app/components/Layout";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const AddContactus = () => {
  const [title, setTitle] = useState("");
  
  const [textField, setTextField] = useState("");

  const [textField2, setTextField2] = useState("");
  const [textField3, setTextField3] = useState("");

  const params = useParams();
  const router = useRouter();
  const serverurl = process.env.NEXT_PUBLIC_DJANGO_URL;
  const [service, setServices] = useState();
    const [superAdmin, setSuperAdmin] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const formData = new FormData();

      try {
        const response = await fetch(`${serverurl}get-contactus/`);
        const data = await response.json();
        if (response.ok) {
         

          setTextField(data.detail);
          setTextField2(data.detail2);
          setTextField3(data.detail3);

        
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

    const formData = new FormData();

    formData.append("detail", textField);
    formData.append("detail2", textField2);
    formData.append("detail3", textField3);

    

    try {
     
        const response = await fetch(`${serverurl}add-contactus/`, {
          method: "POST",
          headers: {
            "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
          },
          body: formData,
        });

        if (response.ok) {
          router.push("/admin/contactus");
        }
      
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
         
         
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Field :
            </label>
            <Editor
              apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE
              value={textField}
              onEditorChange={(newText) => setTextField(newText)}
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
                  'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',image_title: true,
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Field 2:
            </label>
            <Editor
              apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE
              value={textField2}
              onEditorChange={(newText) => setTextField2(newText)}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Field 3:
            </label>
            <Editor
              apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE
              value={textField3}
              onEditorChange={(newText) => setTextField3(newText)}
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

export default AddContactus;
