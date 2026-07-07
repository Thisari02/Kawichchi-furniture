import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Trees, Hammer, Truck } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';

const IconMap: { [key: string]: any } = {
  Compass,
  Trees,
  Hammer,
  Truck
};

const Craftsmanship: React.FC = () => {
  return (
    <section id="craftsmanship" className="section-shell bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="lux-tag mb-4"
          >
            Artistry in Motion
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif mb-6 text-[var(--lux-text)]"
          >
            Our Craftsmanship Process
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-[1px] bg-[#D4AF37]/20 -z-0"></div>
          
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = IconMap[step.icon];
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative flex flex-col items-center px-8 text-center"
              >
                <div className="relative mb-8 w-16 h-16 rounded-full bg-[#1a1e25] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500 z-10 border border-[var(--lux-border)] shadow-lg">
                  {Icon ? <Icon size={24} /> : null}
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2C2C2C] text-white text-[10px] flex items-center justify-center font-bold">
                    0{step.id}
                  </span>
                </div>
                
                <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md border border-[var(--lux-border)]">
                   <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                   />
                </div>

                <h3 className="text-xl font-serif mb-3 text-[var(--lux-text)]">{step.title}</h3>
                <p className="text-sm text-[var(--lux-text-soft)] leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
