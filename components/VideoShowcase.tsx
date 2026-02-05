import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { VIDEO_SHOWCASE } from '../constants';

const VideoShowcase: React.FC = () => {
  return (
    <section id="showcase" className="py-24 bg-[#2C2C2C] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h4 className="text-[#BFA57A] font-medium tracking-[0.4em] uppercase text-xs mb-4">Visual Stories</h4>
            <h2 className="text-4xl md:text-5xl font-serif">Behind the Craft</h2>
          </div>
          <p className="max-w-md text-white/50 text-sm leading-relaxed">
            Witness the transformation of raw timber into timeless elegance. Explore our workshop journeys and client reveals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEO_SHOWCASE.map((video, idx) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
                />
                
                <span className="absolute top-4 left-4 bg-[#BFA57A] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold z-20">
                  {video.tag}
                </span>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play fill="white" size={24} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-lg font-serif group-hover:text-[#BFA57A] transition-colors">{video.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
