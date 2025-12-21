import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CostSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Join or Create a Club?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 text-lg"
        >
          Start your journey with ClubSphere today
        </motion.p>

        <div className="flex justify-center gap-4">
          <Link to="/clubs" className="btn btn-white text-primary">
            Explore Clubs
          </Link>
          <Link to="/register" className="btn btn-outline text-white">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CostSection;
