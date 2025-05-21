import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useDarkMode } from "../../context/ThemeContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dark-theme">
      <nav className="container flex mx-auto items-center justify-between py-4 px-6 ">
        {/* left logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Logo
          </Link>
        </div>

        {/* center navigation links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-gray-400 text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-gray-400 text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-gray-400 text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-gray-400 text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        {/* right icons */}
        <div className="flex items-center space-x-4">
          {/* Profile dropdown */}
          <div className="relative ml-3" ref={dropdownRef}>
            <div>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="relative flex rounded-full text-sm focus:ring-0 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-400 cursor-pointer"
              >
                <HiOutlineUser className="h-7 w-7" />
              </button>
            </div>
            <div
              className={`${
                userMenuOpen ? "block" : "hidden"
              } absolute md:-right-0 -right-33 z-10 mt-2 md:w-48 w-40 rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden`}
            >
              {/* user profile */}
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                Profile
              </Link>

              {/* admin link */}
              {user && user.role === "admin" && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  Admin
                </Link>
              )}

              {/* darkMode button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white cursor-pointer"
              >
                {darkMode ? "Light" : "Dark"}
              </button>
            </div>
          </div>

          {/* cart icon */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="relative hover:text-black cursor-pointer"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-primaryRed text-white text-xs rounded-full px-1.5 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* responsive bar */}
          <button
            onClick={() => setNavDrawerOpen(!navDrawerOpen)}
            className="md:hidden cursor-pointer"
          >
            <HiBars3BottomRight />
          </button>
        </div>
      </nav>

      {/* cart drawer */}
      <CartDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      {/* mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:hidden h-full bg-white dark-theme shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setNavDrawerOpen(!navDrawerOpen)}
            className="cursor-pointer"
          >
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl py-1.5 px-2 font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={() => setNavDrawerOpen(!navDrawerOpen)}
              className="block py-1.5 px-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={() => setNavDrawerOpen(!navDrawerOpen)}
              className="block py-1.5 px-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={() => setNavDrawerOpen(!navDrawerOpen)}
              className="block py-1.5 px-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={() => setNavDrawerOpen(!navDrawerOpen)}
              className="block py-1.5 px-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
