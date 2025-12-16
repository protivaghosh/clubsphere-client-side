import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* ---- Brand Section ---- */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            Club<span className="text-blue-500">Sphere</span>
          </h2>
          <p className="mt-3 text-gray-400">
            Discover, Join & Manage Local Clubs Effortlessly.
            Your community, your passion — all in one place.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-500"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-500"><FaLinkedin /></a>
          </div>
        </div>

        {/* ---- Quick Links ---- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/clubs" className="hover:text-blue-400">Clubs</Link></li>
            <li><Link to="/events" className="hover:text-blue-400">Events</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
          </ul>
        </div>

        {/* ---- Support ---- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-blue-400" href="#">Help Center</a></li>
            <li><a className="hover:text-blue-400" href="#">Community Rules</a></li>
            <li><a className="hover:text-blue-400" href="#">Report a Problem</a></li>
            <li><a className="hover:text-blue-400" href="#">Terms & Policy</a></li>
          </ul>
        </div>

        {/* ---- Contact ---- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p>Email: <span className="text-blue-400">support@clubsphere.com</span></p>
          <p className="mt-2">Phone: <span className="text-blue-400">+880 1234 567890</span></p>
          <p className="mt-2">Address: Dhaka, Bangladesh</p>
        </div>

      </div>

      {/* ---- Bottom ---- */}
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ClubSphere — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
