import { addProject } from '../../lib/projectService';
import type { Project } from '../../types';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const project: Project = req.body;
      if (!project.id || !project.title || !project.category || !project.subcategory) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const result = await addProject(project);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end('Method Not Allowed');
}
