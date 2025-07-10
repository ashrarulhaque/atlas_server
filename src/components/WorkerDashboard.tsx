import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Task } from '../types';
import { tasksAPI } from '../lib/api';
import { Clock, Play, CheckCircle, Upload, Download, MessageSquare, Timer } from 'lucide-react';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';
import TaskMessages from './TaskMessages';
import TaskSubmit from './TaskSubmit';

export default function WorkerDashboard() {
  const { user } = useAuth();
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [submittedTaskId, setSubmittedTaskId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showMessages, setShowMessages] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTasks();
      const interval = setInterval(fetchTasks, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const [available, mine] = await Promise.all([
        tasksAPI.getAvailableTasks(),
        tasksAPI.getWorkerTasks()
      ]);
      
      setAvailableTasks(available);
      setMyTasks(mine);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimTask = async (taskId: string) => {
    try {
      await tasksAPI.claimTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error claiming task:', error);
    }
  };

  const getTimeRemaining = (deadlineAt: string) => {
    const now = new Date();
    const deadline = new Date(deadlineAt);
    const hoursRemaining = differenceInHours(deadline, now);
    const minutesRemaining = differenceInMinutes(deadline, now) % 60;

    if (hoursRemaining < 0) {
      return 'Overdue';
    }

    return `${hoursRemaining}h ${minutesRemaining}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'revision_requested':
        return 'bg-orange-100 text-orange-800';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4E71FF]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-white font-bold">Worker Dashboard</h1>

      {/* My Tasks */}
      <div>
        <h2 className="text-2xl font-semibold text-white font-bold mb-4">My Tasks</h2>
        {myTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTasks.map((task) => (
              <div key={task._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {task.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>{task.description}</p>
                  <div className="flex justify-between">
                    <span>Duration: {task.duration_minutes} min</span>
                    <span className="font-medium">
                      ${(task.price_cents / 100).toFixed(2)}
                    </span>
                  </div>
                  <p>Client: {task.user?.full_name}</p>

                  {task.deadline_at && task.status === "in_progress" && (
                    <div className="flex items-center space-x-2 text-orange-600">
                      <Timer className="h-4 w-4" />
                      <span className="font-medium">
                        Time remaining: {getTimeRemaining(task.deadline_at)}
                      </span>
                    </div>
                  )}

                  {task.status === "approved" && task.approved_at && (
                    <p className="text-green-600 font-medium">
                      Approved:{" "}
                      {format(new Date(task.approved_at), "MMM d, yyyy")}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setShowMessages(true);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center space-x-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </button>

                  {task.status === "in_progress" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          window.open(`${task.original_file_url}`, "_blank")
                        }
                        className="bg-atlas-primary-default text-white px-3 py-2 rounded-md hover:bg-atlas-gold hover:text-black flex items-center space-x-1 transition-all duration-300"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowUpload(true);
                          setSubmittedTaskId(task._id);
                        }}
                        className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center space-x-1"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Submit</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No claimed tasks
            </h3>
            <p className="text-gray-600">
              Browse available tasks below to get started
            </p>
          </div>
        )}
      </div>

      {/* Available Tasks */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Available Tasks
        </h2>
        {availableTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTasks.map((task) => (
              <div key={task._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {task.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{task.description}</p>
                  <div className="flex justify-between">
                    <span>Duration: {task.duration_minutes} min</span>
                    <span className="font-medium">
                      ${(task.price_cents / 100).toFixed(2)}
                    </span>
                  </div>
                  <p>Client: {task.user?.full_name}</p>
                  <p>
                    Posted: {format(new Date(task.created_at), "MMM d, yyyy")}
                  </p>
                </div>
                <button
                  onClick={() => claimTask(task._id)}
                  className="mt-4 w-full bg-gradient-to-r from-atlas-gold to-atlas-primary-light text-white font-bold hover:from-atlas-primary-light hover:to-atlas-gold py-2 px-4 rounded-md  flex items-center justify-center space-x-2 transition-all duration-300"
                >
                  <Clock className="h-4 w-4" />
                  <span>Claim Task</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No available tasks
            </h3>
            <p className="text-gray-600">Check back later for new tasks</p>
          </div>
        )}
      </div>

      {showUpload && (
        <TaskSubmit
          taskId = {submittedTaskId}
          onClose={() => {
            setShowUpload(false);
            setSubmittedTaskId('');
          }}
          onSuccess={() => {
            setShowUpload(false);
            fetchTasks();
          }}
        />
      )}

      {showMessages && selectedTask && (
        <TaskMessages
          task={selectedTask}
          onClose={() => setShowMessages(false)}
        />
      )}
    </div>
  );
}
