import { getProjects } from '../lib/projectService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const projects = await getProjects();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load projects' });
  }
}
