import type { Project } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function createProject(project: Project): Promise<Project> {
  const response = await fetch(`${API_BASE}/api/admin/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error(`Failed to create project: ${response.statusText}`);
  }

  return response.json();
}

export async function updateProjectData(id: number, updates: Partial<Project>): Promise<Project> {
  const response = await fetch(`${API_BASE}/api/admin/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update project: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteProjectData(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/api/admin/projects/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete project: ${response.statusText}`);
  }
}
