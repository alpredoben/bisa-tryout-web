import { motion } from "framer-motion";

const testimonials = [
  { name: "Ahmad", text: "Tryout ini sangat membantu!", image: "user1.jpg" },
  { name: "Budi", text: "Pembahasannya sangat jelas!", image: "user2.jpg" },
];

const Testimonials = () => (
  <section id="landingTestimonial" className="bg-white py-12">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h3 className="text-3xl font-bold mb-6 mt-10">Apa Kata Mereka?</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            className="bg-gray-100 p-6 rounded-lg shadow"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3 }}
          >
            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 mx-auto rounded-full mb-4" />
            <p className="text-lg font-semibold">{testimonial.text}</p>
            <p className="text-sm text-gray-600 mt-2">— {testimonial.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
