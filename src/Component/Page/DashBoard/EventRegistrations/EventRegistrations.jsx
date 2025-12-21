// src/Pages/Dashboard/Manager/EventRegistrations.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const EventRegistrations = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ["event-registrations", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager/event-registrations/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Registrations</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>User Email</th>
            <th>Status</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r, i) => (
            <tr key={r._id}>
              <td>{i + 1}</td>
              <td>{r.userEmail}</td>
              <td>
                <span className={`badge ${r.status === "registered" ? "badge-success" : "badge-error"}`}>
                  {r.status}
                </span>
              </td>
              <td>{new Date(r.registeredAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventRegistrations;
