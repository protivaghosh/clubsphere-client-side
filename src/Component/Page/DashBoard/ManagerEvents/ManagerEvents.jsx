import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const ManagerEvents = ({ userEmail }) => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["manager-events"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events?managerEmail=${userEmail}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading your events...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Events</h1>
        <Link to="/dashboard/manager/events/create" className="btn btn-primary">
          Create Event
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Date</th>
              <th>Paid</th>
              <th>Max Attendees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{event.location}</td>
                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                <td>{event.isPaid ? "Yes" : "No"}</td>
                <td>{event.maxAttendees || "N/A"}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/manager/events/edit/${event._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={async () => {
                      if (window.confirm("Are you sure?")) {
                        try {
                          await axiosSecure.delete(`/events/${event._id}`);
                          alert("Event deleted successfully");
                        } catch (err) {
                          console.error(err);
                          alert("Failed to delete event");
                        }
                      }
                    }}
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
