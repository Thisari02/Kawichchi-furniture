
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { STATS } from '../constants';

const Counter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const incrementTime = Math.max(duration / end, 16); // ~60fps target

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="text-3xl md:text-4xl font-serif font-bold text-[#BFA57A]">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-[#2C2C2C]/60 mt-1">
        {label}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect: Image moves slightly slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 px-6 bg-[#F5F1EA] overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 items-center">
          
          {/* Left: Image with Parallax & Slide-in */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative z-0"
          >
            <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/5] overflow-hidden shadow-2xl rounded-sm">
              <motion.img 
                style={{ y: imageY }}
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1470&auto=format&fit=crop" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </motion.div>

          {/* Right: Overlapping Text Card with Slide-in */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:-ml-20 mt-[-40px] lg:mt-32 z-10 relative"
          >
            <div className="bg-white p-8 md:p-16 shadow-2xl rounded-sm border border-[#F5F1EA]">
              <h4 className="text-[#BFA57A] font-medium tracking-[0.4em] uppercase text-xs mb-6">Our Heritage</h4>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">About Kawichchi</h2>
              <p className="italic text-xl text-[#2C2C2C]/70 mb-10 font-serif leading-relaxed">
                "We don't just build furniture; we curate the soul of your living space."
              </p>
              <p className="text-[#2C2C2C]/80 leading-relaxed mb-12 text-lg">
                Born in the heart of Sri Lanka, Kawichchi represents the pinnacle of bespoke craftsmanship. Every piece is an intersection of traditional woodcarving techniques and contemporary design philosophies. We source the finest sustainably harvested timber to ensure that each creation is a legacy piece.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-10 border-t border-[#F5F1EA]">
                {STATS.map((stat, idx) => (
                  <Counter key={idx} {...stat} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
