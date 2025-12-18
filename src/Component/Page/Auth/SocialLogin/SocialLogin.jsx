import React from "react";
import UseAuth from "../UseAuth/UseAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";


const SocialLogin = () => {
  const axiosSecure = useAxiosSecure();
  const { signInGoogle, loading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  
  const handleGoogleSignIn = () => {
    if (loading) return;

    signInGoogle()
      .then((result) => {
        // ✅ ADD: user info
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "member", 
          createdAt: new Date()
        };

        // ✅ ADD: save user to MongoDB
        axiosSecure.post("/users", userInfo);

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
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
      Continue with Google
    </button>
  );
};

export default SocialLogin;
