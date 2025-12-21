import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import { motion } from "framer-motion";

import UseAuth from "../../Auth/UseAuth/UseAuth";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth()

  const [club, setClub] = useState(null);
  const [membersCount, setMembersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const res = await axiosSecure.get(`/clubs/${id}`);
        setClub(res.data);

        const membersRes = await axiosSecure.get(
          `/memberships?clubId=${id}&status=active`
        );
        setMembersCount(membersRes.data.length);

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load club details");
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id, axiosSecure]);

  // 🔥 Pay handler
  const handlePay = async () => {
    try {
      const paymentInfo = {
        amount: club.membershipFee,
        clubName: club.clubName,
        clubId: club._id,
        userEmail: user.email
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      // Stripe checkout redirect
      window.location.replace(res.data.url);

    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!club) return <p className="text-center mt-10 text-red-500">Club not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl"
    >
      <img
        src={club.bannerImage}
        alt={club.clubName}
        className="rounded-2xl mb-6 w-full h-72 object-cover"
      />

      <h2 className="text-4xl font-bold mb-2">{club.clubName}</h2>
      <p className="text-gray-600 mb-4">
        {club.category} • {club.location}
      </p>

      <p className="mb-6">{club.description}</p>

      <div className="flex gap-4 mb-6">
        <p className="bg-gray-100 px-4 py-2 rounded">
          Fee: {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
        </p>
        <p className="bg-gray-100 px-4 py-2 rounded">
          👥 {membersCount} Members
        </p>
      </div>

      <button
        onClick={() => {
          if (club.membershipFee === 0) {
            toast.success("Joined club successfully!");
          } else {
            handlePay();
          }
        }}
        className="btn btn-primary btn-lg"
      >
        {club.membershipFee === 0 ? "Join Club" : `Pay $${club.membershipFee}`}
      </button>
    </motion.div>
  );
};

export default ClubDetails;
