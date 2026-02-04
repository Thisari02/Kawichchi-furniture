import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Scroll to top"
          className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full bg-[#2C2C2C] text-[#BFA57A] shadow-xl flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          whileHover={{ y: -2 }}
        >
          <motion.span whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <ArrowUp size={18} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
