import React from 'react';
import { motion } from 'framer-motion';

const materials = [
  { name: 'Wood', tone: 'American Walnut', img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Fabric', tone: 'Italian Boucle', img: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Laminate', tone: 'Stone Oak', img: 'https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Handles', tone: 'Brushed Bronze', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Glass', tone: 'Smoked Grey', img: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Colours', tone: 'Soft Mineral Palette', img: 'https://images.unsplash.com/photo-1616594039964-2d6798f8d7f9?q=80&w=1000&auto=format&fit=crop' },
];

const MaterialLibrary: React.FC = () => {
  return (
    <section id="materials" className="section-shell bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="lux-tag mb-3">Material Library</p>
            <h2 className="lux-section-title text-4xl md:text-5xl">Tactile Palette Preview</h2>
          </div>
          <p className="lux-text-soft max-w-lg">Preview our curated finishes before consultation. Zoom-grade textures and palette curation continue in the full material appointment.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {materials.map((material, idx) => (
            <motion.article
              key={material.name}
              className="group lux-card overflow-hidden"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: [0, -3, 0] }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{
                delay: idx * 0.06,
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="h-32 md:h-36 overflow-hidden">
                <img
                  src={material.img}
                  alt={`${material.name} sample`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="text-base md:text-lg text-[var(--lux-text)]">{material.name}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--lux-text-soft)] mt-2">{material.tone}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialLibrary;
