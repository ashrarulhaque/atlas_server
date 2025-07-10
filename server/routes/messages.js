import express from 'express';
import { Message } from '../models/Message.js';
import { Task } from '../models/Task.js';

const router = express.Router();

// Get messages for a task
router.get('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Verify user has access to this task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const hasAccess = task.user_id.toString() === req.user.id || 
                     (task.worker_id && task.worker_id.toString() === req.user.id);
    
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const messages = await Message.findByTaskId(taskId);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send message
router.post('/', async (req, res) => {
  try {
    const { task_id, content } = req.body;
    
    // Verify user has access to this task
    const task = await Task.findById(task_id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const hasAccess = task.user_id.toString() === req.user.id || 
                     (task.worker_id && task.worker_id.toString() === req.user.id);
    
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const message = await Message.create({
      task_id,
      sender_id: req.user.id,
      content
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;