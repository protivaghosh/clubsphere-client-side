import React from "react";
import Lottie from "lottie-react";
import registerLottie from "../../../../assets/json/register.json";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UseAuth from "../UseAuth/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const {registerUser} = UseAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then(result => {
          const loggedUser = result.user;
          console.log("User Registered:", loggedUser);
          // Optional: Save user info to MongoDB with default role 'member'
      })
      .catch(error => {
          console.error(error.message);
          // Show user-friendly error via toast/sweetalert
      });
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden w-11/12 max-w-5xl">
        
        {/* 🔹 Left Side - Lottie Animation */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <Lottie animationData={registerLottie} loop={true} className="w-full h-full" />
        </div>

        {/* 🔹 Right Side - Registration Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create your account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    message: "Password must contain at least one uppercase and one lowercase letter",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
              <input
                type="text"
                {...register("photoURL", { required: "Photo URL is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your photo URL"
              />
              {errors.photoURL && <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          {/* 🔹 Divider */}
          <div className="divider">OR</div>

          {/* 🔹 Social Login (Google) */}
          <SocialLogin></SocialLogin>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
