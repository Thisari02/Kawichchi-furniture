
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-white text-5xl md:text-8xl font-serif mb-8 leading-tight">
            Crafted Furniture for <br className="hidden md:block" /> Timeless Living
          </h1>
          
          <p className="text-white/90 text-lg md:text-2xl font-light mb-12 tracking-wide max-w-3xl mx-auto leading-relaxed">
            Experience the harmony of Sri Lankan heritage and modern luxury. <br className="hidden md:block" /> Bespoke designs handcrafted for your sanctuary.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="#projects"
              className="px-10 py-5 bg-[#BFA57A] text-white font-bold tracking-[0.2em] hover:bg-[#2C2C2C] transition-all duration-500 transform hover:-translate-y-2 shadow-2xl uppercase text-sm"
            >
              VIEW PROJECTS
            </a>
            <a 
              href="#contact"
              className="px-10 py-5 border-2 border-white text-white font-bold tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-500 transform hover:-translate-y-2 uppercase text-sm"
            >
              CONTACT US
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hidden md:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
