import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/clubs"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }`
        }
      >
        Clubs
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }`
        }
      >
        Events
      </NavLink>
    </>
  );

  return (
    <div className="shadow-md py-4 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo / Project Name */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Club<span className="text-gray-900">Sphere</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-5">{navLinks}</div>

        {/* Login Button (Desktop) */}
        <div className="hidden md:block">
          <Link to='/login' className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            <FaSignInAlt />
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-4 p-4">
            {navLinks}
            <hr className="border-gray-200" />
            <li>
              <Link to='/login' className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition w-full justify-center">
                <FaSignInAlt />
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
