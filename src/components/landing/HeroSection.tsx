import { motion } from "framer-motion";
import { IconSvg } from "../../assets"; // undraw.co image
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => (
  <section id="landingHome" className="grid md:grid-cols-2 gap-6 items-center px-6 py-12 max-w-6xl mx-auto">
    <div>
      <motion.h2
        className="text-4xl font-bold mb-4 text-blue-700 mt-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        TryOut Online Lebih Mudah dan Efisien
      </motion.h2>

      <p className="text-lg mb-6">
        Akses <b>BISA TryOut</b> dan dapatkan soal dari berbagai kategori, kapan
        saja di mana saja. Cocok untuk latihan mandiri atau persiapan seleksi.
      </p>
      <Link to="/login">
        <motion.button
          className="px-6 py-3 bg-emerald-900 text-white rounded-xl shadow hover:bg-green-600 transition"
          whileHover={{ scale: 1.1 }}
        >
          Mulai Tryout
        </motion.button>
      </Link>
    </div>
    <div className="flex justify-center">
      <motion.img
        src={IconSvg.ExamBro}
        className="w-full max-w-md"
        alt="Belajar"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  </section>
);

export default HeroSection;
