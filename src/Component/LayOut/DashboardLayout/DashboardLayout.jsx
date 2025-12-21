import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

import UseRole from "../../Hooks/UseRole/UseRole";
import UseAuth from "../../Page/Auth/UseAuth/UseAuth";


const DashboardLayout = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = UseRole(); 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* TOP NAVBAR */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-full px-6 py-3 flex justify-between items-center">

          {/* Logo → Home */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Club<span className="text-gray-900">Sphere</span>
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <HiX /> : <HiMenu />}
          </button>

          {/* User Info */}
          <div className="hidden sm:flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-9 h-9 rounded-full border"
            />
            <span className="text-sm font-medium text-gray-700">
              {user?.displayName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside
          className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-md transform transition-transform duration-300 md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 text-lg font-semibold text-gray-800 border-b">
            Dashboard Menu
          </div>

          <nav className="flex flex-col gap-2 px-4 mt-4">

            {/* ADMIN MENU */}
            {role === "admin" && (
              <>
                <NavLink to="/dashboard/admin" className={navClass}>
                  Admin Overview
                </NavLink>
                <NavLink to="/dashboard/admin/users" className={navClass}>
                  Manage Users
                </NavLink>
                <NavLink to="/dashboard/admin/clubs" className={navClass}>
                  Manage Clubs
                </NavLink>
              </>
            )}

            {/* CLUB MANAGER MENU */}
            {role === "manager" && (
              <>
                <NavLink to="/dashboard/manager" className={navClass}>
                  Manager Overview
                </NavLink>
                <NavLink to="/dashboard/manager/my-clubs" className={navClass}>
                  My Clubs
                </NavLink>
                <NavLink to="/dashboard/manager/create-club" className={navClass}>
                  Create Club
                </NavLink>
                <NavLink to="/dashboard/manager/createEvents" className={navClass}>
                  Create Event
                </NavLink>
                <NavLink to="/dashboard/manager/events" className={navClass}>
                  Events
                </NavLink>
              </>
            )}

            {/* MEMBER MENU */}
            {role === "member" && (
              <>
                <NavLink to="/dashboard/member" className={navClass}>
                  Member Overview
                </NavLink>
                <NavLink to="/dashboard/member/my-clubs" className={navClass}>
                  My Clubs
                </NavLink>
                <NavLink to="/dashboard/member/events" className={navClass}>
                  My Events
                </NavLink>
              </>
            )}

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? "ml-64 md:ml-64" : "ml-0 md:ml-64"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
