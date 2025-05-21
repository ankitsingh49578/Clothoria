import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-primaryRed text-white dark:bg-gray-300 dark:text-black">
      <div className="flex justify-between p-3 items-center container mx-auto">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:scale-115 transition-all">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:scale-115 transition-all">
            <IoLogoInstagram className="h-4 w-4" />
          </a>
          <a href="#" className="hover:scale-115 transition-all">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center m-auto">
          <span>We ship world wide - Fast and reliable shipping !</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890" className="hover:text-gray-300">
            +(91) 0123456789
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
