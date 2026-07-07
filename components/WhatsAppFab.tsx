import React from 'react';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const WhatsAppFab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const defaultText = useMemo(() => {
    if (location.pathname.includes('projects')) {
      return 'Hello Kawichchi, I need details about your recent project portfolio.';
    }
    if (location.pathname.includes('workshop')) {
      return 'Hello Kawichchi, I would like to know about your factory process and timeline.';
    }
    return 'Hello Kawichchi, I would like a design consultation for my interior project.';
  }, [location.pathname]);

  const options = [
    { label: 'Kitchen Enquiry', text: 'Hello Kawichchi, I need a premium kitchen consultation.' },
    { label: 'Wardrobe Enquiry', text: 'Hello Kawichchi, I need a custom wardrobe design consultation.' },
    { label: 'Door Enquiry', text: 'Hello Kawichchi, I need details for custom doors and frames.' },
    { label: 'Window Enquiry', text: 'Hello Kawichchi, I need details for window systems for my project.' },
  ];

  const waLink = (text: string) => `https://wa.me/94715505083?text=${encodeURIComponent(text)}`;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 16, pointerEvents: open ? 'auto' : 'none' }}
        className="mb-3 w-[18rem] md:w-72 rounded-2xl border border-[var(--lux-border)] bg-[var(--lux-glass)] p-3 shadow-2xl backdrop-blur-md"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--lux-text-soft)] mb-2 px-1">Quick Enquiry</p>
        <div className="space-y-2">
          {options.map((item) => (
            <a
              key={item.label}
              href={waLink(item.text)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-white/10 px-3 py-2 text-sm text-[var(--lux-text)] hover:border-[var(--lux-border)] hover:bg-white/10 transition"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>

      <div className="flex items-center gap-2 justify-end">
        <a
          href={waLink(defaultText)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="rounded-full border border-[var(--lux-border)] bg-[var(--lux-glass)] px-4 py-2 text-xs tracking-[0.12em] uppercase text-[var(--lux-text)] hidden md:inline-block"
        >
          Chat Now
        </a>
        <motion.button
          type="button"
          aria-label="Toggle WhatsApp quick enquiry menu"
          onClick={() => setOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center border border-white/20"
          animate={{ boxShadow: ['0 0 0 0 rgba(37, 211, 102, 0.35)', '0 0 0 10px rgba(37, 211, 102, 0)'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={22} />
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppFab;
