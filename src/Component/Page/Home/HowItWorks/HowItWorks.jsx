// HowItWorks.jsx
import { motion } from "framer-motion";
import { FaUsers, FaCalendarCheck, FaRocket } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Join a Club",
      desc: "Explore verified clubs and become a member easily",
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-primary" />,
      title: "Attend Events",
      desc: "Participate in upcoming events organized by clubs",
    },
    {
      icon: <FaRocket className="text-4xl text-primary" />,
      title: "Grow Together",
      desc: "Build skills, network, and community engagement",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 my-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12"
      >
        How ClubSphere Works
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
