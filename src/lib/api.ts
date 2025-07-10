import axios from 'axios';

const API_BASE_URL = 'https://atlas-server-9nqa.onrender.com/api';


// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signIn: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', { email, password });
    return response.data;
  },

  signUp: async (email: string, password: string, full_name: string, role: 'user' | 'worker') => {
    const response = await api.post('/auth/signup', { email, password, full_name, role });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getMyTasks: async () => {
    const response = await api.get('/tasks/my-tasks');
    return response.data;
  },

  getWorkerTasks: async () => {
    const response = await api.get('/tasks/worker-tasks');
    return response.data;
  },

  getAvailableTasks: async () => {
    const response = await api.get('/tasks/available');
    return response.data;
  },

  createTask: async (taskData: any) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  claimTask: async (taskId: string) => {
    const response = await api.post(`/tasks/${taskId}/claim`);
    return response.data;
  },

  submitTask: async (taskId: string, processedFileUrl: string) => {
    const response = await api.post(`/tasks/${taskId}/submit`, { processed_file_url: processedFileUrl });
    return response.data;
  },

  requestRevision: async (taskId: string, feedback: string) => {
    const response = await api.post(`/tasks/${taskId}/revision`, { feedback });
    return response.data;
  },

  approveTask: async (taskId: string) => {
    const response = await api.post(`/tasks/${taskId}/approve`);
    return response.data;
  },
};

// Messages API
export const messagesAPI = {
  getMessages: async (taskId: string) => {
    const response = await api.get(`/messages/${taskId}`);
    return response.data;
  },

  sendMessage: async (taskId: string, content: string) => {
    const response = await api.post('/messages', { task_id: taskId, content });
    return response.data;
  },
};

// Upload API
export const uploadAPI = {
  uploadAudio: async (file: File) => {
    const formData = new FormData();
    formData.append('audio', file);
    
    const response = await api.post('/upload/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadProcessed: async (file: File) => {
    const formData = new FormData();
    formData.append('processed', file);
    
    const response = await api.post('/upload/processed', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
