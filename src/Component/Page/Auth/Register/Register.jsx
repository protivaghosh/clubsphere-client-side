import React from "react";
import Lottie from "lottie-react";
import registerLottie from "../../../../assets/json/register.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../UseAuth/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Firebase Email/Password Registration
      await registerUser(data.email, data.password);

      // 2️⃣ Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      // 3️⃣ Save User in MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        role: "member",
        createdAt: new Date(),
      };
      await axiosSecure.post("/users", userInfo);

      // 4️⃣ Success Message
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      // 5️⃣ Redirect to Home
      navigate("/");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl w-11/12 max-w-5xl overflow-hidden">

        {/* Lottie Animation */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <Lottie animationData={registerLottie} loop />
        </div>

        {/* Register Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" }
                })}
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                })}
                placeholder="Email"
                className="input input-bordered w-full"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Password must contain at least one uppercase and one lowercase letter"
                  }
                })}
                placeholder="Password"
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Photo URL */}
            <div>
              <input
                {...register("photoURL", {
                  required: "Photo URL is required",
                  pattern: { value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/, message: "Must be a valid image URL" }
                })}
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
              {errors.photoURL && <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>}
            </div>

            <button className="btn btn-primary w-full">Register</button>
          </form>

          <div className="divider">OR</div>
          <SocialLogin />

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
