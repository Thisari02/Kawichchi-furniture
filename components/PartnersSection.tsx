import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const partners = [
  'Ceylon Residences',
  'Luxe Habitat',
  'Urban Living Group',
  'Sapphire Developments',
  'Oceanfront Villas',
  'Verde Hospitality',
  'Capital Interiors',
  'Skyline Architects',
];

const makeLogoDataUrl = (name: string) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='280' height='120'>
      <rect width='280' height='120' rx='24' fill='#f8f4ed' />
      <text x='30' y='54' font-size='36' font-family='Georgia, serif' fill='#3b3128' letter-spacing='2'>${initials}</text>
      <text x='30' y='86' font-size='16' font-family='Arial, sans-serif' fill='#6e6154' letter-spacing='1.5'>${name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const PartnersSection: React.FC = () => {
  const marqueeItems = useMemo(
    () => [...partners, ...partners].map((name) => ({ name, logo: makeLogoDataUrl(name) })),
    []
  );

  return (
    <section id="partners" className="section-shell bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-8"
        >
          <p className="lux-tag mb-3">Trusted Network</p>
          <h2 className="lux-section-title text-4xl md:text-5xl">Trusted by Our Clients & Partners</h2>
        </motion.div>

        <div className="partner-marquee-wrap">
          <div className="partner-marquee-track">
            {marqueeItems.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="partner-logo-card">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  className="partner-logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
