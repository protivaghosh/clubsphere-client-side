import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/useAxiosSecure";
import { useState } from "react";
import { motion } from "framer-motion";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("upcoming");

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-events", search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-events?search=${search}&sort=${sort}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load events.
      </p>
    );
  }

  return (
    <section className="my-16 max-w-7xl mx-auto px-4">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary">Upcoming Events</h2>
        <p className="text-gray-600 mt-2">Discover and join exciting club events</p>
      </div>

      {/* Search & Sort */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events by title..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="upcoming">Upcoming First</option>
          <option value="oldest">Oldest First</option>
          <option value="paid">Paid Events</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden p-5 flex flex-col justify-between h-72"
          >
           

            {/* Card Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600 text-sm mt-1">📅 {new Date(event.eventDate).toLocaleDateString()}</p>
                <p className="text-gray-600 text-sm">📍 {event.location}</p>
              </div>

              <div className="mt-4">
                <span
                  className={`badge ${event.isPaid ? "badge-warning" : "badge-success"}`}
                >
                  {event.isPaid ? "Paid Event" : "Free Event"}
                </span>

                {event.isPaid && (
                  <p className="font-medium text-primary mt-1">Fee: ৳{event.eventFee || 0}</p>
                )}

                <Link
                  to={`/events/${event._id}`}
                  className="btn btn-primary btn-sm w-full mt-3"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No events found.</p>
      )}
    </section>
  );
};

export default Events;
