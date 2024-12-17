
'use client'
import Layout from '@/app/components/Layout';
import { useState, useEffect } from 'react';


const ProfessionalPage = () => {
  const [keywords, setKeywords] = useState();
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords3, setKeyword3] = useState([]);
  const [keywordInput3, setKeywordInput3] = useState("");
  
  const [keywords7, setKeyword7] = useState([]);
  const [keywordInput7, setKeywordInput7] = useState("");
 
  const [homeDetail, setHomeDetail] = useState({
    metaname: "",
    metadescription: "",
    keywords: '',
    metanamecontact: "",
    metadescriptioncontact: "",
    keywordscontact:'',
    metanamequote: "",
    metadescriptionquote: "",
    keywordsquote:'',
    heading: "",
    detail: "",
    footeremail: "",
    footeremail2: "",
  });
  
  const serverurls=process.env.NEXT_PUBLIC_DJANGO_URLS;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHomeDetail({
      ...homeDetail,
      [name]: value,
    });
  };
  useEffect(() => {
    // Fetch existing home details on page load
    const fetchHomeDetail = async () => {
      try {
        const response = await fetch(`${serverurls}get-home-detail/`);
        const data=await response.json()
        setHomeDetail(data);
        setKeywords(data?.keywords.split(','));
        setKeyword3(data?.keywordscontact.split(','));

        setKeyword7(data?.keywordsquote.split(','));

      } catch (error) {
        console.error('Error fetching home details', error);
      }
    };

    fetchHomeDetail();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedHomeDetail = {
      ...homeDetail,
      keywords: keywords.join(","),
      keywordscontact: keywords3.join(","),
      keywordsquote: keywords7.join(","),
    };

    try {
      const response = await fetch(`${serverurls}add-home-detail/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedHomeDetail),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Error: " + error.message);
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
  const handleKeywordKeyPress3 = (e) => {
    if (e.key === "Enter" && keywordInput3.trim()) {
      e.preventDefault();
      if (!keywords3.includes(keywordInput3.trim())) {
        setKeyword3([...keywords3, keywordInput3.trim()]);
      }
      setKeywordInput3("");
    }
  };

  const removeKeyword3 = (index) => {
    setKeyword3(keywords.filter((_, i) => i !== index));
  };
  
  const handleKeywordKeyPress7 = (e) => {
    if (e.key === "Enter" && keywordInput7.trim()) {
      e.preventDefault();
      if (!keywords7.includes(keywordInput7.trim())) {
        setKeyword7([...keywords7, keywordInput7.trim()]);
      }
      setKeywordInput7("");
    }
  };

  const removeKeyword7 = (index) => {
    setKeyword7(keywords7.filter((_, i) => i !== index));
    
  };

  return (
    <Layout>
    <div className="quote-form-container mt-8 max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Home Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Meta Name */}
          <div className="form-group">
            <label htmlFor="metaname">Meta Name</label>
            <input
              type="text"
              id="metaname"
              name="metaname"
              value={homeDetail?.metaname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Meta Description */}
          <div className="form-group">
            <label htmlFor="metadescription">Meta Description</label>
            <input
              type="text"
              id="metadescription"
              name="metadescription"
              value={homeDetail?.metadescription}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Keywords */}
         <div className=" flex flex-col border border-gray-300 rounded-xl p-3 bg-white shadow-lg max-h-40 overflow-y-auto transition-shadow duration-200 ease-in-out hover:shadow-xl">
            <label className="block text-sm font-medium text-gray-700">
              Keywords
            </label>

            <div className="flex flex-wrap gap-2">
              {keywords?.map((keyword, index) => (
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

          {/* Meta Name Contact */}
          <div className="form-group">
            <label htmlFor="metanamecontact">Meta Name Contact</label>
            <input
              type="text"
              id="metanamecontact"
              name="metanamecontact"
              value={homeDetail?.metanamecontact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Meta Description Contact */}
          <div className="form-group">
            <label htmlFor="metadescriptioncontact">Meta Description Contact</label>
            <input
              type="text"
              id="metadescriptioncontact"
              name="metadescriptioncontact"
              value={homeDetail?.metadescriptioncontact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Keywords Contact */}
          <div className=" flex flex-col border border-gray-300 rounded-xl p-3 bg-white shadow-lg max-h-40 overflow-y-auto transition-shadow duration-200 ease-in-out hover:shadow-xl">
            <label className="block text-sm font-medium text-gray-700">
              Contact Keywords
            </label>

            <div className="flex flex-wrap gap-2">
              {keywords3?.map((keyword, index) => (
                <span
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm transition-transform transform hover:scale-105"
                >
                  {keyword}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150"
                    onClick={() => removeKeyword3(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={keywordInput3}
              onChange={(e) => setKeywordInput3(e.target.value)}
              onKeyDown={handleKeywordKeyPress3}
              placeholder="Add a keyword and press Enter"
              className="w-full mt-2 p-1 outline-none border-t border-gray-200 bg-transparent placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Meta Name Quote */}
          <div className="form-group">
            <label htmlFor="metanamequote">Meta Name Quote</label>
            <input
              type="text"
              id="metanamequote"
              name="metanamequote"
              value={homeDetail?.metanamequote}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Meta Description Quote */}
          <div className="form-group">
            <label htmlFor="metadescriptionquote">Meta Description Quote</label>
            <input
              type="text"
              id="metadescriptionquote"
              name="metadescriptionquote"
              value={homeDetail?.metadescriptionquote}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Keywords Quote */}
          <div className=" flex flex-col border border-gray-300 rounded-xl p-3 bg-white shadow-lg max-h-40 overflow-y-auto transition-shadow duration-200 ease-in-out hover:shadow-xl">
            <label className="block text-sm font-medium text-gray-700">
             Quote Keywords
            </label>

            <div className="flex flex-wrap gap-2">
              {keywords7?.map((keyword, index) => (
                <span
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm transition-transform transform hover:scale-105"
                >
                  {keyword}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150"
                    onClick={() => removeKeyword7(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={keywordInput7}
              onChange={(e) => setKeywordInput7(e.target.value)}
              onKeyDown={handleKeywordKeyPress7}
              placeholder="Add quote keyword and press Enter"
              className="w-full mt-2 p-1 outline-none border-t border-gray-200 bg-transparent placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Heading */}
          <div className="form-group">
            <label htmlFor="heading">Heading</label>
            <textarea
              id="heading"
              name="heading"
              value={homeDetail?.heading}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          {/* Detail */}
          <div className="form-group">
            <label htmlFor="detail">Detail</label>
            <textarea
              id="detail"
              name="detail"
              value={homeDetail?.detail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          {/* Footer Email */}
          <div className="form-group">
            <label htmlFor="footeremail">Footer Email</label>
            <input
              type="email"
              id="footeremail"
              name="footeremail"
              value={homeDetail?.footeremail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Footer Email 2 */}
          <div className="form-group">
            <label htmlFor="footeremail2">Footer Email 2</label>
            <input
              type="email"
              id="footeremail2"
              name="footeremail2"
              value={homeDetail?.footeremail2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default ProfessionalPage;