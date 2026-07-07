import type { Project } from '../types';

function normalizeProject(project: any): Project {
  if (!project) return project;
  const { _id, ...rest } = project;
  const images = Array.isArray(rest.images) ? rest.images : [];
  const normalizedSubCategory = rest.subCategory ?? rest.subcategory ?? '';

  return {
    ...rest,
    _id: _id?.toString?.() ?? undefined,
    id: Number(rest.id ?? Date.now()),
    subCategory: normalizedSubCategory,
    subcategory: normalizedSubCategory,
    subType: rest.subType ?? '',
    images,
    imageUrl: rest.imageUrl || images[0] || '',
    location: rest.location || 'Sri Lanka',
    materials: Array.isArray(rest.materials) ? rest.materials : (rest.customizationNote ? ['Custom Design'] : []),
    description: rest.description ?? '',
    customizationNote: rest.customizationNote ?? '',
    portfolio: Array.isArray(rest.portfolio) ? rest.portfolio : images,
  };
}

// Use in-memory storage for development
let projectsData: Project[] = [];

// MongoDB client - will be null if not available
let client: any = null;
if (process.env.MONGODB_URI) {
  try {
    const mongoModule = await import('./mongo');
    if (mongoModule.default) {
      client = mongoModule.default;
    }
  } catch (error) {
    console.warn('MongoDB not available, using in-memory storage');
  }
}

const useMemoryStorage = !client;
let mongoDisabled = useMemoryStorage;
let mongoDisableLogged = false;
const DATABASE_NAME = process.env.MONGODB_DB_NAME || 'kawichchi';
const COLLECTION_NAME = 'projects';

function disableMongo(error: unknown) {
  mongoDisabled = true;
  if (!mongoDisableLogged) {
    console.warn('MongoDB unavailable, switching to in-memory mode:', error);
    mongoDisableLogged = true;
  }
}

async function getCollection() {
  if (mongoDisabled || !client) {
    return null;
  }

  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    return db.collection(COLLECTION_NAME);
  } catch (error) {
    disableMongo(error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (mongoDisabled) {
    return projectsData;
  }

  const collection = await getCollection();
  if (!collection) {
    return projectsData;
  }

  try {
    const rawProjects = await collection.find().toArray();
    return rawProjects.map(normalizeProject);
  } catch (error) {
    disableMongo(error);
    return projectsData;
  }
}

export async function getProjectById(id: string | number): Promise<Project | null> {
  if (mongoDisabled) {
    return projectsData.find(p => p.id === Number(id)) || null;
  }

  const collection = await getCollection();
  if (!collection) {
    return projectsData.find(p => p.id === Number(id)) || null;
  }

  try {
    const project = await collection.findOne({ id: Number(id) });
    return project ? normalizeProject(project) : null;
  } catch (error) {
    disableMongo(error);
    return projectsData.find(p => p.id === Number(id)) || null;
  }
}

export async function addProject(project: Project): Promise<Project> {
  if (mongoDisabled) {
    projectsData.push(project);
    return project;
  }

  const collection = await getCollection();
  if (!collection) {
    projectsData.push(project);
    return project;
  }

  try {
    const result = await collection.insertOne(project);
    return normalizeProject({ ...project, _id: result.insertedId?.toString?.() });
  } catch (error) {
    disableMongo(error);
    projectsData.push(project);
    return project;
  }
}

export async function updateProject(id: number, project: Partial<Project>): Promise<Project | null> {
  if (mongoDisabled) {
    const index = projectsData.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...projectsData[index], ...project, id };
    projectsData[index] = updated;
    return updated;
  }

  const collection = await getCollection();
  if (!collection) {
    const index = projectsData.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...projectsData[index], ...project, id };
    projectsData[index] = updated;
    return updated;
  }

  try {
    const { _id, id: omittedId, ...updateFields } = project as any;
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { returnDocument: 'after' }
    );
    return result?.value ? normalizeProject(result.value) : null;
  } catch (error) {
    disableMongo(error);
    const index = projectsData.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...projectsData[index], ...project, id };
    projectsData[index] = updated;
    return updated;
  }
}

export async function deleteProject(id: number): Promise<void> {
  if (mongoDisabled) {
    projectsData = projectsData.filter(p => p.id !== id);
    return;
  }

  const collection = await getCollection();
  if (!collection) {
    projectsData = projectsData.filter(p => p.id !== id);
    return;
  }

  try {
    await collection.deleteOne({ id });
  } catch (error) {
    disableMongo(error);
    projectsData = projectsData.filter(p => p.id !== id);
  }
}
