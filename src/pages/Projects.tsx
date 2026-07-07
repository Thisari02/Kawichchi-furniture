import { useEffect, useState } from 'react';
import ProjectGallery from '../components/ProjectGallery';
import type { Project } from '../types/project';

const configuredApiRoot =
  import.meta.env.VITE_API_URL ||
  'https://kawichchi-furniture.onrender.com';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${configuredApiRoot.replace(/\/$/, '')}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl mb-8 grid md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="lux-card overflow-hidden">
              <div className="skeleton h-56" />
              <div className="p-4 space-y-3">
                <div className="skeleton h-4 rounded" />
                <div className="skeleton h-4 rounded w-3/4" />
                <div className="skeleton h-10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <ProjectGallery projects={projects} />;
}
