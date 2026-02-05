
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Craftsmanship from './components/Craftsmanship';
import Projects from './components/Projects';
import VideoShowcase from './components/VideoShowcase';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Factory from './components/Factory';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <main className="min-h-screen selection:bg-[#BFA57A] selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Craftsmanship />
      <Projects />
      <VideoShowcase />
      <Testimonials />
      <Contact />
      <Factory />
      <Footer />
      <WhatsAppFab />
      <ScrollToTop />
    </main>
  );
};

export default App;
