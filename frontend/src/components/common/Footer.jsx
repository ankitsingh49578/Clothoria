import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-12 dark-theme">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:pl-14">
        <div>
          <h3 className="text-lg text-gray-800 dark:text-gray-300 mb-4">
            Newsletter
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-semibold text-sm text-gray-600 dark:text-gray-500 mb-6">
            Sign up and get 10% OFF on your first order.
          </p>

          {/* newsletter form */}
          <form action="" className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-950 transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="text-lg text-gray-800 dark:text-gray-300 mb-4">
            Shop
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h3 className="text-lg text-gray-800 dark:text-gray-300 mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 transition-colors"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 dark:text-gray-300 mb-4">
            Follow Us
          </h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
            >
              <RiTwitterXLine className="h-4 w-5" />
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Call Us</p>
          <p className="text-gray-500 dark:text-gray-400">
            <FiPhoneCall className="inline-block mr-2" />
            0123-456-789
          </p>
        </div>
      </div>
      {/* Fotter bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 dark:border-gray-600 pt-6">
        <p className="text-gray-500 text-sm tracking-tight text-center">
          &copy; 2025, Made By Ankit Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
