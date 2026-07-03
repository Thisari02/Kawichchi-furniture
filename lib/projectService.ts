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
const DATABASE_NAME = process.env.MONGODB_DB_NAME || 'kawichchi';
const COLLECTION_NAME = 'projects';

export async function getProjects(): Promise<Project[]> {
  if (useMemoryStorage) {
    return projectsData;
  }
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const rawProjects = await db.collection(COLLECTION_NAME).find().toArray();
    return rawProjects.map(normalizeProject);
  } catch (error) {
    console.warn('Failed to fetch from MongoDB, using in-memory data:', error);
    return projectsData;
  }
}

export async function getProjectById(id: string | number): Promise<Project | null> {
  if (useMemoryStorage) {
    return projectsData.find(p => p.id === Number(id)) || null;
  }
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const project = await db.collection(COLLECTION_NAME).findOne({ id: Number(id) });
    return project ? normalizeProject(project) : null;
  } catch (error) {
    console.warn('Failed to fetch from MongoDB:', error);
    return projectsData.find(p => p.id === Number(id)) || null;
  }
}

export async function addProject(project: Project): Promise<Project> {
  if (useMemoryStorage) {
    projectsData.push(project);
    return project;
  }
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const result = await db.collection(COLLECTION_NAME).insertOne(project);
    return normalizeProject({ ...project, _id: result.insertedId?.toString?.() });
  } catch (error) {
    console.warn('Failed to save to MongoDB, storing in memory:', error);
    projectsData.push(project);
    return project;
  }
}

export async function updateProject(id: number, project: Partial<Project>): Promise<Project | null> {
  if (useMemoryStorage) {
    const index = projectsData.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...projectsData[index], ...project, id };
    projectsData[index] = updated;
    return updated;
  }
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const { _id, id: omittedId, ...updateFields } = project as any;
    const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
      { id },
      { $set: updateFields },
      { returnDocument: 'after' }
    );
    return result?.value ? normalizeProject(result.value) : null;
  } catch (error) {
    console.warn('Failed to update in MongoDB, updating in memory:', error);
    const index = projectsData.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...projectsData[index], ...project, id };
    projectsData[index] = updated;
    return updated;
  }
}

export async function deleteProject(id: number): Promise<void> {
  if (useMemoryStorage) {
    projectsData = projectsData.filter(p => p.id !== id);
    return;
  }
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    await db.collection(COLLECTION_NAME).deleteOne({ id });
  } catch (error) {
    console.warn('Failed to delete from MongoDB, deleting from memory:', error);
    projectsData = projectsData.filter(p => p.id !== id);
  }
}
