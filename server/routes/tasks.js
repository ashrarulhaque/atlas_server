import express from 'express';
import { Task } from '../models/Task.js';
import { RevisionRequest } from '../models/RevisionRequest.js';

const router = express.Router();

// Get user's tasks
router.get('/my-tasks', async (req, res) => {
  try {
    const tasks = await Task.findByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get worker's tasks
router.get('/worker-tasks', async (req, res) => {
  try {
    const tasks = await Task.findByWorkerId(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching worker tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get available tasks
router.get('/available', async (req, res) => {
  try {
    const tasks = await Task.findAvailable();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching available tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      user_id: req.user.id
    };

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Claim task
router.post('/:id/claim', async (req, res) => {
  try {
    const result = await Task.claimTask(req.params.id, req.user.id);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Task not found or already claimed' });
    }

    res.json({ message: 'Task claimed successfully' });
  } catch (error) {
    console.error('Error claiming task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit completed task
router.post('/:id/submit', async (req, res) => {
  try {
    const { processed_file_url } = req.body;
    
    const result = await Task.updateById(req.params.id, {
      status: 'completed',
      processed_file_url,
      submitted_at: new Date()
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task submitted successfully' });
  } catch (error) {
    console.error('Error submitting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Request revision
router.post('/:id/revision', async (req, res) => {
  try {
    const { feedback } = req.body;
    
    // Create revision request
    await RevisionRequest.create({
      task_id: req.params.id,
      user_id: req.user.id,
      feedback
    });

    // Update task status
    await Task.updateById(req.params.id, {
      status: 'revision_requested'
    });

    res.json({ message: 'Revision requested successfully' });
  } catch (error) {
    console.error('Error requesting revision:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve task
router.post('/:id/approve', async (req, res) => {
  try {
    const result = await Task.updateById(req.params.id, {
      status: 'approved',
      approved_at: new Date()
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task approved successfully' });
  } catch (error) {
    console.error('Error approving task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;