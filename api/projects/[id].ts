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

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load project' });
  }
}
