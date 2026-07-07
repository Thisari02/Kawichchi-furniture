import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

const SectionProgress: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 110,
    damping: prefersReducedMotion ? 80 : 30,
    restDelta: 0.001,
  });

  return <motion.div aria-hidden className="section-progress" style={{ scaleX }} />;
};

export default SectionProgress;
