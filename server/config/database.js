import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;
let client;

export const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    // 👇 Pass the DB name explicitly
    db = client.db('audioatlas');

    console.log('Connected to MongoDB');

    // Create indexes
    await createIndexes();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


const createIndexes = async () => {
  try {
    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    
    // Tasks collection indexes
    await db.collection('tasks').createIndex({ user_id: 1 });
    await db.collection('tasks').createIndex({ worker_id: 1 });
    await db.collection('tasks').createIndex({ status: 1 });
    await db.collection('tasks').createIndex({ created_at: -1 });
    
    // Messages collection indexes
    await db.collection('messages').createIndex({ task_id: 1 });
    await db.collection('messages').createIndex({ created_at: 1 });
    
    // Revision requests collection indexes
    await db.collection('revision_requests').createIndex({ task_id: 1 });
    
    console.log('Database indexes created');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
  }
};
