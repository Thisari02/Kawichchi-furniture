
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-shell px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="lux-tag mb-4">Connect</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 lux-section-title">Connect With Our Design Team</h2>
          <p className="text-[var(--lux-text-soft)]">Discuss your custom project with our master designers.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lux-card p-8 md:p-12"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--lux-text-soft)] mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full border-b border-white/20 py-3 focus:outline-none focus:border-[var(--lux-bronze)] transition-colors bg-transparent text-[var(--lux-text)]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--lux-text-soft)] mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border-b border-white/20 py-3 focus:outline-none focus:border-[var(--lux-bronze)] transition-colors bg-transparent text-[var(--lux-text)]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--lux-text-soft)] mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full border-b border-white/20 py-3 focus:outline-none focus:border-[var(--lux-bronze)] transition-colors bg-transparent resize-none text-[var(--lux-text)]"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button 
                type="button"
                className="w-full py-4 bg-[var(--lux-bronze)] text-black tracking-[0.2em] font-medium hover:bg-[#dab27f] transition-all duration-300 flex items-center justify-center gap-2 uppercase text-sm rounded-full"
              >
                <Send size={18} /> SEND MESSAGE
              </button>
            </form>
          </motion.div>

          {/* Right: Quick CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div className="relative h-64 lg:h-full rounded-sm overflow-hidden mb-6 group">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1470&auto=format&fit=crop" 
                alt="Showroom" 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <a 
              href="https://wa.me/94715505083"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white py-6 px-8 rounded-sm shadow-lg flex items-center justify-center gap-4 hover:bg-[#1fb356] transition-all transform hover:-translate-y-1"
            >
              <MessageSquare size={24} />
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest opacity-80">Quick Chat</p>
                <p className="text-lg font-bold">Chat with us on WhatsApp</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
