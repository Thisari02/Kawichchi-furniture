import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config({ path: '.env.local' });

const { getProjects, getProjectById, addProject, updateProject, deleteProject } = await import(
  './lib/projectService.ts'
);

const app = express();
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await getProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ error: 'Failed to load project' });
  }
});

app.get('/api/admin/projects', async (req, res) => {
  try {
    const projects = await getProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    return res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.post('/api/admin/projects', async (req, res) => {
  try {
    const project = req.body;
    if (!project || !project.title || !project.category || !project.subCategory || !project.subType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingProjects = await getProjects();
    const duplicate = existingProjects.find(
      (item) =>
        String(item.title || '').trim().toLowerCase() === String(project.title || '').trim().toLowerCase() &&
        String(item.category || '').trim().toLowerCase() === String(project.category || '').trim().toLowerCase() &&
        String(item.subCategory || '').trim().toLowerCase() === String(project.subCategory || '').trim().toLowerCase() &&
        String(item.subType || '').trim().toLowerCase() === String(project.subType || '').trim().toLowerCase()
    );

    if (duplicate) {
      return res.status(409).json({ error: 'A similar project already exists.' });
    }

    const normalizedProject = {
      ...project,
      id: project.id ?? Date.now(),
      images: Array.isArray(project.images) ? project.images : [],
      description: project.description ?? '',
      customizationNote: project.customizationNote ?? '',
    };

    const createdProject = await addProject(normalizedProject);
    return res.status(201).json(createdProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create project' });
  }
});

app.put('/api/admin/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project id' });
    }
    const updated = await updateProject(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update project' });
  }
});

app.delete('/api/admin/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project id' });
    }
    await deleteProject(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ error: 'Failed to delete project' });
  }
});

const port = Number(process.env.API_PORT || 4000);
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
