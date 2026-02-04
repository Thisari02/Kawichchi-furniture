import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const WhatsAppFab: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/94715505083"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center"
      animate={{ boxShadow: ['0 0 0 0 rgba(37, 211, 102, 0.4)', '0 0 0 12px rgba(37, 211, 102, 0)'] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageSquare size={22} />
    </motion.a>
  );
};

export default WhatsAppFab;
