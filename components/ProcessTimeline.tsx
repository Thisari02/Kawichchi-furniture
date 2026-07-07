import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const steps = [
  'Inquiry',
  'Consultation',
  'Site Visit',
  'Measurements',
  '3D Design',
  'Material Selection',
  'Manufacturing',
  'Quality Check',
  'Final Finishing',
  'Delivery',
  'Installation',
  'After Sales',
];

const ProcessTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  });

  const filledScaleY = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.35,
  });

  return (
    <section id="process" className="section-shell bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="lux-tag mb-4">Process Page</p>
          <h2 className="text-4xl md:text-5xl lux-section-title">Interactive Production Timeline</h2>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-[var(--lux-border)] -translate-x-1/2" />
          <motion.div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#d7b287] via-[#c89a63] to-transparent -translate-x-1/2 origin-top"
            style={{ scaleY: filledScaleY }}
          />
          <div className="grid md:grid-cols-2 gap-4">
            {steps.map((step, idx) => {
              const right = idx % 2 === 0;

              return (
                <motion.div
                  key={step}
                  className={`relative lux-card p-5 md:p-6 ${right ? 'md:mr-10' : 'md:ml-10'}`}
                  initial={{ opacity: 0, x: right ? -34 : 34, y: 16 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.58, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                >
                  <span
                    aria-hidden
                    className={`hidden md:block absolute top-7 h-[1px] w-10 bg-[var(--lux-border)] ${
                      right ? '-right-10' : '-left-10'
                    }`}
                  />
                  <motion.span
                    aria-hidden
                    className={`hidden md:block absolute top-5 h-4 w-4 rounded-full border border-[#d8b07f] bg-[#1b1713] shadow-[0_0_18px_rgba(200,154,99,0.35)] ${
                      right ? '-right-[46px]' : '-left-[46px]'
                    }`}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.12, ease: 'easeInOut' }}
                  />
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--lux-stone)] mb-2">Step {idx + 1}</p>
                  <h3 className="text-2xl text-[var(--lux-text)]">{step}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
