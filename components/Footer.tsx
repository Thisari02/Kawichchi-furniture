
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c0e11] text-white py-16 px-6 border-t border-[var(--lux-border)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-5">
            <img
              src="/images/logo.jpeg"
              alt="Kawichchi transparent logo"
              className="brand-logo-clean h-20 w-20 sm:h-24 sm:w-24 object-contain"
              loading="lazy"
            />
            <div>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#f5ecde]">Kawichchi</h2>
            <p className="text-white/55 mt-2 text-sm tracking-[0.22em] uppercase">Luxury Interior Furniture Atelier</p>
            </div>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/kawichchi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#c89a63] hover:border-[#c89a63] transition-all duration-300"
              aria-label="Visit our Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.tiktok.com/@kawichchi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#c89a63] hover:border-[#c89a63] transition-all duration-300"
              aria-label="Visit our TikTok"
            >
              <Music size={18} />
            </a>
            <a 
              href="https://www.facebook.com/kawichchi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#c89a63] hover:border-[#c89a63] transition-all duration-300"
              aria-label="Visit our Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#c89a63] hover:border-[#c89a63] transition-all duration-300"
              aria-label="Visit our LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50"
        >
          <p>© {new Date().getFullYear()} Kawichchi Furniture. All Rights Reserved. Solution by Thisari Siriwardana.</p>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <span aria-hidden="true"></span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
