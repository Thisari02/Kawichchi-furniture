
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Layers } from 'lucide-react';
import { fetchProjects } from '../lib/projectApi';
import type { FilterCategory, Project, Subcategory } from '../types';
import { categories } from '../src/data/categories';

const CATEGORY_FILTERS: FilterCategory[] = ['All', ...categories.map((cat) => cat.name)];
const CATEGORY_SUBCATEGORIES: Record<string, Subcategory[]> = categories.reduce((acc, cat) => {
  acc[cat.name] = cat.subCategories.map((sub) => sub.name);
  return acc;
}, {} as Record<string, Subcategory[]>);

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | 'All'>('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchProjects()
      .then((data) => {
        if (!mounted) return;
        setProjects(data);
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setActiveSubcategory('All');
    } else if (
      activeSubcategory !== 'All' &&
      !CATEGORY_SUBCATEGORIES[activeCategory].includes(activeSubcategory as Subcategory)
    ) {
      setActiveSubcategory(CATEGORY_SUBCATEGORIES[activeCategory][0]);
    }
  }, [activeCategory, activeSubcategory]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) => {
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }
        const projectSubcategory = p.subcategory || p.subCategory || '';
        if (activeSubcategory !== 'All' && projectSubcategory !== activeSubcategory) {
          return false;
        }
        return true;
      }),
    [projects, activeCategory, activeSubcategory]
  );


  if (loading) {
    return (
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Our Projects
          </motion.h2>
          <div className="w-24 h-1 bg-[#BFA57A] mx-auto mb-10"></div>
          <p className="text-[#2C2C2C]/70">Loading projects…</p>
        </div>
      </section>
    );
  }

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
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {CATEGORY_FILTERS.map((cat) => (
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

        {activeCategory !== 'All' && (
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORY_SUBCATEGORIES[activeCategory].map((subcat) => (
              <button
                key={subcat}
                onClick={() => setActiveSubcategory(subcat)}
                className={`px-4 py-2 text-xs tracking-[0.3em] uppercase transition-all duration-300 border rounded-full ${
                  activeSubcategory === subcat
                    ? 'bg-[#BFA57A] text-white border-[#BFA57A]'
                    : 'bg-white text-[#2C2C2C]/80 border-[#D4AF37]/20 hover:bg-[#F5F1EA]'
                }`}
              >
                {subcat}
              </button>
            ))}
            <button
              onClick={() => setActiveSubcategory('All')}
              className={`px-4 py-2 text-xs tracking-[0.3em] uppercase transition-all duration-300 border rounded-full ${
                activeSubcategory === 'All'
                  ? 'bg-[#BFA57A] text-white border-[#BFA57A]'
                  : 'bg-white text-[#2C2C2C]/80 border-[#D4AF37]/20 hover:bg-[#F5F1EA]'
              }`}
            >
              All Subcategories
            </button>
          </div>
        )}
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
              onClick={() => navigate(`/projects/${project.id}`)}
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
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#BFA57A] mb-4">
                    <span>{project.category}</span>
                    <span className="text-white/60">•</span>
                    <span>{project.subcategory || project.subCategory || 'Custom'}</span>
                    <span className="text-white/60">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-serif mb-3">{project.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      <Layers size={12} /> Materials
                    </span>
                    {(project.materials || []).map((material) => (
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
