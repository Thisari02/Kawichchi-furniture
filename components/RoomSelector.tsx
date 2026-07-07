import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const rooms = [
  {
    key: 'kitchen',
    title: 'Kitchen',
    detail: 'Hand-finished modular systems in walnut, matte lacquer, and engineered stone.',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1400&auto=format&fit=crop',
  },
  {
    key: 'bedroom',
    title: 'Bedroom',
    detail: 'Serene wardrobes and bed systems tailored to storage flow and daily rituals.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop',
  },
  {
    key: 'living',
    title: 'Living',
    detail: 'Statement seating, wall units, and media compositions balancing warmth and geometry.',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
  },
  {
    key: 'dining',
    title: 'Dining',
    detail: 'Sculpted dining suites with durable premium finishes for hospitality-grade use.',
    image:
      'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1400&auto=format&fit=crop',
  },
  {
    key: 'office',
    title: 'Office',
    detail: 'Executive workspaces with integrated cable management and acoustic-minded forms.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop',
  },
  {
    key: 'doors',
    title: 'Doors',
    detail: 'Architectural doors with precision joinery, concealed hinges, and custom veneer matching.',
    image:
      'https://images.unsplash.com/photo-1617098474202-0d0d7f60f4f3?q=80&w=1400&auto=format&fit=crop',
  },
  {
    key: 'windows',
    title: 'Windows',
    detail: 'Premium frame systems engineered for light quality, ventilation, and long-term durability.',
    image:
      'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?q=80&w=1400&auto=format&fit=crop',
  },
] as const;

const RoomSelector: React.FC = () => {
  const [active, setActive] = useState<(typeof rooms)[number]['key']>('kitchen');
  const selected = useMemo(() => rooms.find((room) => room.key === active) || rooms[0], [active]);

  return (
    <section id="room-selector" className="section-shell bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="lux-tag mb-4">Interactive Room Selector</p>
          <h2 className="lux-section-title text-4xl md:text-5xl">Compose By Space</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 lux-card p-5 md:p-6">
            <div className="grid grid-cols-2 gap-3">
              {rooms.map((room) => {
                const isActive = active === room.key;
                return (
                  <button
                    key={room.key}
                    onClick={() => setActive(room.key)}
                    className={`rounded-xl border px-3 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-[var(--lux-bronze)] bg-[var(--lux-bronze)]/16 text-[var(--lux-text)]'
                        : 'border-[var(--lux-border)] bg-[var(--lux-bg-elevated)] text-[var(--lux-text-soft)] hover:border-[var(--lux-bronze)]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="text-sm tracking-wide uppercase">{room.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 lux-card overflow-hidden relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={selected.image}
                  alt={`${selected.title} inspiration`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/60" />
                <div className="absolute bottom-0 p-6 md:p-8">
                  <h3 className="text-3xl md:text-4xl text-[var(--lux-text)]">{selected.title}</h3>
                  <p className="mt-3 max-w-xl text-[var(--lux-text)]/90 leading-relaxed">{selected.detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomSelector;
