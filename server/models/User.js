import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getDB } from '../config/database.js';

export class User {
  constructor(userData) {
    this.email = userData.email;
    this.full_name = userData.full_name;
    this.role = userData.role;
    this.password_hash = userData.password_hash;
    this.created_at = userData.created_at || new Date();
  }

  static async create(userData) {
    const db = getDB();
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user = new User({
      ...userData,
      password_hash: hashedPassword
    });

    const result = await db.collection('users').insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async findByEmail(email) {
    const db = getDB();
    return await db.collection('users').findOne({ email });
  }

  static async findById(id) {
    const db = getDB();
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateById(id, updateData) {
    const db = getDB();
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updated_at: new Date() } }
    );
    return result;
  }
}