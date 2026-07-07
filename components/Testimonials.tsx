import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="section-shell px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="lux-tag mb-4">Customer Stories</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 lux-section-title">Words From Our Clients</h2>
          <p className="text-[var(--lux-text-soft)] max-w-2xl mx-auto">
            Premium craftsmanship trusted by discerning homeowners, architects, and hospitality brands.
          </p>
          <div className="w-24 h-1 bg-[var(--lux-bronze)] mx-auto mt-8"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="lux-card rounded-2xl p-6 flex flex-col gap-4"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-1 text-[#D4AF37]">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <span key={index} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <p className="font-serif text-lg text-[var(--lux-text)] leading-relaxed">“{testimonial.quote}”</p>
              <div className="pt-4 border-t border-white/10">
                <p className="font-semibold text-[var(--lux-text)]">{testimonial.name}</p>
                <p className="text-sm uppercase tracking-widest text-[var(--lux-text-soft)]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
