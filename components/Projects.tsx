
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
              className="group relative aspect-square overflow-hidden cursor-pointer rounded-sm"
            >
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                <p className="text-[#BFA57A] text-xs uppercase tracking-[0.2em] mb-2">{project.category}</p>
                <h3 className="text-white text-xl font-serif text-center">{project.title}</h3>
                <div className="mt-4 w-10 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
