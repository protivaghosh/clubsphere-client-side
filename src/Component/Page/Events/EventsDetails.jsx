// src/Pages/Events/EventsDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/useAxiosSecure";
import { motion } from "framer-motion";

const EventsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axiosSecure.get(`/events/${id}`);
        setEvent(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event details");
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, axiosSecure]);

  // ✅ FINAL JOIN HANDLER (Requirement Match)
  const handleJoinEvent = async () => {
    if (!event) return;

    // 🟢 FREE EVENT
    if (!event.isPaid) {
      try {
        await axiosSecure.post("/event-registrations", {
          eventId: event._id,
          clubId: event.clubId,
        });
        toast.success("Successfully joined the event!");
      } catch (err) {
        toast.error("Already registered or failed to join");
      }
    }

    // PAID EVENT
    else {
      try {
        const res = await axiosSecure.post(
          "/create-event-checkout-session",
          { eventId: event._id }
        );

        window.location.href = res.data.url;
      } catch (err) {
        toast.error("Payment initialization failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!event) {
    return (
      <p className="text-center text-red-500 mt-20 text-lg">
        Event not found.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-white via-gray-100 to-white rounded-3xl shadow-2xl border border-gray-200"
    >
      {/* Hero */}
      <div className="relative h-60 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4 bg-black bg-opacity-30 rounded-lg">
          {event.title}
        </h1>
      </div>

      {/* Event Info */}
      <div className="flex flex-wrap gap-4 text-gray-700 mb-6 text-sm md:text-base">
        <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
        <span>📍 {event.location}</span>

        {event.isPaid ? (
          <span className="badge badge-warning">Paid Event</span>
        ) : (
          <span className="badge badge-success">Free Event</span>
        )}

        {event.isPaid && (
          <span className="font-semibold text-primary">
            Fee: ৳{event.eventFee}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="text-gray-700 mb-8 space-y-4 leading-relaxed">
        <p>{event.description}</p>
      </div>

      {/* Organizer */}
      <p className="text-gray-500 mb-8 text-sm md:text-base">
        Organized by:{" "}
        <span className="font-semibold">{event.managerEmail}</span>
      </p>

      {/* ✅ JOIN / PAY BUTTON */}
      <div className="text-center">
        <button
          onClick={handleJoinEvent}
          className="btn btn-primary btn-wide hover:scale-105 transition-transform"
        >
          {event.isPaid
            ? `Pay ৳${event.eventFee} & Join`
            : "Join Event"}
        </button>
      </div>
    </motion.div>
  );
};

export default EventsDetails;
