import { addProject } from '../../lib/projectService';
import type { Project } from '../../types';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const project: Project = {
        ...req.body,
        id: Number(req.body.id ?? Date.now()),
        subcategory: req.body.subCategory || req.body.subcategory || '',
        subCategory: req.body.subCategory || req.body.subcategory || '',
        subType: req.body.subType || '',
        images: Array.isArray(req.body.images) ? req.body.images : [],
        imageUrl: req.body.imageUrl || req.body.images?.[0] || '',
        location: req.body.location || 'Sri Lanka',
        materials: Array.isArray(req.body.materials) ? req.body.materials : (req.body.customizationNote ? ['Custom Design'] : []),
        portfolio: Array.isArray(req.body.portfolio) ? req.body.portfolio : (Array.isArray(req.body.images) ? req.body.images : []),
        description: req.body.description || '',
        customizationNote: req.body.customizationNote || '',
      };

      if (!project.title || !project.category || !project.subCategory || !project.subType) {
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
