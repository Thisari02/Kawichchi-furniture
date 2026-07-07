import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const LuxuryCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="cursor-ring"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 24, stiffness: 180, mass: 0.15 }}
      />
      <motion.div
        className="cursor-dot"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
};

export default LuxuryCursor;
