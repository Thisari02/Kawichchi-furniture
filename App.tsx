
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import InstagramGallery from './components/InstagramGallery';
import Contact from './components/Contact';
import Factory from './components/Factory';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

const App: React.FC = () => {
  return (
    <main className="min-h-screen selection:bg-[#BFA57A] selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <InstagramGallery />
      <Contact />
      <Factory />
      <Footer />
      <WhatsAppFab />
    </main>
  );
};

export default App;
