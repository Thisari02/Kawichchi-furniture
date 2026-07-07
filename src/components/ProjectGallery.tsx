import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categories } from '../data/categories';
import type { Project } from '../types/project';
import {
  premiumButton,
  premiumActive,
  premiumCard,
  premiumCardBorder,
  premiumCardImage,
  premiumCardOverlay,
  premiumCardBadge,
  premiumCardTitle,
  premiumCardMeta,
  premiumCardLocation,
  premiumCardDescription,
  premiumCardNote,
  premiumCardAction,
  premiumCardImageCount,
} from '../styles/premium';

interface Props {
  projects: Project[];
}

export default function ProjectGallery({ projects }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedSubType, setSelectedSubType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [zoomProjectIndex, setZoomProjectIndex] = useState<number | null>(null);
  const [zoomImageIndex, setZoomImageIndex] = useState<number>(0);

  // FIX: safer category lookup
  const currentCategory = categories.find((c) => c.name === selectedCategory);

  const subCategories = currentCategory?.subCategories || [];

  const currentSubCategory = subCategories.find(
    (s) => s.name === selectedSubCategory
  );

  const subTypes = currentSubCategory?.subTypes || [];

  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.name] = projects.filter((p) => p.category === cat.name).length;
      return acc;
    }, {} as Record<string, number>);
  }, [projects]);

  // FIX: stable filtering logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        !selectedCategory || p.category === selectedCategory;

      const matchSubCategory =
        !selectedSubCategory || p.subCategory === selectedSubCategory;

      const matchSubType =
        !selectedSubType || p.subType === selectedSubType;

      const searchableText = [
        p.title,
        p.category,
        p.subCategory,
        p.subType,
        p.location || '',
        p.description || '',
        p.customizationNote || '',
      ]
        .join(' ')
        .toLowerCase();

      const matchSearch =
        !searchTerm.trim() ||
        searchableText.includes(searchTerm.trim().toLowerCase());

      return matchCategory && matchSubCategory && matchSubType && matchSearch;
    });
  }, [projects, selectedCategory, selectedSubCategory, selectedSubType, searchTerm]);

  const getProjectKey = (project: Project, index: number) =>
    String(project._id || project.id || `${project.title}-${index}`);

  const selectedZoomProject =
    zoomProjectIndex !== null ? filteredProjects[zoomProjectIndex] : null;

  const zoomImages = selectedZoomProject?.images?.length
    ? selectedZoomProject.images
    : [];

  const handleOpenZoom = (projectIndex: number, imageIndex = 0) => {
    setZoomProjectIndex(projectIndex);
    setZoomImageIndex(imageIndex);
  };

  const closeZoom = () => {
    setZoomProjectIndex(null);
    setZoomImageIndex(0);
  };

  const goPrevImage = () => {
    if (!zoomImages.length) return;
    setZoomImageIndex((prev) =>
      prev === 0 ? zoomImages.length - 1 : prev - 1
    );
  };

  const goNextImage = () => {
    if (!zoomImages.length) return;
    setZoomImageIndex((prev) =>
      prev === zoomImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 text-[var(--lux-text)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-8 max-w-7xl rounded-3xl border border-[var(--lux-border)] bg-[var(--lux-surface)]/80 p-5 sm:p-6 shadow-[var(--lux-shadow-soft)] backdrop-blur"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="lux-tag mb-2">Project Library</p>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-wide text-[var(--lux-text)]">
              Live Filter Bar
            </h3>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedSubCategory('');
              setSelectedSubType('');
              setSearchTerm('');
            }}
            className="rounded-full border border-[var(--lux-border)] px-4 py-2 text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition hover:border-[var(--lux-bronze)] hover:text-[var(--lux-bronze)]"
          >
            Clear Filters
          </button>
        </div>

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects, category, subtype..."
          className="mb-5 w-full rounded-full border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 px-4 py-3 text-sm text-[var(--lux-text)] outline-none transition focus:border-[var(--lux-bronze)] focus:ring-2 focus:ring-[var(--lux-bronze)]/30"
        />

        {/* CATEGORY */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedSubCategory('');
              setSelectedSubType('');
            }}
            className={`${premiumButton} ${selectedCategory === '' ? premiumActive : ''}`}
          >
            All
            <span className="ml-2 rounded-full bg-[var(--lux-bronze)]/20 px-2 py-0.5 text-xs text-[var(--lux-text)]">
              {projects.length}
            </span>
          </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setSelectedCategory(cat.name);
              setSelectedSubCategory('');
              setSelectedSubType('');
            }}
            className={`${premiumButton} ${
              selectedCategory === cat.name
                ? premiumActive
                : ''
            }`}
          >
            {cat.name}
            <span className="ml-2 rounded-full bg-[var(--lux-bronze)]/20 px-2 py-0.5 text-xs text-[var(--lux-text)]">
              {categoryCounts[cat.name] || 0}
            </span>
          </button>
        ))}
        </div>

        {/* SUB CATEGORY */}
        {selectedCategory && (
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedSubCategory('');
                setSelectedSubType('');
              }}
              className={`${premiumButton} ${selectedSubCategory === '' ? premiumActive : ''}`}
            >
              All Subcategories
            </button>
            {subCategories.map((sub) => (
              <button
                key={sub.name}
                onClick={() => {
                  setSelectedSubCategory(sub.name);
                  setSelectedSubType('');
                }}
                className={`${premiumButton} ${
                  selectedSubCategory === sub.name
                    ? premiumActive
                    : ''
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}

        {/* SUB TYPE */}
        {selectedSubCategory && (
          <div className="mb-1 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubType('')}
              className={`${premiumButton} ${selectedSubType === '' ? premiumActive : ''}`}
            >
              All Subtypes
            </button>
            {subTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedSubType(type)}
                className={`${premiumButton} ${
                  selectedSubType === type
                    ? premiumActive
                    : ''
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* PROJECT GRID */}
      <motion.div layout className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={getProjectKey(project, index)}
              layout
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -8, scale: 1.005 }}
              className={`${premiumCard} ${premiumCardBorder}`}
            >
              {/* IMAGE */}
              <button
                onClick={() => handleOpenZoom(index, 0)}
                className="group relative block w-full overflow-hidden"
              >
                <img
                  src={project.images?.[0] || '/images/placeholder.jpg'}
                  alt={project.title}
                  loading="lazy"
                  className={premiumCardImage}
                />
                <div className={premiumCardOverlay} />
                <span className={premiumCardBadge}>
                  View Gallery
                </span>
              </button>

              {(project.images?.length || 0) > 1 && (
                <div className="flex gap-2 overflow-x-auto px-4 pt-3">
                  {project.images.slice(0, 6).map((img, thumbIdx) => (
                    <button
                      key={`${img}-${thumbIdx}`}
                      type="button"
                      onClick={() => handleOpenZoom(index, thumbIdx)}
                      className="h-12 w-16 flex-none overflow-hidden rounded border border-[var(--lux-border)] transition hover:border-[var(--lux-bronze)]"
                    >
                      <img
                        src={img}
                        alt={`${project.title}-thumb-${thumbIdx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-5">
                <h3 className={premiumCardTitle}>{project.title}</h3>

                <p className={premiumCardMeta}>
                  {project.category} • {project.subCategory} • {project.subType}
                </p>

                <p className={premiumCardLocation}>
                  Location: {project.location || 'Not specified'}
                </p>

                {project.description && (
                  <p className={premiumCardDescription}>
                    {project.description}
                  </p>
                )}

                {project.customizationNote && (
                  <p className={premiumCardNote}>
                    ✨ {project.customizationNote}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenZoom(index, 0)}
                    className={premiumCardAction}
                  >
                    Explore
                  </button>
                  <span className={premiumCardImageCount}>
                    {project.images?.length || 0} images
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="mx-auto mt-8 max-w-7xl rounded-2xl border border-[var(--lux-border)] bg-[var(--lux-surface)]/70 p-8 text-center">
          <p className="text-lg text-[var(--lux-text)]">No matching projects found.</p>
          <p className="text-sm text-[var(--lux-text-soft)] mt-2">Try clearing filters or broadening your search.</p>
        </div>
      )}

      <AnimatePresence>
        {selectedZoomProject && zoomImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={closeZoom}
          >
            <motion.div
              initial={{ scale: 0.97, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[var(--lux-border)] bg-black">
                <img
                  src={zoomImages[zoomImageIndex]}
                  alt={selectedZoomProject.title}
                  className="h-[70vh] w-full object-contain"
                />

                <button
                  onClick={closeZoom}
                  className="absolute right-4 top-4 rounded-full border border-[var(--lux-border)] bg-black/60 px-3 py-1 text-sm text-white"
                >
                  Close
                </button>

                {zoomImages.length > 1 && (
                  <>
                    <button
                      onClick={goPrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-[var(--lux-border)] bg-black/60 px-3 py-2 text-white"
                    >
                      ‹
                    </button>
                    <button
                      onClick={goNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[var(--lux-border)] bg-black/60 px-3 py-2 text-white"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {zoomImages.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {zoomImages.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      onClick={() => setZoomImageIndex(idx)}
                      className={`h-16 w-24 flex-none overflow-hidden rounded-md border transition ${
                        zoomImageIndex === idx
                          ? 'border-[#D4AF37]'
                          : 'border-white/20'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}