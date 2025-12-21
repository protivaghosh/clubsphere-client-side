import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import { motion } from "framer-motion";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [club, setClub] = useState(null);
  const [membersCount, setMembersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const res = await axiosSecure.get(`/clubs/${id}`);
        setClub(res.data);

        // Fetch number of members dynamically
        const membersRes = await axiosSecure.get(`/memberships?clubId=${id}&status=active`);
        setMembersCount(membersRes.data.length);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        toast.error("Failed to load club details");
      }
    };

    fetchClubDetails();
  }, [id, axiosSecure]);

  if (loading) return <p className="text-center mt-10">Loading club details...</p>;
  if (!club) return <p className="text-center mt-10 text-red-500">Club not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-200"
    >
      {/* Banner */}
      <img
        src={club.bannerImage}
        alt={club.clubName}
        className="rounded-2xl mb-6 w-full object-cover h-72"
      />

      {/* Club Info */}
      <h2 className="text-4xl font-bold mb-3 text-gray-900">{club.clubName}</h2>
      <p className="text-gray-600 text-lg mb-4">
        {club.category} • {club.location}
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">{club.description}</p>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-6">
        <p className="bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-800">
          Membership Fee: {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
        </p>
        <p className="bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-800">
          👥 Members: {membersCount}
        </p>
        <p className="bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-800">
          Manager: {club.managerEmail}
        </p>
      </div>

      {/* Join Button */}
      <button
        className="btn btn-primary btn-lg w-full md:w-auto transition-all hover:scale-105"
        onClick={() => {
          if (club.membershipFee === 0) {
            toast.success("Joined club successfully!");
            // call backend to add membership
          } else {
            // redirect to payment flow (Stripe)
            window.location.href = `/payment/${club._id}`;
          }
        }}
      >
        {club.membershipFee === 0 ? "Join Club" : `Pay $${club.membershipFee}`}
      </button>
    </motion.div>
  );
};

export default ClubDetails;
