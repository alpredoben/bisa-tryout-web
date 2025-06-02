import { motion } from "framer-motion";
import { IconSvg } from "../../assets";

const data = [
  { title: "Up Career", desc: "TryOut untuk pengembangan karir", icon: IconSvg.LogoUpCareer },
  { title: "CPNS", desc: "TryOut Seleksi CPNS", icon: IconSvg.LogoCPNS },
  { title: "BUMN", desc: "TryOut Rekrutmen BUMN", icon: IconSvg.LogoBUMN },
];

const Products = () => (
  <section id="landingProduct" className="bg-gray-50 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-bold text-center mb-10 mt-10">Daftar Produk TryOut</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <img src={item.icon} alt={item.title} className="w-36 h-36 mb-4" />
            <h5 className="text-xl font-semibold">{item.title}</h5>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
