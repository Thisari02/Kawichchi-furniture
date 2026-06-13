import { MongoClient, MongoClientOptions } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const options: MongoClientOptions = {
  appName: 'kawichchi-premium-furniture',
  maxIdleTimeMS: 5000,
};

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;

if (uri) {
  try {
    client = new MongoClient(uri, options);
    attachDatabasePool(client);
  } catch (error) {
    console.warn('Failed to initialize MongoDB client:', error);
    client = null;
  }
} else {
  console.warn('MONGODB_URI not configured, MongoDB features will be disabled');
}

export default client;
