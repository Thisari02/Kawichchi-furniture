import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { pathToFileURL } from 'url';

import { categories } from '../src/data/categories';

dotenv.config();

type ProjectDocument = {
  _id: mongoose.Types.ObjectId;
  title?: string;
  category?: string;
  subCategory?: string;
  subType?: string;
};

type CategoryConfig = {
  subCategories: Map<string, { name: string; subTypes: Map<string, string> }>;
};

const categoryConfig = new Map<string, CategoryConfig>(
  categories.map((category) => [
    category.name,
    {
      subCategories: new Map(
        category.subCategories.map((subCategory) => [
          normalizeKey(subCategory.name),
          {
            name: subCategory.name,
            subTypes: new Map(subCategory.subTypes.map((subType) => [normalizeKey(subType), subType])),
          },
        ]),
      ),
    },
  ]),
);

const categoryAliases = new Map<string, string>([
  ['livingroom', 'Living Room'],
  ['living room', 'Living Room'],
  ['living-room', 'Living Room'],
  ['doors windows', 'Doors & Windows'],
  ['doors and windows', 'Doors & Windows'],
  ['door and windows', 'Doors & Windows'],
  ['door windows', 'Doors & Windows'],
  ['staircase flooring', 'Staircase & Flooring'],
  ['staircase and flooring', 'Staircase & Flooring'],
  ['kitchen pantry', 'Kitchen & Pantry'],
  ['kitchen and pantry', 'Kitchen & Pantry'],
  ['dining area', 'Dining Area'],
  ['bedroom', 'Bedroom'],
]);

const subCategoryAliases = new Map<string, Map<string, string>>([
  [
    'Living Room',
    new Map([
      ['sofas', 'Seating'],
      ['sofa', 'Seating'],
    ]),
  ],
  [
    'Dining Area',
    new Map([
      ['dining set', 'Dining Sets'],
      ['dining sets', 'Dining Sets'],
      ['dining', 'Dining Sets'],
      ['storage', 'Storage'],
      ['cabinet', 'Storage'],
      ['cabinets', 'Storage'],
      ['sideboard', 'Storage'],
      ['display cabinet', 'Storage'],
      ['crockery cabinet', 'Storage'],
    ]),
  ],
  [
    'Doors & Windows',
    new Map([
      ['door', 'Doors'],
      ['doors', 'Doors'],
      ['window', 'Windows'],
      ['windows', 'Windows'],
    ]),
  ],
  [
    'Staircase & Flooring',
    new Map([
      ['staircase', 'Staircase'],
      ['staircases', 'Staircase'],
      ['flooring', 'Flooring'],
      ['floor', 'Flooring'],
      ['floors', 'Flooring'],
    ]),
  ],
  [
    'Bedroom',
    new Map([
      ['bed', 'Beds'],
      ['beds', 'Beds'],
      ['storage', 'Storage'],
      ['wardrobe', 'Storage'],
      ['wardrobes', 'Storage'],
    ]),
  ],
  [
    'Kitchen & Pantry',
    new Map([
      ['kitchen type', 'Kitchen Types'],
      ['kitchen types', 'Kitchen Types'],
      ['kitchen', 'Kitchen Types'],
      ['storage', 'Storage'],
      ['pantry', 'Storage'],
      ['pantry storage', 'Storage'],
      ['cabinets', 'Storage'],
    ]),
  ],
]);

const subTypeAliases = new Map<string, Map<string, string>>([
  [
    'Living Room::Seating',
    new Map([
      ['3 seater', 'Sofa Set'],
      ['3-seater', 'Sofa Set'],
      ['2 seater', 'Sofa Set'],
      ['2-seater', 'Sofa Set'],
    ]),
  ],
]);

function normalizeKey(value: string | undefined | null): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function resolveCategory(categoryName: string | undefined): { value: string; known: boolean } {
  const current = String(categoryName || '');
  const key = normalizeKey(current);

  if (!key) {
    return { value: current, known: false };
  }

  for (const categoryNameFromConfig of categoryConfig.keys()) {
    if (normalizeKey(categoryNameFromConfig) === key) {
      return { value: categoryNameFromConfig, known: true };
    }
  }

  const alias = categoryAliases.get(key);
  if (alias) {
    return { value: alias, known: true };
  }

  return { value: current, known: false };
}

