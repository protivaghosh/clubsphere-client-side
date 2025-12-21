// StatsSection.jsx
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { value: "50+", label: "Active Clubs" },
    { value: "200+", label: "Events Hosted" },
    { value: "1000+", label: "Members Joined" },
    { value: "24/7", label: "Community Support" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 my-20">
      <div className="grid md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-3xl font-bold text-primary">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
