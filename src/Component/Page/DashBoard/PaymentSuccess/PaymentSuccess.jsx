import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);

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

        // Save payment data in state
        setPaymentInfo(res.data.paymentData);

        toast.success("Payment successful!");
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

  if (!paymentInfo) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-500">Payment Failed!</h2>
        <p className="mt-4">Please try again.</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p className="mt-4">
        {paymentInfo.type === "event"
          ? "You are now registered for the event."
          : "You are now a member of the club."}
      </p>
      <p className="mt-2 text-gray-500">
        Amount Paid: ${paymentInfo.amount}
      </p>
      <p className="text-gray-500">
        Transaction ID: {paymentInfo.transactionId}
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
