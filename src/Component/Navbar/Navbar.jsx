import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import UseAuth from "../Page/Auth/UseAuth/UseAuth";

const Navbar = () => {
  const { user, logOut} = UseAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  
  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-500"
    }`;

  const handleLogout = () => {
    logOut().catch(console.log);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Club<span className="text-gray-900">Sphere</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/clubs" className={navClass}>Clubs</NavLink>
          <NavLink to="/events" className={navClass}>Events</NavLink>

          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaSignInAlt /> Login
            </Link>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full border cursor-pointer"
              />

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to='/dashboard'
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 space-y-3">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/clubs" className={navClass}>Clubs</NavLink>
          <NavLink to="/events" className={navClass}>Events</NavLink>

          {user && (
            <Link
              to='/dashboard'
              className="block text-center px-4 py-2 bg-gray-100 rounded-md"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <FaSignInAlt /> Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex justify-center items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg w-full"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
