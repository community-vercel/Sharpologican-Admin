"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ImageUploadForm = () => {
  const [contactImage, setContactImage] = useState(null);
  const router = useRouter();
  const [clientImages, setClientImages] = useState([]);

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
  const [newsData, setnewsData] = useState();
  const serverurl = process.env.NEXT_PUBLIC_DJANGO_URL;
  const [title, setTitle] = useState("");
  const [heading, setheading] = useState("");
  const [heading3, setheading3] = useState("");

  useEffect(() => {
    const fetchnewsData = async () => {
      try {
        const response = await fetch(`${serverurl}contact/`);
        const data = await response.json();
        setContactImage(serverurl + data.data.contact_image);
        setTitle(data.data.title)
        setheading(data.data.heading)
        setheading3(data.data.heading3)

        const response3 = await fetch(`${serverurl}clients/`);
        const data3 = await response3.json();
        setClientImages(data3.data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };

    fetchnewsData();
  }, []);

  // Handle image change for Client Image

  // Handle image change for Contact Image
  const handleContactImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContactImage(file);
    }
  };
  const handleDeleteImage = async (image, index) => {

    console.log(image)
    try {
      console.log("t",typeof image)
      // Send API request to delete the image from the server
      if (typeof image === "string" || typeof image==='object') {
        console.log(image.client_id)

        const clientId = image.client_id;
        const response = await fetch(`${serverurl}/delete-image/${clientId}/`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete image.");
        }
      } else if (image instanceof File) {
        console.log("image.client_id  ")

        // If image is a File (local), you may not need an API request, just remove it from client
      }
  
      // Remove image from the state (client side)
      const updatedImages = clientImages.filter((_, imgIndex) => imgIndex !== index);
      setClientImages(updatedImages);  // Update the state after deletion
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  // Handle image change for multiple Client Images
  const handleClientImagesChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setClientImages(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contactimage", contactImage); // Appending the image file
    formData.append("title", title); // Appending the image file
    formData.append("heading", heading); // Appending the image file
    formData.append("heading3", heading3); // Appending the image file

    if (contactImage) {
      formData.append("contactimage", contactImage); // Appending the image file
    }
    if (clientImages && clientImages.length > 0) {
      // Assuming clientImages is an array of files
      clientImages.forEach((image) => {
        formData.append("clientimage", image); // Append each image to the formData
      });
    }

    // Handle form submission logic here, e.g., API request

    // Send the data to the backend API for saving
    const response = await fetch(`${serverurl}add-contact/`, {
      method: "POST",
      headers: {
        "x-super-admin": JSON.stringify(superAdmin), // Send super admin info in headers
      },
      body: formData, // Send the FormData as the request body
    });

    if (response.ok) {
      toast.success("Data saved successfully!");
      router.push("/  ");
    } else {
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Image Section */}
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
         <div>
            <label className="block text-sm font-medium text-gray-700">
              Heading:
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setheading(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">
              Heading2:
            </label>
            <input
              type="text"
              value={heading3}
              onChange={(e) => setheading3(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
         </div>
      <div>
        <label htmlFor="contactImage" className="block text-xl font-semibold">
          Contact Image
        </label>
        <input
          id="contactImage"
          type="file"
          accept="image/*"
          onChange={handleContactImageChange}
          className="w-full p-2 border rounded"
        />
        {contactImage && (
          <div className="mt-4">
            <h5 className="text-lg">Preview:</h5>
            <img
              src={
                typeof contactImage === "string" &&
                contactImage.includes(serverurl)
                  ? contactImage
                  : URL.createObjectURL(contactImage)
              }
              alt="Contact Image Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          </div>
        )}
      </div>

      {/* Client Image Section */}
      <div>
        <label htmlFor="clientImages" className="block text-xl font-semibold">
          Client Images
        </label>
        <input
          id="clientImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleClientImagesChange}
          className="w-full p-2 border rounded"
        />
 

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Submit
      </button>
    </form>
     {clientImages && (
      <div className="mt-4">
        <h5 className="text-lg">Previews:</h5>
        <div className="flex flex-wrap gap-4 mt-2">
          {clientImages?.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={
                  typeof image.image === "string" && image.image.includes("media")
                    ? serverurl + image.image.replace("/media/", "media/")
                    : image instanceof File
                    ? URL.createObjectURL(image)
                    : null
                }
                alt={`Client Image Preview ${index + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
              
              {/* Cross Icon */}
              <button
                className="absolute top-0 right-0 text-red-500 bg-white p-1 rounded-full"
                onClick={() => handleDeleteImage(image, index)}
              >
                &times;
              </button>
            </div>
          ))}
          
        </div>
      </div>
    )}

</>
  );
};

export default ImageUploadForm;
