import React from "react";
import Lottie from "lottie-react";
import loginLottie from "../../../../assets/json/login.json";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../UseAuth/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signInUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log("Logged in user:", user);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden w-11/12 max-w-5xl">
        
        {/* 🔹 Left Side - Lottie */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <Lottie animationData={loginLottie} loop className="w-full h-full" />
        </div>

        {/* 🔹 Right Side - Login Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Login to <span className="text-primary">ClubSphere</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          {/* Google Login (future) */}
          <SocialLogin></SocialLogin>
          

          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
