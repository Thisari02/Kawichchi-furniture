
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import About from './components/About';
import Craftsmanship from './components/Craftsmanship';
import Projects from './components/Projects';
import ProjectsPage from './src/pages/Projects';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './src/pages/AdminPanel';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import ScrollToTop from './components/ScrollToTop';
import SectionProgress from './components/SectionProgress';
import LuxuryCursor from './components/LuxuryCursor';

const Hero = React.lazy(() => import('./components/Hero'));
const VideoShowcase = React.lazy(() => import('./components/VideoShowcase'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Contact = React.lazy(() => import('./components/Contact'));
const Factory = React.lazy(() => import('./components/Factory'));
const TrustedStats = React.lazy(() => import('./components/TrustedStats'));
const RoomSelector = React.lazy(() => import('./components/RoomSelector'));
const WhyKawichchi = React.lazy(() => import('./components/WhyKawichchi'));
const MaterialLibrary = React.lazy(() => import('./components/MaterialLibrary'));
const ConsultationCTA = React.lazy(() => import('./components/ConsultationCTA'));
const ProcessTimeline = React.lazy(() => import('./components/ProcessTimeline'));
const PartnersSection = React.lazy(() => import('./components/PartnersSection'));

// Home page component with all sections
const HomePage: React.FC = () => (
  <React.Suspense fallback={<div className="min-h-screen" aria-hidden />}>
    <Hero />
    <TrustedStats />
    <Projects />
    <RoomSelector />
    <VideoShowcase />
    <Factory />
    <MaterialLibrary />
    <WhyKawichchi />
    <PartnersSection />
    <Testimonials />
    <ConsultationCTA />
    <Contact />
  </React.Suspense>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <React.Suspense fallback={<div className="min-h-[50vh]" aria-hidden />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<><About /><Contact /></>} />
            <Route path="/craftsmanship" element={<><Craftsmanship /><ProcessTimeline /><ConsultationCTA /></>} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/showcase" element={<VideoShowcase />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/workshop" element={<Factory />} />
          </Routes>
        </React.Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

type ThemeMode = 'dark' | 'light' | 'auto';
type ResolvedTheme = 'dark' | 'light';

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('kawichchi-theme-mode');
    if (stored === 'dark' || stored === 'light' || stored === 'auto') {
      return stored;
    }
    return 'auto';
  });
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const applySystemTheme = () => setSystemTheme(media.matches ? 'light' : 'dark');

    applySystemTheme();
    media.addEventListener('change', applySystemTheme);

    return () => media.removeEventListener('change', applySystemTheme);
  }, []);

  const resolvedTheme: ResolvedTheme = themeMode === 'auto' ? systemTheme : themeMode;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem('kawichchi-theme-mode', themeMode);

    const timer = window.setTimeout(() => {
      root.classList.remove('theme-switching');
    }, 320);

    return () => window.clearTimeout(timer);
  }, [themeMode, resolvedTheme]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'auto';
      return 'dark';
    });
  };

  return (
    <Router>
      <main className="min-h-screen selection:bg-[#D4AF37] selection:text-black">
        <SectionProgress />
        <LuxuryCursor />
        <Navbar
          themeMode={themeMode}
          resolvedTheme={resolvedTheme}
          onToggleTheme={handleToggleTheme}
          onSetThemeMode={setThemeMode}
        />
        <AnimatedRoutes />
        <Footer />
        <WhatsAppFab />
        <ScrollToTop />
      </main>
    </Router>
  );
};

export default App;
