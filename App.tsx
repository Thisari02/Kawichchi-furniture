
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Factory from './components/Factory';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="min-h-screen selection:bg-[#BFA57A] selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Factory />
      <Footer />
    </main>
  );
};

export default App;
