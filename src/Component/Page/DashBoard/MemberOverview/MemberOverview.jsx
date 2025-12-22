import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const MemberOverview = () => {
  const [overview, setOverview] = useState({
    clubsJoined: [],
    totalEvents: 0,
    upcomingEvents: [],
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axiosSecure.get("/member/overview");
        const data = res.data;

        setOverview({
          clubsJoined: data.memberClubs || [], // clubs joined
          totalEvents: data.totalEvents || 0,
          upcomingEvents: data.upcomingEvents || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load overview");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [axiosSecure]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl text-center">
          <h2 className="text-lg font-semibold">Total Clubs Joined</h2>
          <p className="text-2xl font-bold">{overview.clubsJoined.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl text-center">
          <h2 className="text-lg font-semibold">Total Events Registered</h2>
          <p className="text-2xl font-bold">{overview.totalEvents}</p>
        </div>
      </div>

      {/* Joined Clubs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Joined Clubs</h2>
        {overview.clubsJoined.length === 0 ? (
          <p>You haven't joined any clubs yet.</p>
        ) : (
          <ul className="space-y-3">
            {overview.clubsJoined.map((club) => (
              <li
                key={club._id}
                className="p-4 bg-white shadow rounded-xl flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{club.clubName}</h3>
                  <p className="text-sm text-gray-500">{club.location || "Unknown Location"}</p>
                </div>
                <span className="text-sm text-green-600 font-semibold">Active</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upcoming events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        {overview.upcomingEvents.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          <ul className="space-y-3">
            {overview.upcomingEvents.map((event) => (
              <li
                key={event._id}
                className="p-4 bg-white shadow rounded-xl flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.eventDate).toLocaleDateString()} -{" "}
                    {event.clubName || "Unknown Club"}
                  </p>
                </div>
                <span className="text-sm text-gray-600">{event.isPaid ? "$ Paid" : "Free"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MemberOverview;
