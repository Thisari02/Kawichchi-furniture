
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Craftsmanship from './components/Craftsmanship';
import Projects from './components/Projects';
import ProjectsPage from './src/pages/Projects';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './src/pages/AdminPanel';
import VideoShowcase from './components/VideoShowcase';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Factory from './components/Factory';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import ScrollToTop from './components/ScrollToTop';

// Home page component with all sections
const HomePage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Craftsmanship />
    <Projects />
    <VideoShowcase />
    <Testimonials />
    <Contact />
    <Factory />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <main className="min-h-screen selection:bg-[#D4AF37] selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<><About /><Contact /></>} />
          <Route path="/craftsmanship" element={<><Craftsmanship /><Projects /></>} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/showcase" element={<VideoShowcase />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workshop" element={<Factory />} />
        </Routes>
        <Footer />
        <WhatsAppFab />
        <ScrollToTop />
      </main>
    </Router>
  );
};

export default App;
