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
    <section id="craftsmanship" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#BFA57A] font-medium tracking-[0.4em] uppercase text-xs mb-4"
          >
            Artistry in Motion
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Our Craftsmanship Process
          </motion.h2>
          <div className="w-24 h-1 bg-[#BFA57A] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-[1px] bg-[#BFA57A]/20 -z-0"></div>
          
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
                <div className="relative mb-8 w-16 h-16 rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#BFA57A] group-hover:bg-[#BFA57A] group-hover:text-white transition-all duration-500 z-10 border-4 border-white shadow-lg">
                  {Icon ? <Icon size={24} /> : null}
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2C2C2C] text-white text-[10px] flex items-center justify-center font-bold">
                    0{step.id}
                  </span>
                </div>
                
                <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-sm shadow-md">
                   <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                   />
                </div>

                <h3 className="text-xl font-serif mb-3 text-[#2C2C2C]">{step.title}</h3>
                <p className="text-sm text-[#2C2C2C]/60 leading-relaxed font-light">
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
