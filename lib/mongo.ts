import { MongoClient, MongoClientOptions } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const options: MongoClientOptions = {
  appName: 'kawichchi-premium-furniture',
  maxIdleTimeMS: 5000,
};

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable');
}

const client = new MongoClient(uri, options);
attachDatabasePool(client);
export default client;
