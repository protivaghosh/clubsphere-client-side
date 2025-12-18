import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const HomeEvent = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["home-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-events");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading events...</p>;
  if (events.length === 0) return <p>No upcoming events found.</p>;

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event) => (
          <motion.div
            key={event._id}
            className="card p-4 shadow-lg rounded-lg hover:shadow-xl transition"
            variants={cardVariants}
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-1">{event.location}</p>
            <p className="text-gray-500 mb-2">
              Date: {new Date(event.eventDate).toLocaleDateString()}
            </p>
            {event.isPaid ? (
              <span className="badge badge-error mb-2">Paid</span>
            ) : (
              <span className="badge badge-success mb-2">Free</span>
            )}
            <Link
              to={`/events/${event._id}`}
              className="btn btn-primary btn-sm mt-2"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-8">
        <Link to="/events" className="btn btn-outline btn-primary">
          View All Events
        </Link>
      </div>
    </section>
  );
};

export default HomeEvent;
