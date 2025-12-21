import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FeaturedClubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-clubs");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-24">
      {/* 🌟 Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-bold text-gray-900">
          Featured Clubs
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Explore the most active and newly approved clubs from our community
        </p>
      </motion.div>

      {/* 🧩 Clubs Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {clubs.map((club) => (
          <motion.div
            key={club._id}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* 🖼 Image */}
            <div className="relative">
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="h-52 w-full object-cover"
              />

              {/* Category Badge */}
              <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                {club.category}
              </span>
            </div>

            {/* 📄 Content */}
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {club.clubName}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2">
                {club.description}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500 pt-4">
                <span>
                  💳{" "}
                  {club.membershipFee === 0
                    ? "Free"
                    : `$${club.membershipFee}`}
                </span>
                <span>📍 {club.location}</span>
              </div>

              {/* CTA */}
              <Link
                to={`/clubs/${club._id}`}
                className="btn btn-outline btn-primary btn-sm w-full mt-4"
              >
                View Club
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedClubs;
