import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import errorLottie from "../../../../assets/json/404 Animation.json";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      
      {/* Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <Lottie animationData={errorLottie} loop />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-6"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/">
          <button className="btn btn-primary px-8">
            ⬅ Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
