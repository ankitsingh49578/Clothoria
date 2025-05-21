import React from "react";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Womens collections */}
        <div className="relative grow">
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white dark:bg-gray-800 opacity-90 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Women's Colletions
            </h2>
            <Link to="/collections/all?gender=Women" className="text-gray-900 dark:text-white underline">
                Shop Now
            </Link>
          </div>
        </div>
        
        {/* Mens collections */}
        <div className="relative grow">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white dark:bg-gray-800 opacity-90 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Men's Colletions
            </h2>
            <Link to="/collections/all?gender=Men" className="text-gray-900 dark:text-white underline">
                Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
