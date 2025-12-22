import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get("/member/payments");
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [axiosSecure]);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Club/Event</th>
              <th className="p-2 border">Transaction ID</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id} className="text-center">
                <td className="p-2 border">৳{payment.amount}</td>
                <td className="p-2 border capitalize">{payment.type}</td>
                <td className="p-2 border">
                  {payment.clubName || payment.eventTitle || "N/A"}
                </td>
                <td className="p-2 border">{payment.transactionId}</td>
                <td className="p-2 border">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  <span
                    className={
                      payment.status === "success"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
