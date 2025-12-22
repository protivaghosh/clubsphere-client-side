import React, { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../Auth/UseAuth/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";


const AdminOverview = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClubs: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Example API calls
        const usersRes = await axiosSecure.get("/users");
        const clubsRes = await axiosSecure.get("/clubs");

        setStats({
          totalUsers: usersRes.data.length,
          totalClubs: clubsRes.data.length,
          recentUsers: usersRes.data.slice(-5).reverse(), // last 5 users
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Admin Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-600">
            {stats.totalUsers}
          </span>
          <p className="text-gray-600 mt-2">Total Users</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-green-600">
            {stats.totalClubs}
          </span>
          <p className="text-gray-600 mt-2">Total Clubs</p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        <ul className="space-y-2">
          {stats.recentUsers.map((u) => (
            <li
              key={u._id}
              className="flex justify-between items-center p-2 border-b last:border-none"
            >
              <div className="flex items-center gap-3">
                <img
                  src={u.photoURL || "/default-avatar.png"}
                  alt={u.displayName || u.email}
                  className="w-8 h-8 rounded-full border"
                />
                <span>{u.displayName || u.email}</span>
              </div>
              <span className="text-gray-500 text-sm">
                {new Date(u.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;
