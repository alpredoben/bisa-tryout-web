/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import type React from "react";
import {  useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {id: 1, name: 'Beranda', slug: 'landingHome', type: 'scroll'},
  {id: 2, name: 'Produk', slug: 'landingProduct', type: 'scroll'},
  {id: 3, name: 'Fitur', slug: 'landingFeatures', type: 'scroll'},
  {id: 4, name: 'Testimoni', slug: 'landingTestimonial', type: 'scroll'},
  {id: 5, name: 'Masuk', slug: 'login', type: 'navigate'},
  {id: 6, name: 'Daftar', slug: 'register', type: 'navigate'}
]


const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (item: any) => {
    if (item.type === "navigate") {
      navigate(`/${item.slug}`);
    } else {
      if (location.pathname === "/") {
        // Jika sudah di halaman Landing Page, langsung scroll
        document.getElementById(item.slug)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Jika di halaman lain, navigasi dulu ke Landing Page, lalu scroll setelah sedikit delay
        navigate("/");
        setTimeout(() => {
          document.getElementById(item.slug)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  };


  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-emerald-900 bg-white font-semibold p-4 fixed w-full top-0 shadow-lg z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">BISA TryOut</h1>
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <motion.li
              key={item.id}
              className="cursor-pointer hover:text-cyan-500 font-bold"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleNavigation(item)}
            >
              {item.name}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default TopNav;
