import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-[10rem]">
      <div className="container mx-auto flex flex-wrap justify-between">
        <span id='MainText' className="text-white text-[100px] m-3">BEATS <br /> STORE</span>
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0 m-4">
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <ul className="flex space-x-4">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
        
      </div>
      <div className="mt-10 text-center">
        <p>&copy; {new Date().getFullYear()} Store Beats. All rights reserved.</p>
        <h1>Create By: Pathan AzeemKhan</h1>
      </div>
    </footer>
  );
};

export default Footer;
