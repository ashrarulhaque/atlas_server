export interface User {
  id: string;
  email: string;
  role: 'user' | 'worker';
  full_name: string;
  created_at?: string;
}

export interface Task {
  _id: string;
  user_id: string;
  worker_id?: string;
  title: string;
  description: string;
  original_file_url: string;
  processed_file_url?: string;
  price_cents: number;
  duration_minutes: number;
  status: 'pending' | 'in_progress' | 'completed' | 'revision_requested' | 'approved';
  claimed_at?: string;
  submitted_at?: string;
  approved_at?: string;
  deadline_at?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  worker?: User;
}

export interface Message {
  _id: string;
  task_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: User;
}

export interface RevisionRequest {
  _id: string;
  task_id: string;
  user_id: string;
  feedback: string;
  created_at: string;
}