function resolveSubCategory(categoryName: string | undefined, subCategoryName: string | undefined): { value: string; known: boolean } {
  const current = String(subCategoryName || '');

  if (!categoryName) {
    return { value: current, known: false };
  }

  const category = categoryConfig.get(categoryName);
  if (!category) {
    return { value: current, known: false };
  }

  const key = normalizeKey(current);
  if (!key) {
    return { value: current, known: false };
  }

  const alias = subCategoryAliases.get(categoryName)?.get(key);
  if (alias) {
    return { value: alias, known: true };
  }

  const fromConfig = category.subCategories.get(key)?.name;
  if (fromConfig) {
    return { value: fromConfig, known: true };
  }

  return { value: current, known: false };
}

function resolveSubType(categoryName: string | undefined, subCategoryName: string, subTypeName: string | undefined): { value: string; known: boolean } {
  const current = String(subTypeName || '');

  if (!categoryName || !subCategoryName) {
    return { value: current, known: false };
  }

  const category = categoryConfig.get(categoryName);
  const subCategory = category?.subCategories.get(normalizeKey(subCategoryName));
  if (!subCategory) {
    return { value: current, known: false };
  }

  const key = normalizeKey(current);
  if (!key) {
    return { value: current, known: false };
  }

  const aliasKey = `${categoryName}::${subCategory.name}`;
  const alias = subTypeAliases.get(aliasKey)?.get(key);
  if (alias) {
    return { value: alias, known: true };
  }

  const fromConfig = subCategory.subTypes.get(key);
  if (fromConfig) {
    return { value: fromConfig, known: true };
  }

  return { value: current, known: false };
}

function getNormalizedFields(project: ProjectDocument) {
  const category = resolveCategory(project.category);
  const subCategory = resolveSubCategory(category.value, project.subCategory);
  const subType = resolveSubType(category.value, subCategory.value, project.subType);

  return {
    category,
    subCategory,
    subType,
  };
}

async function normalizeProjects() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'kawichchi';

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env or the current environment.');
  }

  await mongoose.connect(uri, {
    dbName,
  });

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('MongoDB connection is not initialized.');
  }

  const collection = db.collection<ProjectDocument>('projects');
  const projects = await collection.find({}, { projection: { title: 1, category: 1, subCategory: 1, subType: 1 } }).toArray();

  let corrected = 0;
  let skipped = 0;

  for (const project of projects) {
    const nextFields = getNormalizedFields(project);
    const updateFields: Partial<Pick<ProjectDocument, 'category' | 'subCategory' | 'subType'>> = {};

    if (!nextFields.category.known) {
      console.warn('Unknown category: Skipped', {
        projectId: project._id.toString(),
        project: project.title || '(untitled)',
        current: project.category || '',
      });
    }

    if (nextFields.category.known && (project.category || '') !== nextFields.category.value) {
      updateFields.category = nextFields.category.value;
    }

    if (!nextFields.subCategory.known && (project.subCategory || '')) {
      console.warn('Unknown subCategory: Skipped', {
        projectId: project._id.toString(),
        project: project.title || '(untitled)',
        category: nextFields.category.value || project.category || '',
        current: project.subCategory || '',
      });
    }

    if (nextFields.subCategory.known && (project.subCategory || '') !== nextFields.subCategory.value) {
      updateFields.subCategory = nextFields.subCategory.value;
    }

    if (!nextFields.subType.known && (project.subType || '')) {
      console.warn('Unknown subType: Skipped', {
        projectId: project._id.toString(),
        project: project.title || '(untitled)',
        category: nextFields.category.value || project.category || '',
        subCategory: nextFields.subCategory.value || project.subCategory || '',
        current: project.subType || '',
      });
    }

    if (nextFields.subType.known && (project.subType || '') !== nextFields.subType.value) {
      updateFields.subType = nextFields.subType.value;
    }

    if (!Object.keys(updateFields).length) {
      skipped += 1;
      continue;
    }

    corrected += 1;
    console.log('Updating project:', {
      _id: project._id.toString(),
      project: project.title || '(untitled)',
      before: {
        category: project.category || '',
        subCategory: project.subCategory || '',
        subType: project.subType || '',
      },
      after: {
        category: nextFields.category.value,
        subCategory: nextFields.subCategory.value,
        subType: nextFields.subType.value,
      },
    });

    await collection.updateOne(
      { _id: project._id },
      {
        $set: updateFields,
      },
    );
  }

  console.log('Normalization summary:', {
    totalDocumentsProcessed: projects.length,
    totalCorrected: corrected,
    totalSkipped: skipped,
  });
}

async function main() {
  try {
    await normalizeProjects();
  } finally {
    await mongoose.disconnect();
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error('Project normalization failed:', error);
    process.exit(1);
  });
}

export { getNormalizedFields, normalizeProjects };