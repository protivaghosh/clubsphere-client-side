// src/Component/Page/DashBoard/ManagerOverview/ManagerOverview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../../Auth/UseAuth/UseAuth";
import { toast } from "react-hot-toast";

const ManagerOverview = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = UseAuth();

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get("/manager/overview", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOverview(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load overview");
        setLoading(false);
      }
    };

    fetchOverview();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (!overview) return <p>No data available</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-6 bg-white shadow rounded-xl text-center">
        <h2 className="text-lg font-semibold">Clubs Managed</h2>
        <p className="text-2xl font-bold">{overview.numberOfClubs}</p>
      </div>
      <div className="p-6 bg-white shadow rounded-xl text-center">
        <h2 className="text-lg font-semibold">Total Members</h2>
        <p className="text-2xl font-bold">{overview.totalMembers}</p>
      </div>
      <div className="p-6 bg-white shadow rounded-xl text-center">
        <h2 className="text-lg font-semibold">Events Created</h2>
        <p className="text-2xl font-bold">{overview.totalEvents}</p>
      </div>
      <div className="p-6 bg-white shadow rounded-xl text-center">
        <h2 className="text-lg font-semibold">Payments Received</h2>
        <p className="text-2xl font-bold">${overview.totalPayments.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ManagerOverview;
