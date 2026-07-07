import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const MagneticButton: React.FC<Props> = ({ children, className = '', ...props }) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <motion.button
      ref={ref}
      className={`lux-button ${className}`}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
