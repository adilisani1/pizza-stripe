import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">

        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">PizzaApp</h1>
          <p className="text-sm">Delivering deliciousness to your doorstep!</p>
        </div>

        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 text-center">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-orange-500">
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} PizzaApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
