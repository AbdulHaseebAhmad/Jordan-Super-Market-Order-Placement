import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import logo from "../assets/1234.png"



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="w-full md:w-auto mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-xl mb-2">أوقات العمل</h3>
            <p>9:00 AM - 9:00 PM</p>
          </div>
          <div className="w-full md:w-auto mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <h3 className="text-xl">Location</h3>
            </div>
            <p>1234 Market St, City, Country</p>
          </div>
          <div className="w-full md:w-auto mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              <h3 className="text-xl">Phone</h3>
            </div>
            <p>+123-456-7890</p>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <img src={logo} alt='logo' className='w-[220px]'/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
