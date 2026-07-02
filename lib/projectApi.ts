import { PROJECTS } from '../constants';
import type { Project } from '../types';

const configuredApiRoot = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : 'https://kawichchi-furniture.onrender.com');
const API_BASE = configuredApiRoot ? `${configuredApiRoot.replace(/\/$/, '')}/api` : '/api';

function normalizeProject(project: any): Project {
  const images = Array.isArray(project?.images) ? project.images : [];
  const normalizedSubCategory = project?.subCategory || project?.subcategory || '';
  return {
    ...project,
    id: Number(project?.id ?? 0),
    subcategory: normalizedSubCategory,
    subCategory: normalizedSubCategory,
    subType: project?.subType || '',
    imageUrl: project?.imageUrl || images[0] || '',
    location: project?.location || 'Sri Lanka',
    materials: Array.isArray(project?.materials) ? project.materials : (project?.customizationNote ? ['Custom Design'] : []),
    portfolio: Array.isArray(project?.portfolio) ? project.portfolio : images,
    description: project?.description || '',
  } as Project;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE}/projects`);
    if (!response.ok) {
      throw new Error(`Projects API returned ${response.status}`);
    }
    const data = await response.json();
    return (data as any[]).map(normalizeProject);
  } catch (error) {
    console.warn('Failed to load projects from API, using local data.', error);
    return PROJECTS;
  }
}

export async function fetchProjectById(id: String): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE}/projects/${id}`);
    if (!response.ok) {
      throw new Error(`Project API returned ${response.status}`);
    }
    return normalizeProject(await response.json());
  } catch (error) {
    console.warn(`Failed to load project ${id} from API, using local fallback.`, error);
    return PROJECTS.find((project) => project.id.toString() === id.toString()) ?? null;
  }
}
