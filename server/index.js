import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http'; 
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';
import { authenticateToken } from './middleware/auth.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // For stricter security, replace '*' with your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);
app.use('/api/messages', authenticateToken, messageRoutes);
app.use('/api/upload', authenticateToken, uploadRoutes);

// Health Check for Render
app.get('/', (req, res) => {
  res.send('API server is running');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AudioFlow API is running' });
});

// Create HTTP server and configure timeouts
const server = http.createServer(app);

// ⏱ Extend timeouts to prevent 502s on Render Free tier
server.keepAliveTimeout = 120_000;  // 2 minutes
server.headersTimeout = 120_000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
