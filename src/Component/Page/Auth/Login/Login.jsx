import React from "react";
import Lottie from "lottie-react";
import loginLottie from "../../../../assets/json/login.json";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // এখানে Firebase Login logic implement করবে
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden w-11/12 max-w-5xl">
        
        {/* 🔹 Left Side - Lottie Animation */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <Lottie animationData={loginLottie} loop={true} className="w-full h-full" />
        </div>

        {/* 🔹 Right Side - Login Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Login to ClubSphere</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                })}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* 🔹 Divider */}
          <div className="divider">OR</div>

          {/* 🔹 Social Login (Google) */}
          <button className="btn btn-outline w-full">Continue with Google</button>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
