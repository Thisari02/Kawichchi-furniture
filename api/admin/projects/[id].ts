import { updateProject, deleteProject } from '../../../lib/projectService';

export default async function handler(req: any, res: any) {
  const { id } = req.query ?? {};

  if (!id) {
    return res.status(400).json({ error: 'Missing project id' });
  }

  if (req.method === 'PUT') {
    try {
      const updates = req.body;
      const numId = Number(id);
      const result = await updateProject(numId, updates);
      if (!result) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update project' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const numId = Number(id);
      await deleteProject(numId);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete project' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end('Method Not Allowed');
}
