import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';

export class Task {
  constructor(taskData) {
    this.user_id = new ObjectId(taskData.user_id);
    this.worker_id = taskData.worker_id ? new ObjectId(taskData.worker_id) : null;
    this.title = taskData.title;
    this.description = taskData.description;
    this.original_file_url = taskData.original_file_url;
    this.processed_file_url = taskData.processed_file_url || null;
    this.price_cents = taskData.price_cents;
    this.duration_minutes = taskData.duration_minutes;
    this.status = taskData.status || 'pending';
    this.claimed_at = taskData.claimed_at || null;
    this.submitted_at = taskData.submitted_at || null;
    this.approved_at = taskData.approved_at || null;
    this.deadline_at = taskData.deadline_at || null;
    this.created_at = taskData.created_at || new Date();
    this.updated_at = taskData.updated_at || new Date();
  }

  static async create(taskData) {
    const db = getDB();
    const task = new Task(taskData);
    const result = await db.collection('tasks').insertOne(task);
    return { ...task, _id: result.insertedId };
  }

  static async findById(id) {
    const db = getDB();
    return await db.collection('tasks').findOne({ _id: new ObjectId(id) });
  }

  static async findByUserId(userId) {
    const db = getDB();
    return await db.collection('tasks').aggregate([
      { $match: { user_id: new ObjectId(userId) } },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'worker_id',
          foreignField: '_id',
          as: 'worker'
        }
      },
      {
        $addFields: {
          worker: { $arrayElemAt: ['$worker', 0] }
        }
      }
    ]).toArray();
  }

  static async findByWorkerId(workerId) {
    const db = getDB();
    return await db.collection('tasks').aggregate([
      { $match: { worker_id: new ObjectId(workerId) } },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] }
        }
      }
    ]).toArray();
  }

  static async findAvailable() {
    const db = getDB();
    return await db.collection('tasks').aggregate([
      { $match: { status: 'pending' } },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] }
        }
      }
    ]).toArray();
  }

  static async updateById(id, updateData) {
    const db = getDB();
    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updated_at: new Date() } }
    );
    return result;
  }

  static async claimTask(taskId, workerId) {
    const db = getDB();
    const deadlineAt = new Date();
    deadlineAt.setHours(deadlineAt.getHours() + 24);

    return await db.collection('tasks').updateOne(
      { _id: new ObjectId(taskId), status: 'pending' },
      {
        $set: {
          worker_id: new ObjectId(workerId),
          status: 'in_progress',
          claimed_at: new Date(),
          deadline_at: deadlineAt,
          updated_at: new Date()
        }
      }
    );
  }
}