import { PROJECTS } from '../constants';
import type { Project } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_BASE || '';

function normalizeProject(project: any): Project {
  const { _id, ...rest } = project;
  return rest as Project;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE}/api/projects`);
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

export async function fetchProjectById(id: number): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE}/api/projects/${id}`);
    if (!response.ok) {
      throw new Error(`Project API returned ${response.status}`);
    }
    return normalizeProject(await response.json());
  } catch (error) {
    console.warn(`Failed to load project ${id} from API, using local fallback.`, error);
    return PROJECTS.find((project) => project.id === id) ?? null;
  }
}
