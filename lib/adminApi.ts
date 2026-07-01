import type { Project } from '../types';

const configuredApiRoot = import.meta.env.VITE_API_BASE || '';
const API_BASE = configuredApiRoot ? `${configuredApiRoot.replace(/\/$/, '')}/api/admin` : '/api/admin';

export async function createProject(project: Project): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    const body = await response.text();
    let message = response.statusText;
    try {
      const json = JSON.parse(body);
      message = json.error || json.message || body || message;
    } catch {
      message = body || message;
    }
    throw new Error(`Failed to create project: ${message}`);
  }

  return response.json();
}

export async function updateProjectData(projectId: string | number, updates: Partial<Project>): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects/${projectId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const body = await response.text();
    let message = response.statusText;
    try {
      const json = JSON.parse(body);
      message = json.error || json.message || body || message;
    } catch {
      message = body || message;
    }
    throw new Error(`Failed to update project: ${message}`);
  }

  return response.json();
}

export async function deleteProjectData(projectId: string | number): Promise<void> {
  const response = await fetch(`${API_BASE}/projects/${projectId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const body = await response.text();
    let message = response.statusText;
    try {
      const json = JSON.parse(body);
      message = json.error || json.message || body || message;
    } catch {
      message = body || message;
    }
    throw new Error(`Failed to delete project: ${message}`);
  }
}
