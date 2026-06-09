import client from './mongo';
import type { Project } from '../types';

const DATABASE_NAME = process.env.MONGODB_DB_NAME || 'kawichchi';
const COLLECTION_NAME = 'projects';

export async function getProjects(): Promise<Project[]> {
  await client.connect();
  const db = client.db(DATABASE_NAME);
  return db.collection<Project>(COLLECTION_NAME).find().toArray();
}

export async function getProjectById(id: string | number): Promise<Project | null> {
  await client.connect();
  const db = client.db(DATABASE_NAME);
  return db.collection<Project>(COLLECTION_NAME).findOne({ id: Number(id) });
}

export async function addProject(project: Project): Promise<Project> {
  await client.connect();
  const db = client.db(DATABASE_NAME);
  await db.collection<Project>(COLLECTION_NAME).insertOne(project);
  return project;
}

export async function updateProject(id: number, project: Partial<Project>): Promise<Project | null> {
  await client.connect();
  const db = client.db(DATABASE_NAME);
  const { _id, ...updateFields } = project as any;
  const result = (await db.collection<Project>(COLLECTION_NAME).findOneAndUpdate(
    { id },
    { $set: updateFields },
    { returnDocument: 'after' }
  )) as any;
  return result?.value ?? null;
}

export async function deleteProject(id: number): Promise<void> {
  await client.connect();
  const db = client.db(DATABASE_NAME);
  await db.collection<Project>(COLLECTION_NAME).deleteOne({ id });
}
