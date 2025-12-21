// WhyChooseUs.jsx
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaCalendarAlt, FaLock } from "react-icons/fa";

const ChooseUs = () => {
  const features = [
    { icon: <FaShieldAlt />, text: "Verified & Approved Clubs" },
    { icon: <FaUsers />, text: "Community Driven Platform" },
    { icon: <FaCalendarAlt />, text: "Smart Event Management" },
    { icon: <FaLock />, text: "Secure Membership System" },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose ClubSphere?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center"
            >
              <div className="text-3xl text-primary mb-4 flex justify-center">
                {item.icon}
              </div>
              <p className="font-medium">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
