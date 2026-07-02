import { getProjectById } from '../../lib/projectService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  const { id } = req.query ?? {};
  if (!id) {
    return res.status(400).json({ error: 'Missing project id' });
  }

  try {
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({
      ...project,
      subCategory: project.subCategory || project.subcategory || '',
      subcategory: project.subCategory || project.subcategory || '',
      subType: project.subType || '',
      images: Array.isArray(project.images) ? project.images : [],
      imageUrl: project.imageUrl || project.images?.[0] || '',
      materials: Array.isArray(project.materials) ? project.materials : (project.customizationNote ? ['Custom Design'] : []),
      portfolio: Array.isArray(project.portfolio) ? project.portfolio : (Array.isArray(project.images) ? project.images : []),
      description: project.description || '',
      customizationNote: project.customizationNote || '',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load project' });
  }
}
