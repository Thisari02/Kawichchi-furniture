
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Craftsmanship', path: '/craftsmanship' },
    { name: 'Projects', path: '/projects' },
    { name: 'Showcase', path: '/showcase' },
    { name: 'Contact', path: '/contact' },
    { name: 'Workshop', path: '/workshop' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-serif font-bold tracking-tight text-[#2C2C2C] hover:text-[#BFA57A] transition-colors"
        >
          Kawichchi
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`transition-all duration-300 relative group text-sm font-semibold tracking-widest uppercase ${
                isActive(link.path)
                  ? 'text-[#BFA57A]'
                  : 'text-[#2C2C2C] hover:text-[#BFA57A]'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#BFA57A] transition-all duration-300 ${
                isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#2C2C2C] p-2 hover:bg-[#F5F1EA] rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`absolute top-full left-0 w-full bg-white transition-all duration-500 ease-in-out overflow-hidden md:hidden shadow-2xl border-t border-[#F5F1EA] ${
          isOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col py-8 px-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-serif font-medium transition-colors border-b border-gray-50 pb-2 ${
                isActive(link.path)
                  ? 'text-[#BFA57A]'
                  : 'text-[#2C2C2C] hover:text-[#BFA57A]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
