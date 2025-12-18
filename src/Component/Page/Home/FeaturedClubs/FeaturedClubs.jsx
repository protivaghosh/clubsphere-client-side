import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const FeaturedClubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-clubs");
      console.log('featured clubs', res.data)
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-20">
      
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Clubs
        </h2>
        <p className="text-gray-600 mt-2">
          Discover popular and newly approved clubs
        </p>
      </motion.div>

      {/* Clubs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club, index) => (
          <motion.div
            key={club._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">
                {club.clubName}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2">
                {club.description}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500 pt-3">
                <span>{club.category}</span>
                <span>👥 {club.
membershipFee || 0}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClubs;
