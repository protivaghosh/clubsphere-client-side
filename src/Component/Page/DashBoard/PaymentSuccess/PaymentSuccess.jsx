import React from 'react';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold text-green-600 mb-3">
        Payment Successful 🎉
      </h2>

      <p className="text-gray-600 mb-2">
        Thank you for your payment.
      </p>

      <p className="text-sm text-gray-400">
        Session ID: {sessionId}
      </p>
    </div>
  );
};

export default PaymentSuccess;