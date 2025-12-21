import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure/useAxiosSecure';

const MemberEvents = () => {
    const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosSecure.get("/my-events").then(res => {
      setEvents(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      {events.length === 0 && (
        <p className="text-gray-500">No events registered yet.</p>
      )}

      <div className="space-y-4">
        {events.map(item => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-base-100 shadow p-4 rounded"
          >
            <div>
              <h3 className="font-semibold">Event ID: {item.eventId}</h3>
              <p className="text-sm text-gray-500">
                Status: {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberEvents;