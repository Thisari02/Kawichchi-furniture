
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Category } from '../types';

const categories: Category[] = ['All', 'Living Room', 'Bedroom', 'Office', 'Dining'];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = PROJECTS.filter(p => 
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif mb-4"
        >
          Our Projects
        </motion.h2>
        <div className="w-24 h-1 bg-[#BFA57A] mx-auto mb-10"></div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-sm tracking-widest uppercase transition-all duration-300 border-b-2 ${
                activeCategory === cat 
                  ? 'border-[#BFA57A] text-[#BFA57A]' 
                  : 'border-transparent text-[#2C2C2C]/50 hover:text-[#2C2C2C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden cursor-pointer rounded-sm bg-[#F5F1EA]"
            >
              <div className="relative h-[420px] overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#BFA57A] mb-4">
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-white text-2xl font-serif mb-3">{project.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      <Layers size={12} /> Materials
                    </span>
                    {project.materials.map((material) => (
                      <span
                        key={material}
                        className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/10 text-white/80 border border-white/20"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
