
import React from 'react';
import { Instagram, Facebook, Linkedin, ArrowUp, Music } from 'lucide-react';

const Footer: React.FC = () => {
  /**
   * Triggers a smooth scroll to the absolute top of the viewport.
   * This works in conjunction with CSS 'scroll-behavior: smooth' for 
   * a perfectly fluid transition.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#2C2C2C] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-tight">Kawichchi</h2>
            <p className="text-white/40 mt-2 text-sm tracking-widest uppercase">Premium Furniture Craftsmanship</p>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/kawichchi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
              aria-label="Visit our Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.tiktok.com/@kawichchi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
              aria-label="Visit our TikTok"
            >
              <Music size={18} />
            </a>
            <a 
              href="https://www.facebook.com/kawichchi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
              aria-label="Visit our Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
              aria-label="Visit our LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Kawichchi Furniture. All Rights Reserved. Solution by Thisari Siriwardana.</p>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <span aria-hidden="true"></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
