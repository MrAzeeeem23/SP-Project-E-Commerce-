import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-[10rem]">
      <div className="container mx-auto flex flex-wrap justify-between">
        <span id='MainText' className="text-white text-[100px] m-3 hover:text-red-600 hover:rotate-90 transition">
          <Link to='/'>
          <span className=''>BEATS <br /> STORE</span>
          </Link>
          </span>
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0 m-4">
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <ul className="flex space-x-4">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
            <li><a href="https://www.X.com" target="_blank" rel="noopener noreferrer" className="hover:underline">X</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0 m-4">
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="flex space-x-4">
          <Link to="/contact" className="block hover:underline">
            Contact
          </Link>
          </ul>
        </div>
      </div>
      <hr />
      <div className="mt-10 text-center">
        <p>&copy; {new Date().getFullYear()} Store Beats. All rights reserved.</p>
        <h1>Created By: Pathan AzeemKhan</h1> <br />
        <Link to={'https://github.com/MrAzeeeem23'}><span className='hover:text-red-600 transition'>GitHub</span></Link>
      </div>
    </footer>
  );
};

export default Footer;
