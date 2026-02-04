import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../constants';

const InstagramGallery: React.FC = () => {
  return (
    <section id="instagram" className="py-24 px-6 bg-[#F5F1EA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Instagram Gallery</h2>
          <p className="text-[#2C2C2C]/60">A curated feed of our latest premium interiors.</p>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1"
      >
        {INSTAGRAM_POSTS.map((post) => (
          <motion.div
            key={post.id}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="group relative aspect-square overflow-hidden"
          >
            <img src={post.imageUrl} alt={post.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
              <Instagram size={22} className="mb-2" />
              <span className="text-xs uppercase tracking-widest">Follow Us</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default InstagramGallery;
