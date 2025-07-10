import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';

export class RevisionRequest {
  constructor(revisionData) {
    this.task_id = new ObjectId(revisionData.task_id);
    this.user_id = new ObjectId(revisionData.user_id);
    this.feedback = revisionData.feedback;
    this.created_at = revisionData.created_at || new Date();
  }

  static async create(revisionData) {
    const db = getDB();
    const revision = new RevisionRequest(revisionData);
    const result = await db.collection('revision_requests').insertOne(revision);
    return { ...revision, _id: result.insertedId };
  }

  static async findByTaskId(taskId) {
    const db = getDB();
    return await db.collection('revision_requests').find({ 
      task_id: new ObjectId(taskId) 
    }).sort({ created_at: -1 }).toArray();
  }
}