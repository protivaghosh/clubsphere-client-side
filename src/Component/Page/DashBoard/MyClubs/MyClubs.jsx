// src/Pages/Dashboard/Manager/MyClubs.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa"; // FaEdit import
import { toast } from "react-hot-toast";

const MyClubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading, refetch } = useQuery({
    queryKey: ["my-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/my-clubs");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    const res = await axiosSecure.delete(`/manager/my-clubs/${id}`);
    if (res.data.deletedCount > 0) {
      toast.success("Club deleted");
      refetch();
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        My Clubs ({clubs.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Category</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club, index) => (
              <tr key={club._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{club.clubName}</td>
                <td>{club.category}</td>
                <td>
                  {club.membershipFee === 0 ? "Free" : `৳${club.membershipFee}`}
                </td>
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
                <td>
                  {new Date(club.createdAt).toLocaleDateString()}
                </td>
                <td className="flex gap-2">
                  <Link
                    to={`/clubs/${club._id}`}
                    className="btn btn-xs btn-info"
                  >
                    <FaEye />
                  </Link>

                  <Link
                    to={`/dashboard/manager/my-clubs/edit/${club._id}`} // edit page route
                    className="btn btn-xs btn-warning"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => handleDelete(club._id)}
                    className="btn btn-xs btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clubs.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            You haven't created any clubs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyClubs;
