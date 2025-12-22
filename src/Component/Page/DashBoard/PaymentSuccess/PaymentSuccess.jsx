import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const session_id = query.get("session_id");

    if (!session_id) {
      toast.error("No session ID found");
      navigate("/");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { sessionId: session_id });
        console.log("Payment verified:", res.data);
        toast.success("Payment successful and registered!");
        navigate("/dashboard"); 
      } catch (err) {
        console.error(err);
        toast.error("Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search, axiosSecure, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold">Payment Success!</h2>
      <p className="mt-4">You are now registered for the event.</p>
    </div>
  );
};

export default PaymentSuccess;
