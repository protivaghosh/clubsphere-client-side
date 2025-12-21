import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const changeRole = async (id, role) => {
    await axiosSecure.patch(`/users/role/${id}`, { role });
    Swal.fire("Success", `Role updated to ${role}`, "success");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-info">{user.role}</span>
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-success"
                    disabled={user.role === "admin"}
                    onClick={() => changeRole(user._id, "admin")}
                  >
                    Make Admin
                  </button>

                  <button
                    className="btn btn-xs btn-warning"
                    disabled={user.role === "manager"}
                    onClick={() => changeRole(user._id, "manager")}
                  >
                    Make Manager
                  </button>

                  <button
                    className="btn btn-xs btn-info"
                    disabled={user.role === "member"}
                    onClick={() => changeRole(user._id, "member")}
                  >
                    Make Member
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

export default ManageUsers;
