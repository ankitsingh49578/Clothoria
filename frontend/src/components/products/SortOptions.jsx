import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSortChange = (e) =>{
        const sortBy = e.target.value;
        searchParams.set("sortBy", sortBy);
        setSearchParams(searchParams);
    }
  return (
    <div className='mb-4 flex items-center justify-end'>
        <select onChange={handleSortChange} value={searchParams.get("sortBy") || ""} id="sort" className='border p-2 rounded-md focus:outline-none'>
            <option value="" className='dark:bg-gray-800'>Default</option>
            <option value="priceAsc" className='dark:bg-gray-800'>Price: Low to High</option>
            <option value="priceDesc" className='dark:bg-gray-800'>Price: High to Low</option>
            <option value="popularity" className='dark:bg-gray-800'>Popularity</option>
        </select>
    </div>
  )
}

export default SortOptions