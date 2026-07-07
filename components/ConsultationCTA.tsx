import React from 'react';
import { CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ConsultationCTA: React.FC = () => {
  return (
    <section id="consultation" className="section-shell-tight bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="lux-card p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="lux-tag mb-4">Consultation</p>
          <h2 className="text-4xl md:text-5xl lux-section-title mb-4">Start Your Signature Interior</h2>
          <p className="lux-text-soft max-w-2xl mx-auto mb-8">
            Book a design consultation to define layout, material palette, functionality, and finishing level for your space.
          </p>

          <a
            href="https://wa.me/94715505083?text=Hello%20Kawichchi%2C%20I%20would%20like%20to%20book%20a%20premium%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book consultation via WhatsApp"
            className="inline-block"
          >
            <MagneticButton className="lux-button-primary inline-flex items-center gap-3 px-8 py-4 font-semibold tracking-[0.18em] uppercase text-sm">
              <CalendarClock size={18} />
              Book Consultation
            </MagneticButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
