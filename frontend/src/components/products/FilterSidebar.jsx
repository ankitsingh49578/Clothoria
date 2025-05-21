import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // x.come/?a=1&b=2
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashioninsta",
    "ChicStyle",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    // {category: "top wear", maxPrice: 100} => params.category

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
    // console.log(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    // {category: "Top wear", Size: ["XS", "S"]}
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`); // ?category=Bottom+Wear&size=XS%2CS
  };

  const handlePriceChange = (e) =>{
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = {...filters, minPrice: 0, maxPrice: newPrice};
    setFilters(filters);
    updateURLParams(newFilters);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Filter</h2>

      {/* category filter */}
      <div className="mb-6">
        <label htmlFor="" className="bock text-gray-600 dark:text-white font-medium mb-2">
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              onChange={handleFilterChange}
              value={category}
              checked={filters.category === category || false}
              // checked={filters.category?.includes(category) || false}
              type="radio"
              name="category"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 dark:text-gray-400">{category}</span>
          </div>
        ))}
      </div>

      {/* gender filter */}
      <div className="mb-6">
        <label htmlFor="" className="bock text-gray-600 dark:text-white font-medium mb-2">
          Gender
        </label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              onChange={handleFilterChange}
              value={gender}
              checked={filters.gender === gender || false}
              // checked={filters.category?.includes(gender) || false}
              type="radio"
              name="gender"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 dark:text-gray-400">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 dark:text-white font-medium mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              onClick={handleFilterChange}
              value={color}
              key={color}
              name="color"
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Material filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 dark:text-white font-medium mb-2">
          Material
        </label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              onChange={handleFilterChange}
              value={material}
              // checked={filters.material === material || false}
              checked={filters.material?.includes(material) || false}
              type="checkbox"
              name="material"
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 dark:text-gray-400">{material}</span>
          </div>
        ))}
      </div>

      {/* size filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 dark:text-white font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              onChange={handleFilterChange}
              value={size}
              checked={filters.size?.includes(size) || false}
              type="checkbox"
              name="size"
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 dark:text-gray-400">{size}</span>
          </div>
        ))}
      </div>

      {/* brand filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 dark:text-white font-medium mb-2">
          Brand
        </label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              onChange={handleFilterChange}
              value={brand}
              checked={filters.brand.includes(brand)}
              type="checkbox"
              name="brand"
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 dark:text-gray-400">{brand}</span>
          </div>
        ))}
      </div>

      {/* price range filter */}
      <div className="mb-8">
        <label htmlFor="" className="block text-gray-600 dark:text-white font-medium mb-2">
          Price Range
        </label>
        <input
          onChange={handlePriceChange}
          value={priceRange[1]}
          type="range"
          name="priceRange"
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 dark:text-gray-400 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
