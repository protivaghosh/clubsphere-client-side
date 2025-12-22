import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const MemberEvents = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axiosSecure.get("/my-events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your events");
    } finally {
      setLoading(false);
    }
  };

  // Cancel registration → update status to 'rejected'
  const cancelEvent = async (registrationId) => {
    try {
      await axiosSecure.patch(`/my-events/status/${registrationId}`, {
        status: "rejected"
      });

      // update state locally
      setEvents(events.map(e => 
        e._id === registrationId ? { ...e, status: "rejected" } : e
      ));

      toast.success("Event registration rejected");
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject registration");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [axiosSecure]);

  if (loading) return <p>Loading...</p>;
  if (!events.length)
    return <p className="text-gray-500">No events registered yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Club</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((item) => (
              <tr key={item._id}>
                <td>{item.eventTitle || item.title || "N/A"}</td>
                <td>{item.clubName || "N/A"}</td>
                <td>
                  {item.eventDate
                    ? new Date(item.eventDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{item.status === "rejected" ? "Rejected" : item.status}</td>
                <td>
                  {item.status !== "rejected" && (
                    <button
                      onClick={() => cancelEvent(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberEvents;
