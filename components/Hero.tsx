
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const FloatingWoodScene = React.lazy(() => import('./scene/FloatingWoodScene'));

const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden pt-16 sm:pt-20 md:pt-24">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="https://cdn.coverr.co/videos/coverr-wooden-architecture-interior-8257/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-[#1a120a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,154,99,0.2),transparent_36%)]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="lux-tag mb-4">Kawichchi Interior Atelier</p>
          <h1 className="text-[var(--lux-text)] text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-serif mb-6 md:mb-7 leading-[1.05]">
            Crafted Interiors for
            <br className="hidden md:block" /> Timeless Living
          </h1>

          <p className="text-[var(--lux-text)]/90 text-base sm:text-lg md:text-xl xl:text-2xl font-light mb-8 md:mb-11 tracking-wide max-w-3xl leading-relaxed">
            A premium furniture and interior architecture experience blending Sri Lankan craftsmanship with global luxury sensibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center w-full sm:w-auto">
            <a href="#projects" aria-label="Explore featured projects">
              <MagneticButton className="lux-button-primary w-full sm:w-auto px-7 md:px-8 py-3.5 md:py-4 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
                View Projects
              </MagneticButton>
            </a>

            <a href="#consultation" aria-label="Book design consultation">
              <MagneticButton className="lux-button-ghost w-full sm:w-auto px-7 md:px-8 py-3.5 md:py-4 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
                Book Consultation
              </MagneticButton>
            </a>
          </div>
        </motion.div>
      </div>

      {!prefersReducedMotion && (
        <React.Suspense
          fallback={
            <div className="absolute right-[6%] bottom-[10%] hidden lg:block w-[220px] h-[220px] rounded-full border border-[var(--lux-border)] bg-[var(--lux-surface)]/25 backdrop-blur-sm" />
          }
        >
          <FloatingWoodScene />
        </React.Suspense>
      )}

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--lux-text)]/50 hidden md:block"
        aria-hidden
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
