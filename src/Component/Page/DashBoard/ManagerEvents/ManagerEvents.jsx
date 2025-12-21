import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const ManagerEvents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["manager-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/events/${id}`);
      queryClient.invalidateQueries(["manager-events"]);
      Swal.fire("Deleted!", "Event removed", "success");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">My Events</h2>
        <Link to="/dashboard/manager/createEvents" className="btn btn-primary">
          Create Event
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={event._id}>
                <td>{i + 1}</td>
                <td>{event.title}</td>
                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>{event.isPaid ? "Yes" : "No"}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/manager/event-registrations/${event._id}`}
                    className="btn btn-xs btn-info"
                  >
                    Registrations
                  </Link>
                  <Link
                    to={`/dashboard/manager/events/edit/${event._id}`}
                    className="btn btn-xs btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
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

export default ManagerEvents;
