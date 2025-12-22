import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Overview stats
        const overviewRes = await axiosSecure.get("/admin/overview");
        setStats(overviewRes.data);

        // Chart: memberships per club
        const membershipsRes = await axiosSecure.get("/admin/memberships-per-club");
        const labels = membershipsRes.data.map(c => c.clubName);
        const counts = membershipsRes.data.map(c => c.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Memberships",
              data: counts,
              backgroundColor: "rgba(54, 162, 235, 0.6)"
            }
          ]
        });
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Clubs</h2>
          <p className="text-3xl font-bold">{stats.totalClubs}</p>
          <p className="text-sm text-gray-500">
            Approved: {stats.approvedClubs}, Pending: {stats.pendingClubs}, Rejected: {stats.rejectedClubs}
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Memberships</h2>
          <p className="text-3xl font-bold">{stats.totalMemberships}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Payments ($)</h2>
          <p className="text-3xl font-bold">{stats.totalPayments}</p>
        </div>
      </div>

      {/* Chart */}
      {chartData && (
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Memberships per Club</h2>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
