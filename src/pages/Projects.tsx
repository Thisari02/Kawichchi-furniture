import { useEffect, useState } from 'react';
import ProjectGallery from '../components/ProjectGallery';
import type { Project } from '../types/project';

const configuredApiRoot =
  import.meta.env.VITE_API_URL ||
  'https://kawichchi-furniture.onrender.com';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${configuredApiRoot.replace(/\/$/, '')}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return <ProjectGallery projects={projects} />;
}
