// src/Pages/Dashboard/Manager/EditClubs.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import { toast } from "react-hot-toast";

const EditClubs = () => {
  const { id } = useParams(); // club id from URL
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    clubName: "",
    category: "",
    membershipFee: "",
    description: "",
  });

  // Fetch club details on load
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axiosSecure.get(`/clubs/${id}`);
        setClub(res.data);
        setFormData({
          clubName: res.data.clubName || "",
          category: res.data.category || "",
          membershipFee: res.data.membershipFee || 0,
          description: res.data.description || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load club data");
        setLoading(false);
      }
    };

    fetchClub();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/manager/my-clubs/edit/${id}`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/my-clubs"); // redirect to MyClubs page
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update club");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!club) return <p className="text-center mt-10">Club not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Club</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Club Name</label>
          <input
            type="text"
            name="clubName"
            value={formData.clubName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Membership Fee</label>
          <input
            type="number"
            name="membershipFee"
            value={formData.membershipFee}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Club
        </button>
      </form>
    </div>
  );
};

export default EditClubs;
