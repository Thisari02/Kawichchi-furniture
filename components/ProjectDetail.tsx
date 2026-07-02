import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';
import { fetchProjectById } from '../lib/projectApi';
import type { Project } from '../types';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    const projectId = String(id);
    console.log('Fetching project with ID:', projectId);
    if (!projectId) {
      setProject(null);
      setLoading(false);
      return;
    }

    fetchProjectById(projectId)
      .then((data) => {
        console.log('Fetched project data:', data);
        if (!canceled) {
          setProject(data);
        }
      })
      .finally(() => {
        if (!canceled) {
          setLoading(false);
        }
      });

    return () => {
      canceled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="py-24 px-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Loading project…</h2>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="py-24 px-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-2 bg-[#D4AF37] text-black hover:bg-[#F5D547] transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </section>
    );
  }

  const relatedProjects = PROJECTS.filter(
    p => p.category === project.category && p.id !== project.id
  ).slice(0, 3);

  return (
    <section className="bg-white min-h-screen">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[500px] md:h-[600px] overflow-hidden"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
      </motion.div>

      {/* Content */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              <MapPin size={16} />
              <span>{project.location}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-4">
              {project.title}
            </h1>
            <div className="w-16 h-1 bg-[#D4AF37] mb-8"></div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-lg text-[#2C2C2C]/80 leading-relaxed mb-8">
              {project.description}
            </p>
          </motion.div>

          {/* Category & Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-12 py-12 border-t border-b border-[#D4AF37]/20"
          >
            {/* Category */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#2C2C2C] mb-4 font-semibold">
                Category
              </h3>
              <p className="text-xl text-[#D4AF37] font-serif">{project.category}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#2C2C2C]/70">
                {project.subcategory || project.subCategory || 'Custom'}
              </p>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#2C2C2C] mb-6 font-semibold flex items-center gap-2">
                <Layers size={14} />
                Materials Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {(project.materials || []).map((material) => (
                  <span
                    key={material}
                    className="px-4 py-2 text-sm uppercase tracking-[0.2em] bg-[#F5F1EA] text-[#2C2C2C] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          
        </div>
      </div>

      {/* Portfolio Gallery */}
      {project.portfolio && project.portfolio.length > 0 && (
        <div className="py-20 px-6 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">
                Project Portfolio
              </h2>
              <div className="w-24 h-1 bg-[#BFA57A] mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {project.portfolio.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-sm h-[350px]"
                >
                  <img
                    src={image}
                    alt={`${project.title} portfolio ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="py-20 px-6 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">
                More {project.category} Projects
              </h2>
              <div className="w-24 h-1 bg-[#BFA57A] mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/projects/${relatedProject.id}`)}
                >
                  <div className="relative h-[300px] overflow-hidden rounded-sm mb-4">
                    <img
                      src={relatedProject.imageUrl}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-serif text-[#2C2C2C] group-hover:text-[#D4AF37] transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-sm text-[#2C2C2C]/60 mt-2">{relatedProject.location}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetail;
