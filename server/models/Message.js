import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';

export class Message {
  constructor(messageData) {
    this.task_id = new ObjectId(messageData.task_id);
    this.sender_id = new ObjectId(messageData.sender_id);
    this.content = messageData.content;
    this.created_at = messageData.created_at || new Date();
  }

  static async create(messageData) {
    const db = getDB();
    const message = new Message(messageData);
    const result = await db.collection('messages').insertOne(message);
    return { ...message, _id: result.insertedId };
  }

  static async findByTaskId(taskId) {
    const db = getDB();
    return await db.collection('messages').aggregate([
      { $match: { task_id: new ObjectId(taskId) } },
      { $sort: { created_at: 1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'sender_id',
          foreignField: '_id',
          as: 'sender'
        }
      },
      {
        $addFields: {
          sender: { $arrayElemAt: ['$sender', 0] }
        }
      }
    ]).toArray();
  }
}