
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Laptop, Menu, Moon, Sun, X } from 'lucide-react';

type ThemeMode = 'dark' | 'light' | 'auto';
type ResolvedTheme = 'dark' | 'light';

interface NavbarProps {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  onToggleTheme: () => void;
  onSetThemeMode: (mode: ThemeMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ themeMode, resolvedTheme, onToggleTheme, onSetThemeMode }) => {
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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

  const themeLabel =
    themeMode === 'auto'
      ? `Auto (${resolvedTheme})`
      : themeMode === 'dark'
        ? 'Dark'
        : 'Light';

  const ThemeIcon =
    themeMode === 'auto'
      ? Laptop
      : resolvedTheme === 'dark'
        ? Moon
        : Sun;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3'
          : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 2xl:px-0 flex justify-between items-center">
        <div className={`w-full rounded-full border transition-all duration-500 px-3 sm:px-4 md:px-7 ${
          scrolled
            ? 'lux-glass border-[var(--lux-border)] shadow-[0_10px_35px_rgba(0,0,0,0.35)]'
            : 'bg-black/20 border-transparent'
        }`}>
          <div className="py-1.5 md:py-2 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img 
            src="/images/logo.jpeg" 
            alt="Kawichchi Logo" 
            className="brand-logo-clean h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 object-contain"
          />
          <span className="text-xl font-serif font-bold tracking-tight text-[#D4AF37] hidden sm:inline hover:text-[#F5D547] transition-colors">
            Kawichchi
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`transition-all duration-300 relative group text-sm font-semibold tracking-widest uppercase ${
                isActive(link.path)
                  ? 'text-[#D4AF37]'
                  : 'text-[var(--lux-text)] hover:text-[#D4AF37]'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme mode"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--lux-border)] px-3 py-2 text-[#D4AF37] hover:bg-white/10 transition"
          >
            <ThemeIcon size={16} />
            <span className="text-[10px] uppercase tracking-[0.14em] hidden lg:inline">{themeLabel}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#D4AF37] p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        style={{ backgroundColor: 'var(--lux-glass)' }}
        className={`absolute top-full left-0 w-full backdrop-blur-md transition-all duration-500 ease-in-out overflow-hidden md:hidden shadow-2xl border-t border-[var(--lux-border)] ${
          isOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        } ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col py-8 px-6 space-y-6">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-3 rounded-full border border-[var(--lux-border)] px-4 py-2 text-[var(--lux-text)] w-fit"
            aria-label="Toggle theme mode"
          >
            <ThemeIcon size={16} />
            <span className="text-xs uppercase tracking-[0.2em]">
              {themeLabel} Mode
            </span>
          </button>
          <div className="flex flex-wrap gap-2">
            {(['dark', 'light', 'auto'] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onSetThemeMode(mode)}
                className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition ${
                  themeMode === mode
                    ? 'border-[var(--lux-bronze)] bg-[var(--lux-bronze)]/20 text-[var(--lux-text)]'
                    : 'border-[var(--lux-border)] text-[var(--lux-text-soft)] hover:text-[var(--lux-text)]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-serif font-medium transition-colors border-b border-gray-50 pb-2 ${
                isActive(link.path)
                  ? 'text-[#D4AF37]'
                  : 'text-[var(--lux-text)] hover:text-[#D4AF37]'
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
