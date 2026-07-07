import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type StatItem = {
  label: string;
  value: number;
  suffix: string;
  helper: string;
};

const premiumStats: StatItem[] = [
  { value: 200, suffix: '+', label: 'Completed Projects', helper: 'Residential and commercial completions' },
  { value: 20, suffix: '+', label: 'Years of Experience', helper: 'Craft legacy since early atelier years' },
  { value: 450, suffix: '+', label: 'Custom Furniture Pieces', helper: 'Tailored pieces manufactured in-house' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction', helper: 'Post-installation satisfaction benchmark' },
];

const CountUpStat: React.FC<{
  item: StatItem;
  delay: number;
  active: boolean;
  onActivate: () => void;
}> = ({ item, delay, active, onActivate }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.55 });

  useEffect(() => {
    if (!isInView) return;

    let frameId = 0;
    const duration = 1600;
    const startTime = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < startTime) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = Math.min(now - startTime, duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(item.value * eased));

      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [delay, isInView, item.value]);

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`rounded-2xl border p-5 text-left transition-colors ${
        active
          ? 'border-[#dcb584] bg-[#211b16]'
          : 'border-[var(--lux-border)] bg-[#171a1f]/70'
      }`}
      aria-label={`${item.label}: ${item.value}${item.suffix}`}
    >
      <p className="text-3xl md:text-4xl font-semibold text-[#f4e8d9] leading-none">
        {count}
        {item.suffix}
      </p>
      <p className="mt-3 text-xs tracking-[0.16em] uppercase text-[var(--lux-text-soft)]">{item.label}</p>
    </motion.button>
  );
};

const TrustedStats: React.FC = () => {
  const [activeStat, setActiveStat] = useState(0);

  return (
    <section id="trusted" className="section-shell bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="lux-card p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="lux-tag mb-4">Trusted Company</p>
              <h2 className="lux-section-title text-3xl md:text-5xl leading-tight">A Studio Built on Precision and Trust</h2>
            </div>
            <p className="lux-text-soft max-w-xl text-sm md:text-base leading-relaxed">
              Every project is handled by in-house designers, production engineers, and finishing specialists for a premium end-to-end experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {premiumStats.map((item, idx) => (
              <CountUpStat
                key={item.label}
                item={item}
                delay={idx * 0.08}
                active={activeStat === idx}
                onActivate={() => setActiveStat(idx)}
              />
            ))}
          </div>

          <motion.div
            key={premiumStats[activeStat].label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-xl border border-[var(--lux-border)] bg-[#14181e] px-4 py-3"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--lux-stone)]">Metric Insight</p>
            <p className="mt-2 text-sm text-[var(--lux-text-soft)]">{premiumStats[activeStat].helper}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedStats;
