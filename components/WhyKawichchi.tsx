import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Factory, Handshake, Hammer, Home, MapPin, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const points = [
  {
    icon: Hammer,
    stat: '20+',
    title: 'Years of Craftsmanship',
    desc: 'Two decades of artisan-led furniture production for premium homes.',
  },
  {
    icon: Home,
    stat: '100%',
    title: 'Custom-Made Furniture',
    desc: 'Every project is designed and built around your exact space and lifestyle.',
  },
  {
    icon: Factory,
    stat: 'Factory Direct',
    title: 'Manufacturing',
    desc: 'Direct control from timber selection to final finishing in our atelier.',
  },
  {
    icon: ShieldCheck,
    stat: '15-Year',
    title: 'Warranty',
    desc: 'Long-term assurance backed by process-led quality inspection.',
  },
  {
    icon: MapPin,
    stat: 'Made in Moratuwa',
    title: 'Sri Lanka',
    desc: 'Rooted in the nation’s furniture capital with globally inspired detailing.',
  },
  {
    icon: Handshake,
    stat: 'End-to-End',
    title: 'Service',
    desc: 'Design, manufacturing, delivery, and installation under one trusted team.',
  },
];

const WhyKawichchi: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.why-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 72%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-kawichchi" className="section-shell bg-transparent" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="lux-tag mb-4">Why Kawichchi</p>
          <h2 className="text-4xl md:text-5xl lux-section-title">Why Homeowners Choose Kawichchi</h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {points.map((point, index) => (
            <motion.article
              key={point.stat + point.title}
              className="why-card lux-card p-6 md:p-7"
              whileHover={{ y: -4 }}
            >
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--lux-stone)] mb-3">0{index + 1}</p>
              <div className="flex items-center gap-3 mb-3 text-[var(--lux-bronze)]">
                <point.icon size={20} />
                <p className="text-lg font-semibold tracking-[0.06em] text-[var(--lux-text)]">{point.stat}</p>
              </div>
              <h3 className="text-2xl text-[var(--lux-text)] mb-3">{point.title}</h3>
              <p className="text-[var(--lux-text-soft)] leading-relaxed">{point.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKawichchi;
