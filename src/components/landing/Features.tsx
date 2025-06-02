import { motion } from "framer-motion";

const features = [
  { title: "Latihan Soal", desc: "Ratusan soal pilihan ganda", icon: "📝" },
  { title: "Statistik Nilai", desc: "Lihat grafik progres", icon: "📊" },
  { title: "Pembahasan", desc: "Detail dan mendalam", icon: "📖" },
];

const Features = () => (
  <section id="landingFeatures" className="bg-gray-50 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-bold text-center mb-10 mt-10">Fitur Unggulan</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-white p-6 rounded-lg shadow text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h5 className="text-xl font-semibold mb-2">{feature.title}</h5>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
