
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Mail, MapPin, Phone } from 'lucide-react';

const workshopSlides = [
  {
    title: 'Wood Selection',
    description: 'Premium kiln-dried timber is selected by grain consistency, stability, and tone depth.',
    media: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Measurements',
    description: 'Site-level precision mapping ensures furniture fitment with architectural alignment.',
    media: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Design',
    description: 'Our studio translates your requirement into detailed premium production drawings.',
    media: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Cutting',
    description: 'Optimized CNC and precision cutting reduce waste and keep every edge immaculate.',
    media: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Assembly',
    description: 'Skilled craftsmen perform controlled assembly with structural and visual inspections.',
    media: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Painting',
    description: 'Premium coating systems are layered for consistency, protection, and luxury texture.',
    media: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Polishing',
    description: 'Final polish enhances tactile smoothness and highlights the natural depth of materials.',
    media: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Quality Inspection',
    description: 'Multi-point checks verify dimensions, finish, movement, and long-term durability.',
    media: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1800&auto=format&fit=crop',
  },
  {
    title: 'Installation',
    description: 'Our team completes site installation and handover with final detailing adjustments.',
    media: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
  },
];

const Factory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % workshopSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? workshopSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % workshopSlides.length);
  };

  const currentSlide = workshopSlides[activeIndex];

  return (
    <section id="factory" className="section-shell px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="lux-tag mb-4">Factory Experience</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 lux-section-title">Workshop Transparency</h2>
          <p className="text-[var(--lux-text-soft)] max-w-3xl mx-auto leading-relaxed">
            Step inside our Moratuwa production floor where master artisans craft every joint, veneer, and finish with uncompromising precision.
          </p>
        </div>

        <motion.div
          className="lux-card overflow-hidden mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="relative">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -65) nextSlide();
                if (info.offset.x > 65) prevSlide();
              }}
              className="relative"
            >
              <img
                src={currentSlide.media}
                alt={currentSlide.title}
                loading="lazy"
                className="w-full h-[320px] md:h-[430px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/65" />
              <div className="absolute left-5 md:left-8 bottom-6 md:bottom-8 max-w-xl">
                <p className="text-[var(--lux-bronze)] text-xs uppercase tracking-[0.26em] mb-3">
                  {String(activeIndex + 1).padStart(2, '0')}
                </p>
                <h3 className="text-3xl md:text-5xl text-white mb-3">{currentSlide.title}</h3>
                <p className="text-white/85 text-sm md:text-base leading-relaxed">{currentSlide.description}</p>
              </div>
            </motion.div>

            <div className="absolute right-4 md:right-6 top-4 md:top-6 hidden md:flex gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous workshop process"
                className="h-10 w-10 rounded-full border border-white/30 bg-black/35 text-white flex items-center justify-center hover:bg-black/50 transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next workshop process"
                className="h-10 w-10 rounded-full border border-white/30 bg-black/35 text-white flex items-center justify-center hover:bg-black/50 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-1.5">
              {workshopSlides.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? 'w-7 bg-[var(--lux-bronze)]' : 'w-3 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-3xl font-serif mb-4">Moratuwa Production Atelier</h3>
              <p className="text-[var(--lux-text-soft)] leading-relaxed">
                From raw timber to polished masterpiece, each stage is documented, inspected, and refined by our in-house specialists.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Location</h4>
                  <p className="text-[var(--lux-text-soft)]">No. 324 De Soysa Rd, Moratuwa 10400, Sri Lanka</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Phone</h4>
                  <p className="text-[var(--lux-text-soft)]">071 550 5083</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Email</h4>
                  <p className="text-[var(--lux-text-soft)]">hello@kawichchi.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Hours</h4>
                  <p className="text-[var(--lux-text-soft)]">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 h-[450px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-1000 md:grayscale md:hover:grayscale-0 border border-[var(--lux-border)]">
            <iframe 
              src="https://www.google.com/maps?q=Kawichchi%20by%20Siriwardana%20(Pvt)%20Ltd%2C%20No.%20324%20De%20Soysa%20Rd%2C%20Moratuwa%2010400&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Factory;
