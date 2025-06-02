import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <motion.section
      className="bg-emerald-900 text-slate-50 py-12 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-4">Siap Mulai Tryout di BISA TryOut?</h2>
      <p className="text-lg mb-6">
        Tingkatkan persiapan ujianmu dengan latihan soal interaktif dan analisis nilai!
      </p>
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/login">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition">
            Login Sekarang
          </button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CTA;
