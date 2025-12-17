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

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
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
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl w-11/12 max-w-5xl overflow-hidden">

        {/* Lottie */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <Lottie animationData={loginLottie} loop />
        </div>

        {/* Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6">
            Login to <span className="text-primary">ClubSphere</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered w-full"
            />

            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="input input-bordered w-full"
            />

            <button className="btn btn-primary w-full">Login</button>
          </form>

          <div className="divider">OR</div>
          <SocialLogin />

          <p className="text-center mt-4">
            New here?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
