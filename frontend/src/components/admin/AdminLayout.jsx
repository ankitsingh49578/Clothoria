import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* mobile toggle button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer"
        >
          <FaBars size={24} />
        </button>
        <h2 className="ml-4 text-xl font-medium">Admin Dashboard</h2>
      </div>

      {/* overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
        ></div>
      )}
      {/* sidebar */}
      <div
        className={`bg-gray-900 w-64 min-h-full text-white absolute md:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        {/* sidebar component */}
        <AdminSidebar />
      </div>

{/* Main content */}
      <div className="grow-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
