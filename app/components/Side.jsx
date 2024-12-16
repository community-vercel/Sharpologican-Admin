import Link from "next/link";
import { FaTachometerAlt, FaUsers, FaChartBar, FaCog, FaFileContract, FaNewspaper, FaTag, FaTeamspeak, FaPortrait, FaAddressBook, FaServicestack, FaQuoteLeft, FaSortNumericUp, FaCommentMedical } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link href="/" className="flex items-center">
            
              <FaTachometerAlt className="mr-3" />
              Dashboard
            
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/services" className="flex items-center">
              <FaServicestack
               className="mr-3" />
         Services
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/aboutus" className="flex items-center">
              <FaAddressBook className="mr-3" />
      About Us
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/portfolio" className="flex items-center">
              <FaPortrait className="mr-3" />
       Portfolio
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/team" className="flex items-center">
              <FaTeamspeak className="mr-3" />
  Team
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/test" className="flex items-center">
              <FaTag className="mr-3" />
  Testomonial 
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/news" className="flex items-center">
              <FaNewspaper className="mr-3" />
News
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/contact" className="flex items-center">
              <FaFileContract className="mr-3" />
Contact & Client
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/quote" className="flex items-center">
              <FaQuoteLeft className="mr-3" />
Quotes
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/count" className="flex items-center">
              <FaSortNumericUp className="mr-3" />
Counts
          
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/contactus" className="flex items-center">
              <FaCommentMedical className="mr-3" />
Contact Us
          
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;