import { useMemo, useState } from 'react';
import { categories } from '../data/categories';
import type { Project } from '../types/project';

interface Props {
  projects: Project[];
}

export default function ProjectGallery({ projects }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedSubType, setSelectedSubType] = useState<string>('');

  const subCategories = categories.find((c) => c.name === selectedCategory)?.subCategories || [];
  const subTypes = subCategories.find((s) => s.name === selectedSubCategory)?.subTypes || [];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      return (
        (!selectedCategory || p.category === selectedCategory) &&
        (!selectedSubCategory || p.subCategory === selectedSubCategory) &&
        (!selectedSubType || p.subType === selectedSubType)
      );
    });
  }, [projects, selectedCategory, selectedSubCategory, selectedSubType]);

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setSelectedCategory(cat.name);
              setSelectedSubCategory('');
              setSelectedSubType('');
            }}
            className={`rounded border px-3 py-1 ${selectedCategory === cat.name ? 'bg-black text-gold' : ''}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mb-4 flex flex-wrap gap-2">
          {subCategories.map((sub) => (
            <button
              key={sub.name}
              onClick={() => {
                setSelectedSubCategory(sub.name);
                setSelectedSubType('');
              }}
              className={`rounded border px-3 py-1 ${selectedSubCategory === sub.name ? 'bg-black text-gold' : ''}`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {selectedSubCategory && (
        <div className="mb-4 flex flex-wrap gap-2">
          {subTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedSubType(type)}
              className={`rounded border px-3 py-1 ${selectedSubType === type ? 'bg-black text-gold' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="rounded border p-2 shadow">
            <img src={project.images?.[0]} className="h-48 w-full rounded object-cover" />
            <h3 className="mt-2 font-bold">{project.title}</h3>
            <p className="text-sm text-gray-500">
              {project.category} → {project.subCategory} → {project.subType}
            </p>
            {project.customizationNote && (
              <p className="mt-1 text-sm text-gold">✨ {project.customizationNote}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
