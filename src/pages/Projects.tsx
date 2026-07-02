import { useEffect, useState } from 'react';
import ProjectGallery from '../components/ProjectGallery';
import type { Project } from '../types/project';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return <ProjectGallery projects={projects} />;
}
