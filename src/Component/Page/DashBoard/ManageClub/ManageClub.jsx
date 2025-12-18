import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const ManageClub = () => {
  const axiosSecure = useAxiosSecure();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all clubs
  const fetchClubs = async () => {
    try {
      const res = await axiosSecure.get("/manage-clubs");
      setClubs(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch clubs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // Approve / Reject handler
  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/manage-clubs/${id}`, { status });

      Swal.fire({
        icon: "success",
        title: `Club ${status}`,
        timer: 1200,
        showConfirmButton: false,
      });

      fetchClubs(); // refresh data
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Clubs</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Manager</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club, index) => (
              <tr key={club._id}>
                <td>{index + 1}</td>
                <td>{club.clubName}</td>
                <td>{club.managerName}</td>
                <td>{club.managerEmail}</td>
                <td>
                  <span
                    className={`badge ${
                      club.status === "approved"
                        ? "badge-success"
                        : club.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {club.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    disabled={club.status === "approved"}
                    onClick={() =>
                      handleStatusUpdate(club._id, "approved")
                    }
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    disabled={club.status === "rejected"}
                    onClick={() =>
                      handleStatusUpdate(club._id, "rejected")
                    }
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClub;
