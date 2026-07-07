import type { Project } from '../types';
import { getApiBase } from './apiBase';

const PROJECTS_FALLBACK: Project[] = [];

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
    const response = await fetch(`${getApiBase('/api')}/projects`);
    if (!response.ok) {
      throw new Error(`Projects API returned ${response.status}`);
    }
    const data = await response.json();
    return (data as any[]).map(normalizeProject);
  } catch (error) {
    console.warn('Failed to load projects from API, using local data.', error);
    return PROJECTS_FALLBACK;
  }
}

export async function fetchProjectById(id: String): Promise<Project | null> {
  try {
    const response = await fetch(`${getApiBase('/api')}/projects/${id}`);
    if (!response.ok) {
      throw new Error(`Project API returned ${response.status}`);
    }
    return normalizeProject(await response.json());
  } catch (error) {
    console.warn(`Failed to load project ${id} from API, using local fallback.`, error);
    return PROJECTS_FALLBACK.find((project) => project.id.toString() === id.toString()) ?? null;
  }
}
